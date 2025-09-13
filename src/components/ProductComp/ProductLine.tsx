import './ProductLine.css';
import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { ProductCard } from './ProductCard';
import type { LineScrollDirection } from '../../types/LineScrollDirection';
import commonStyles from "../common.module.css";

//import { products } from '../../data (temp)/products';
import type { ProductsList } from '../../types/Product';

type Params = {
	type: 'trending' | 'sale',
	pageSize: number,

};

function ProductLine({ type, pageSize }: Params) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [products, setProducts] = useState<ProductsList[]>([]);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const lineRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<number | null>(null);


	useEffect(() => {
		const loadProducts = async () => {
			try {
				const res = await fetch(`${API_SERVER}/product`);
				if (!res.ok) throw new Error("Ошибка при загрузке продуктов");
				const data: ProductsList[] = await res.json();
				//console.log("Полученные продукты:", data);
				setProducts(data);
			} catch (err) {
				console.error("Ошибка загрузки:", err);
			}
		};

		loadProducts();
	}, [API_SERVER]);

	const checkControls = () => {
		if (lineRef.current === null) return;
		setCanScrollLeft(lineRef.current.scrollLeft > 0);
		setCanScrollRight(lineRef.current.scrollLeft + lineRef.current.clientWidth < lineRef.current.scrollWidth);
	}

	useEffect(() => {
		checkControls();
		lineRef.current?.addEventListener('scroll', checkControls);
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			lineRef.current?.removeEventListener('scroll', checkControls);
		};
	}, [products]);

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
		<div className="product-line-div">
			<p className='product-line-title text-minor header-2'>{type[0].toUpperCase() + type.slice(1)}</p>
			<div className='product-line-container'>
				<div className='product-line' ref={lineRef}>
					{products.slice(pageSize * (type === 'trending' ? 0 : 1), Math.min(pageSize * (type === 'trending' ? 1 : 2), products.length)).map((value) =>
						<ProductCard
							key={value.id}
							display={value.display}
							id={value.id}
							name={value.name}
							rating={0}
							comments={0}
							price={value.price}
							discount={value.discount}
							old_cost={value.discount ? value.price + value.discount : undefined} card_size={'big'} />
					)}
				</div>

				<button
					className={`${commonStyles.secondaryButton} ${commonStyles.seeMoreButton} ${"see-more-button"}`}
				>
					See all
				</button>

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
		</div>
	);
}

export { ProductLine };