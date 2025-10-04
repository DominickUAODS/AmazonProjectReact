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
   

    const API_SERVER = import.meta.env.VITE_API_SERVER;

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
            return Object.entries(filters).every(([key, selectedValues]) => {
                if (selectedValues.length === 0) return true; 
                const productValues = product.details
                    .filter(d => d.property_key === key)
                    .map(d => d.attribute);
                return selectedValues.some(val => productValues.includes(val));
            });
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
                </div>
                <div>
                    <div className='product-list-output-settings input-container'>
                        <select className='product-list-filter-tags-select' disabled={filterTags.length === 0}>
                            <option>{filterTags.length} filters applied</option>
                            {filterTags.map((value, index) => <option key={index}>{value}</option>)}
                        </select>
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
