import './ProductList.css';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ProductCard, type ProductCardProps } from './ProductCard';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';

import { ScrollToTopButton } from './ScrollToTopButton';
import type { OneProductProps } from '../AdminComp/ProductByCategory/OneProduct';
import type { Category } from '../../types/Category';
import type { PropertyKeyType } from '../../types/PropertyCase';
import { getFilterOptionsFromProducts, type FilterOption, type ProductDetailDto } from '../../services/filterOptions';


function ProductList() {
    const { id: categoryId } = useParams<{ id: string }>();
    const [products, setProducts] = useState<(ProductCardProps & { details: ProductDetailDto[] })[]>([]);
    const [categoryProps, setCategoryProps] = useState<PropertyKeyType[]>([]);
    const [categoryChain, setCategoryChain] = useState<Category[]>([]);
    const [bigCards, setBigCards] = useState(true);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
    const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});
    const [sortOption, setSortOption] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [selectTagOpen, setSelectTagOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

   

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

                const productsWithDetails = await Promise.all(
                    productsSummary.map(async product => {
                        const detailRes = await fetch(`${API_SERVER}/product/${product.id}`);
                        const fullProduct = await detailRes.json();
                        return fullProduct as ProductCardProps & { details: ProductDetailDto[] };
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
    
    return (
        <div className='product-list'>
            <p className='breadcrumb text-minor text-4'>
                {breadcrumb}
            </p>
            <h1 className='product-list-title text-minor header-1'> {currentCategoryName}</h1>
            <div className='product-list-container'>
            <div className='product-list-filters-container'>
                {filterOptions.map((opt, idx) => {
                        const isOpen = openFilters[opt.name] || false;

                        return (
                        <div key={idx} className='input-container bg-objects'>
                            <div 
                            className='name-drop' 
                            onClick={() => setOpenFilters(prev => ({ ...prev, [opt.name]: !prev[opt.name] }))}
                            >
                            <span className='option-name'>{opt.name}</span>
                            <svg 
                                width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                className={`arrow ${isOpen ? 'open' : ''}`} 
                            >
                                <path d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702" 
                                    stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </div>

                            {isOpen && (
                            <>
                                <div className='input-search-wrapper'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.986 14.1056C12.906 15.5216 10.416 16.1996 9.3 16.1996C5.82 16.1996 3 13.3796 3 9.89961C3 6.41961 5.82 3.59961 9.3 3.59961C12.78 3.59961 15.6 6.41961 15.6 9.89961C15.6 10.5836 15.492 11.2436 15.288 11.8616" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 20.4004L13.986 14.1064" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                <input type='text' placeholder='Search...' />
                                </div>
                                
                                <div className="option-values">
                                {opt.values.map((val, i) => {
                                    const isSelected = filters[opt.name]?.includes(val);
                                    return (
                                    <label key={i} className={`option-value ${isSelected ? 'selected' : ''}`}>
                                        <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => {
                                            const newSelected = isSelected
                                            ? filters[opt.name].filter(v => v !== val)
                                            : [...(filters[opt.name] || []), val];
                                            handleFilterChange(opt.name, newSelected);
                                        }}
                                        />
                                        <span className="option-text">{val}</span>
                                    </label>
                                    );
                                })}
                                </div>
                            </>
                            )}
                        </div>
                        );
                    })}
                    <div className="input-container bg-objects">
                        <div className="name-drop" onClick={() => setOpenFilters(prev => ({ ...prev, Price: !prev.Price }))}>
                            <span className="option-name">Price</span>
                            <svg
                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`arrow ${openFilters["Price"] ? "open" : ""}`}
                            >
                            <path d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702"
                                stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {openFilters["Price"] && (
                            <div className="price-filter">
                                <div className="price-inputs-button">
                                    <div className="price-inputs">
                                        <input
                                        type="number"
                                        value={priceRange[0]}
                                        className='input-min-max'
                                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                        />
                                       <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1H17" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>

                                        <input
                                        type="number"
                                        value={priceRange[1]}
                                        className='input-min-max'
                                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                        />
                                        <button
                                        className={"button save-btn"}
                                        onClick={() => console.log("Saved price range:", priceRange)}
                                        >
                                        Save
                                        </button>
                                    </div>

                                </div>
                                

                                <div className="slider-container">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[0]}
                                        onChange={handleMinChange}
                                        className="thumb thumb--left"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[1]}
                                        onChange={handleMaxChange}
                                        className="thumb thumb--right"
                                    />

                                    <div className="slider">
                                        <div
                                            className="slider-track"
                                        ></div>
                                        <div
                                            className="slider-range"
                                            style={{
                                                left: `${(priceRange[0] / 1000) * 100}%`,
                                                right: `${100 - (priceRange[1] / 1000) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="input-container bg-objects">
                        <div
                            className="name-drop"
                            onClick={() => setOpenFilters(prev => ({ ...prev, Rating: !prev.Rating }))}
                        >
                            <span className="option-name">Customer reviews</span>
                            <svg
                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`arrow ${openFilters["Rating"] ? "open" : ""}`}
                            >
                            <path d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702"
                                stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {openFilters["Rating"] && (
                            <div className="rating-filter">
                            {[5, 4, 3, 2, 1].map(stars => (
                                <label key={stars} className="rating-option">
                                <input
                                    type="checkbox"
                                    checked={selectedRating === stars}
                                    onChange={() => setSelectedRating(selectedRating === stars ? null : stars)}
                                />
                                  {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className="svg-star">
                                        {i < stars ? (
                                            // ЗАКРАШЕННАЯ звезда
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.69799 20.4053C6.87599 20.9993 5.77799 20.2013 6.08999 19.2353L7.41599 15.1433C7.60199 14.5673 7.39799 13.9373 6.90599 13.5833L3.42599 11.0573C2.60399 10.4633 3.02999 9.16727 4.03799 9.16727H8.33999C8.94599 9.16727 9.47999 8.77727 9.66599 8.20127L10.992 4.10927C11.304 3.14327 12.666 3.14327 12.984 4.10927L14.31 8.20127C14.496 8.77727 15.036 9.16727 15.636 9.16727H19.938C20.952 9.16727 21.372 10.4633 20.55 11.0573L17.07 13.5833C16.578 13.9373 16.374 14.5673 16.56 15.1433L17.886 19.2353C18.198 20.2013 17.094 20.9993 16.278 20.4053L13.02 17.7953C12.528 17.3993 11.832 17.3873 11.322 17.7533L7.67999 20.4053H7.69799Z"
                                                fill="#0E2042" stroke="#0E2042" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round"
                                            />
                                            </svg>
                                        ) : (
                                            // ПУСТАЯ звезда
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.55 17.6093L7.70397 20.4053C6.88197 20.9993 5.78397 20.2013 6.09597 19.2353L7.42197 15.1433C7.60797 14.5673 7.40397 13.9373 6.91197 13.5833L3.43197 11.0573C2.60997 10.4633 3.03597 9.16727 4.04397 9.16727H8.34597C8.95197 9.16727 9.48597 8.77727 9.67197 8.20127L10.998 4.10927C11.31 3.14327 12.672 3.14327 12.99 4.10927L14.316 8.20127C14.502 8.77727 15.042 9.16727 15.642 9.16727H19.944C20.958 9.16727 21.378 10.4633 20.556 11.0573L17.076 13.5833C16.584 13.9373 16.38 14.5673 16.566 15.1433L17.892 19.2353C18.204 20.2013 17.1 20.9993 16.284 20.4053"
                                                stroke="#0E2042" strokeWidth="1.5"
                                                strokeLinecap="round" strokeLinejoin="round"
                                            />
                                            </svg>
                                        )}
                                        </span>
                                    ))}
                                </label>
                            ))}
                            </div>
                        )}
                        </div>

                </div>
                <div>
                    <div className='product-list-output-settings input-container'>
                    <div className="custom-select-wrapper">
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
                        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="">Sort by...</option>
                            <option value="By rating">By rating</option>
                            <option value="Novelty">Novelty</option>
                            <option value="Cheap to expensive">Cheap to expensive</option>
                            <option value="Expensive to cheap">Expensive to cheap</option>
                        </select>
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
                        {sortedProducts.map((value, index) =>
                            <ProductCard
                                card_size={bigCards ? 'big' : 'small'}
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
                    </div>
                </div>
            </div>
            <ScrollToTopButton />
        </div>
    );
}

export { ProductList };
