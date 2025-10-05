import './ProductLine.css';
import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { ProductCard } from './ProductCard';
import type { LineScrollDirection } from '../../types/LineScrollDirection';
import commonStyles from "../common.module.css";
import type { ProductsList } from '../../types/Product';
//import { products } from '../../data (temp)/products';

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
				let url = `${API_SERVER}/product?PageSize=${pageSize}`;

				if (type === "trending") {
					// товары, которые были в заказах за последние 7 дней
					url = `${API_SERVER}/product?TrendingDays=7&PageSize=${pageSize}`;
				}

				if (type === "sale") {
					// товары со скидкой
					url = `${API_SERVER}/product?OnlyDiscounted=true&Sort=recent&PageSize=${pageSize}`;
				}

				const res = await fetch(url);
				if (!res.ok) throw new Error("Ошибка при загрузке продуктов");

				const data: ProductsList[] = await res.json();
				//console.log(data);
				setProducts(data);
			} catch (err) {
				console.error("Ошибка загрузки:", err);
			}
		};

		loadProducts();
	}, [API_SERVER, pageSize, type]);

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
					{/* {products.slice(pageSize * (type === 'trending' ? 0 : 1), Math.min(pageSize * (type === 'trending' ? 1 : 2), products.length)).map((value) => */}
					{products.map((value) =>
						<ProductCard
							key={value.id}
							display={value.display}
							id={value.id}
							name={value.name}
							rating={value.rating}
							comments={value.comments}
							price={value.price}
							discount={value.discount}
							old_cost={value.discount ? value.price + value.discount : undefined} card_size={'small'} />
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