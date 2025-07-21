import './ProductList.css';
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from './ProductCard';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';

import { products } from '../data (temp)/products';
import { ScrollToTopButton } from './ScrollToTopButton';


function ProductList() {
    const [searchParams] = useSearchParams();
    const [bigCards, setBigCards] = useState<boolean>(true);
    const [filterTags, setFilterTags] = useState<string[]>([]);

    const filters: Record<string, any> = {
        'brand': useState<string[]>([]),
        'fabric type': useState<string[]>([]),
        'size': useState<string[]>([]),
        'color': useState<string[]>([]),
        'min_price': useState<number | null>(null),
        'max_price': useState<number | null>(null),
        'customer_reviews': useState<number[]>([]),
    }

    const filterOptions: Record<string, string[]> = {
        'brand': [
            'PUMIEY',
            'Abardsion',
            'Trendy Queen',
            'Roselux',
            'Darong',
            'KevaMolly',
            'AUTOMET',
            'PUMA',
            'H&M',
        ],
        'fabric type':
        [
            'Polyamide',
            'Elastane',
            'Cotton',
            'Silk',
            'Nylon',
            'Chiffon',
            'Satin',
            'Sateen',
            'Stockinet',
        ],
        'size': [
            '2XS',
            'XS',
            'S',
            'M',
            'L',
            'XL',
            '2XL',
            '3XL',
            '4XL',
            '5XL',
        ],
        'color': [
            'White',
            'Black',
            'Red',
            'Yellow',
            'Orange',
            'Green',
            'Azure',
            'Blue',
            'Purple',
        ],
    }

    const getFilterTags = () => {
        const tags: string[] = [];
        Object.entries(filters).forEach(([_, state]) => {
            const [value] = state;
            if (typeof value === 'number') {
                tags.push(value.toString());
            } else if (value) {
                console.log(value);
                value.forEach((val: any) => {
                    tags.push(val);
                });
            }
        });
        return tags;
    }

    useEffect(() => {
        setFilterTags(getFilterTags());
    },
        Object.values(filters).map((state) => {
            const [value] = state;
            return value;
        })
    )

    return (
        <div className='product-list'>
            <p className='breadcrumb text-minor text-4'>
                <ReactSVG src='/icons/home.svg' />
                / {searchParams.get('search') ?? `categories / ${searchParams.get('category')}`}
            </p>
            <h1 className='product-list-title text-minor header-1'>{searchParams.get('search') ?? `Category: ${searchParams.get('category')}`}</h1>
            <div className='product-list-container'>
                <div className='product-list-filters-container'>
                    {Object.keys(filterOptions).map((value, index) => <>
                        <div key={index} className='input-container bg-objects'>
                            <label>{value[0].toUpperCase()}{value.slice(1)}</label>
                            <select
                                multiple
                                onInput={(event) => {
                                    const [_, setBrand] = filters[value];
                                    const selectedBrands = Array.from(event.currentTarget.selectedOptions).map(o => o.value);
                                    setBrand(selectedBrands);
                                }}
                            >
                                {filterOptions[value].map((val, ind) => <>
                                    <option key={ind} value={val}>{val}</option>
                                </>)}
                            </select>
                        </div>
                    </>)}
                </div>
                <div>
                    <div className='product-list-output-settings input-container'>
                        <select className='product-list-filter-tags-select' disabled={filterTags.length === 0}>
                            <option>{filterTags.length} filters applied</option>
                            {filterTags.map((value, index) => <option key={index}>{value}</option>)}
                        </select>
                        <div className='empty'></div>
                        <select>
                            <option>By rating</option>
                            <option>Novelty</option>
                            <option>Cheap to expensive</option>
                            <option>Expensive to cheap</option>
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
                        {products.map((value, index) =>
                            <ProductCard
                                card_size={bigCards ? 'big' : 'small'}
                                key={index}
                                image={value.image}
                                id={value.id}
                                title={value.title}
                                rating={value.rating}
                                comments={value.comments}
                                cost={value.cost}
                                old_cost={value.old_cost}  
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
