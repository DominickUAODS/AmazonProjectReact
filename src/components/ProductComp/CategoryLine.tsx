import './CategoryLine.css';
import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { CategoryCard } from './CategoryCard';
import type { LineScrollDirection } from '../../types/LineScrollDirection';
import type { Category } from '../../types/Category';

type Params = {
	page: number,
	pageSize: number,
};

function CategoryLine({ page, pageSize }: Params) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [categories, setCategories] = useState<Category[]>([]);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const lineRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<number | null>(null);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const res = await fetch(`${API_SERVER}/Category?IsActive=true&IsParent=true&Page=${page}&PageSize=${pageSize}`);
				if (!res.ok) throw new Error("Ошибка при загрузке продуктов");
				const data: Category[] = await res.json();
				//console.log("Полученные продукты:", data);
				setCategories(data);
			} catch (err) {
				console.error("Ошибка загрузки:", err);
			}
		};

		loadCategories();
	}, [API_SERVER, page, pageSize]);

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
		<div className='category-line-container'>
			<div className='category-line' ref={lineRef}>
				{categories.slice(pageSize * (page - 1), Math.min(pageSize * page, categories.length)).map((value, index) =>
					<CategoryCard
						key={index}
						image={value.image}
						id={value.id}
						name={value.name}
						description={value.description}
						icon={null}
						is_active={true}
						parent_id={null}
						subcategories={[]}
					/>
				)}
			</div>
			<div className='category-line-controls'>
				<button
					className='button button-icon button-secondary category-line-button'
					onMouseDown={() => startScroll('left')}
					onMouseUp={stopScroll}
					onMouseLeave={stopScroll}
					disabled={!canScrollLeft}
				>
					<ReactSVG src='/icons/arrow_left.svg' />
				</button>
				<button
					className='button button-icon button-secondary category-line-button'
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

export { CategoryLine };