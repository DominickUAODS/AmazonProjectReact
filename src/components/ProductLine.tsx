import './ProductLine.css';
import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { ProductCard } from './ProductCard';
import type { LineScrollDirection } from '../types/LineScrollDirection';

import { products } from '../data (temp)/products';

type Params = {
    type: 'trending' | 'sale',
    pageSize: number,
};

function ProductLine({ type, pageSize }: Params) {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const lineRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<number | null>(null);

    const checkControls = () => {
        if (lineRef.current === null) return;
        setCanScrollLeft(lineRef.current.scrollLeft > 0);
        setCanScrollRight(lineRef.current.scrollLeft + lineRef.current.clientWidth < lineRef.current.scrollWidth);
    }
    
    useEffect(() => {
        checkControls();
        lineRef.current?.addEventListener('scroll', checkControls);
        return () => {
            lineRef.current?.removeEventListener('scroll', checkControls);
        };
    }, []);

    const scrollLeft = () => {
        lineRef.current!.scrollBy({
            left: -10,
            behavior: 'instant',
        });
    }

    const scrollRight = () => {
            lineRef.current!.scrollBy({
        left: 10,
            behavior: 'instant',
        });
    }

    const startScroll = (direction: LineScrollDirection) => {
        if (scrollRef.current) return;
        scrollRef.current = setInterval(direction === 'left' ? scrollLeft : scrollRight, 10);
    };

    const stopScroll = () => {
        if (scrollRef.current) {
            clearInterval(scrollRef.current);
            scrollRef.current = null;
        }
    }

    return (
        <div className='product-line-container'>
            <div className='product-line' ref={lineRef}>
                {products.slice(pageSize * (type === 'trending' ? 0 : 1), Math.min(pageSize * (type === 'trending' ? 1 : 2), products.length)).map((value, index) =>
                    <ProductCard
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
            <div className='product-line-controls'>
                <button
                    className='button button-icon button-secondary product-line-button'
                    onMouseDown={() => startScroll('left')}
                    onMouseUp={stopScroll}
                    onMouseLeave={stopScroll}
                    disabled={!canScrollLeft}
                >
                    <ReactSVG src='/icons/arrow_left.svg' />
                </button>
                <button
                    className='button button-icon button-secondary product-line-button'
                    onMouseDown={() => startScroll('right')}
                    onMouseUp={stopScroll}
                    onMouseLeave={stopScroll}
                    disabled={!canScrollRight}
                >
                    <ReactSVG src='/icons/arrow_right.svg' />
                </button>
            </div>
        </div>
    );
}

export { ProductLine };