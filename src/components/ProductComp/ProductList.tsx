import './ProductList.css';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ProductCard, type ProductCardProps } from './ProductCard';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import commonStyles from "../common.module.css";
import { ScrollToTopButton } from './ScrollToTopButton';
import type { Category } from '../../types/Category';
import type { PropertyKeyType } from '../../types/PropertyCase';
import { getFilterOptionsFromProducts, type FilterOption, type ProductDetailDto } from '../../services/filterOptions';
import Pagination from '../Pagination/Pagination';
import { FiltersPanel } from './FilerPanel';


function ProductList() {
    const { id: categoryId } = useParams<{ id: string }>();
    const [products, setProducts] = useState<(ProductCardProps & { details: ProductDetailDto[] })[]>([]);
    const [categoryProps, setCategoryProps] = useState<PropertyKeyType[]>([]);
    const [sortSelectOpen, setSortSelectOpen] = useState(false);
    const [categoryChain, setCategoryChain] = useState<Category[]>([]);
    const [bigCards, setBigCards] = useState(true);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
    const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});
    const [sortOption, setSortOption] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [selectTagOpen, setSelectTagOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        if (isFilterModalOpen) {
          document.body.classList.add("modal-open");
        } else {
          document.body.classList.remove("modal-open");
        }
      }, [isFilterModalOpen]);

      
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile(); // проверяем при загрузке
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

	const productsPerPage = 12;
    const totalPages = Math.ceil(products.length / productsPerPage);
	const startIndex = (currentPage - 1) * productsPerPage;
    

	

   

    const API_SERVER = import.meta.env.VITE_API_SERVER;

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(+e.target.value, priceRange[1] - 10);
        setPriceRange([newMin, priceRange[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(+e.target.value, priceRange[0] + 10);
        setPriceRange([priceRange[0], newMax]);
    };

    // Загружаем категорию и property_keys
    useEffect(() => {
        if (!categoryId) return;

        async function fetchCategoryChain(id: string) {
            const chain: Category[] = [];
            let currentId: string | null = id;

            while (currentId) {
                const res = await fetch(`${API_SERVER}/category/${currentId}`);
                if (!res.ok) break;
                const data: Category = await res.json();
                chain.unshift(data); 
                currentId = data.parent_id ?? null;
            }

            setCategoryChain(chain);
            setCategoryProps(chain.at(-1)?.property_keys ?? []);
        }

        fetchCategoryChain(categoryId);
    }, [API_SERVER, categoryId]);

    // Загружаем продукты и детали
    useEffect(() => {
        if (!categoryId) return;

        async function fetchProductsWithDetails() {
            try {
                const res = await fetch(`${API_SERVER}/product?categoryId=${categoryId}`);
                const productsSummary: ProductCardProps[] = await res.json();
                console.log("Products summary:", productsSummary);

                const productsWithDetails = await Promise.all(
                    productsSummary.map(async product => {
                      const detailRes = await fetch(`${API_SERVER}/product/${product.id}`);
                      const fullProduct = await detailRes.json();
                  
                      return {
                        ...fullProduct,
                        id: product.id 
                      } as ProductCardProps & { details: ProductDetailDto[] };
                    })
                  );

                console.log("Products",productsWithDetails);

                setProducts(productsWithDetails);

                // Генерируем filterOptions
                const options = getFilterOptionsFromProducts(productsWithDetails);
                setFilterOptions(options);

                // Инициализация filters
                const initialFilters: Record<string, string[]> = {};
                options.forEach(opt => (initialFilters[opt.name] = []));
                setFilters(initialFilters);

            } catch (error) {
                console.error("Ошибка загрузки продуктов с деталями:", error);
            }
        }

        fetchProductsWithDetails();
    }, [API_SERVER, categoryId]);

    useEffect(() => {
        if (products.length === 0) return;
        const prices = products.map(p => p.price);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }, [products]);

    const handleFilterChange = (key: string, selected: string[]) => {
        setFilters(prev => ({ ...prev, [key]: selected }));
    };

    const filterTags = Object.entries(filters)
        .flatMap(([key, values]) => values.map(v => `${key}: ${v}`));


        const filteredProducts = products.filter(product => {
            // обычные фильтры по свойствам
            const matchesFilters = Object.entries(filters).every(([key, selectedValues]) => {
              if (selectedValues.length === 0) return true;
              const productValues = product.details
                .filter(d => d.property_key === key)
                .map(d => d.attribute);
              return selectedValues.some(val => productValues.includes(val));
            });
          
            // фильтр по цене
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            const matchesRating = selectedRating ? Math.round(product.stars) === selectedRating : true;
          
            return matchesFilters && matchesPrice && matchesRating;
          });
          
        

        const sortedProducts = [...filteredProducts].sort((a, b) => {
            switch (sortOption) {
                case 'By rating':
                    return (b.stars ?? 0) - (a.stars ?? 0);
                case 'Cheap to expensive':
                    return a.price - b.price;
                case 'Expensive to cheap':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });
    
    
    const breadcrumb = (
        <p className='breadcrumb text-minor text-4'>
            <Link to='/'><ReactSVG src='/icons/home.svg' /></Link>
            {categoryChain.map((cat, idx) => (
                <span key={cat.id}>
                    {' / '}
                    {idx < categoryChain.length - 1 ? (
                        <Link to={`/products/${cat.id}`}>{cat.name}</Link>
                    ) : (
                        <span>{cat.name}</span>
                    )}
                </span>
            ))}
        </p>
    );


    const currentCategoryName = categoryChain.length > 0 
    ? categoryChain[categoryChain.length - 1].name 
    : '';
    const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);
    console.log("Current",currentProducts)
    
    return (
        <div className='product-list'>
            <p className='breadcrumb text-minor text-4'>
                {breadcrumb}
            </p>
            <h1 className='product-list-title text-minor header-1'> {currentCategoryName}</h1>
            <div className='product-list-container'>
                <div className='dekstop-only'>
                <FiltersPanel
                filterOptions={filterOptions}
                openFilters={openFilters}
                filters={filters}
                priceRange={priceRange}
                selectedRating={selectedRating}
                setOpenFilters={setOpenFilters}
                setPriceRange={setPriceRange}
                setSelectedRating={setSelectedRating}
                handleFilterChange={handleFilterChange}
                filterTags={filterTags}
                selectTagOpen={selectTagOpen}
                setSelectTagOpen={setSelectTagOpen}
                setFilters={setFilters}
                handleMinChange={handleMinChange}
                handleMaxChange={handleMaxChange}
                />

                </div>
                <div>
                    <div className='product-list-output-settings input-container'>
                    {window.innerWidth < 768 && (
                <div style={{cursor:"pointer"}}className="" onClick={() => setIsFilterModalOpen(true)}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3838 18.2876V23.7276C18.3838 24.4796 17.9998 25.1756 17.3598 25.5756L15.9838 26.4316C14.5358 27.3356 12.6558 26.2956 12.6558 24.5836V17.7996C12.6558 16.5996 11.6798 15.6236 10.4798 15.6236H7.91181C6.7118 15.6236 5.9998 14.6236 5.7358 13.4476L4.7998 7.77561C4.7998 6.57561 5.7758 5.59961 6.9758 5.59961H25.0158C26.2158 5.59961 27.1918 6.57561 27.1918 7.77561L26.2558 13.4476C26.0398 14.7036 25.2798 15.6236 24.0798 15.6236H18.3598" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                )}
                    <div className="custom-select-wrapper wrapper-1">
                        <button
                            className="custom-select-header"
                            onClick={() => setSelectTagOpen(prev => !prev)}
                            disabled={filterTags.length === 0}
                        >
                            <span>{filterTags.length} filters applied</span>
                            <svg    className={`arrow ${selectTagOpen ? 'open' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </button>

                        {selectTagOpen && (
                            <>
                            <div className="custom-select-list">
                            <div className="tags-in-list">
                                {Object.entries(filters).flatMap(([key, values]) =>
                                    values.map((val, index) => (
                                        <div key={`${key}-${val}-${index}`} className="custom-select-item">
                                            <span>{val}</span>
                                            <button
                                                className="remove-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleFilterChange(
                                                        key,
                                                        filters[key].filter(v => v !== val)
                                                    );
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                                <button className="clear-all-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Удаляем все фильтры
                                        const cleared = Object.fromEntries(
                                            Object.keys(filters).map(k => [k, []])
                                        );
                                        setFilters(cleared);
                                    }}>
                                    Clear all
                                </button>
                            </div>
                            </>
                        )}
                    </div>
                        <div className='empty'></div>
                        <div className="custom-select-wrapper">
                            <button
                                className="custom-select-header"
                                onClick={() => setSortSelectOpen(prev => !prev)}
                            >
                                <span>
                                    {sortOption ? sortOption : "Sort by..."}
                                </span>
                                <svg
                                    className={`arrow ${sortSelectOpen ? "open" : ""}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702"
                                        stroke="#0E2042"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {sortSelectOpen && (
                                <div className="custom-select-list">
                                    {[
                                        "By rating",
                                        "Novelty",
                                        "Cheap to expensive",
                                        "Expensive to cheap"
                                    ].map((option, index) => (
                                        <div
                                            key={index}
                                            className={`custom-select-item ${
                                                sortOption === option ? "selected" : ""
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSortOption(option);
                                                setSortSelectOpen(false);
                                            }}
                                        >
                                            <span>{option}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='button-group product-list-card-size-choice'>
                            <button className={`button button-icon ${bigCards ? 'button-primary' : 'button-tertiary'}`} onClick={() => setBigCards(true)}>
                                <ReactSVG className='logo-minor-text' src='/icons/product_quantity_3.svg' />
                            </button>
                            <button className={`button button-icon ${bigCards ? 'button-tertiary' : 'button-primary'}`} onClick={() => setBigCards(false)}>
                                <ReactSVG className='logo-minor-text' src='/icons/product_quantity_5.svg' />
                            </button>
                        </div>
                    </div>
                    <hr className='hr-separator product-list-separator' />
                    <div className='product-list-products'>
                        {currentProducts.map((value, index) =>
                            <ProductCard
                                card_size={isMobile ? "small" : bigCards ? "big" : "small"}
                                key={index}
                                displays={value.displays}
                                id={value.id}
                                name={value.name}
                                comments={value.comments}
                                price={value.price}
                                discount={value.discount}
                                old_cost={value.discount ? value.price + value.discount : undefined}
                                stars={value.stars} 
                            />
                        )}
                        {totalPages > 1 && (
							<div className={commonStyles.fixedPagination}>
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={(page) => setCurrentPage(page)}
								/>
							</div>
						)}
                    </div>
                </div>
            </div>
            <ScrollToTopButton />
            {isFilterModalOpen && (
            <div className="filter-modal-overlay" onClick={() => setIsFilterModalOpen(false)}>
                <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
                <div className="filter-modal-header">
                    <h2>Filters</h2>
                    <button className="close-btn" onClick={() => setIsFilterModalOpen(false)}>✕</button>
                </div>

                <FiltersPanel
                filterOptions={filterOptions}
                openFilters={openFilters}
                filters={filters}
                priceRange={priceRange}
                selectedRating={selectedRating}
                setOpenFilters={setOpenFilters}
                setPriceRange={setPriceRange}
                setSelectedRating={setSelectedRating}
                handleFilterChange={handleFilterChange}
                filterTags={filterTags}
                selectTagOpen={selectTagOpen}
                setSelectTagOpen={setSelectTagOpen}
                setFilters={setFilters}
                handleMinChange={handleMinChange}
                handleMaxChange={handleMaxChange}
                />
                </div>
            </div>
            )}
        </div>
    );
}

export { ProductList };
