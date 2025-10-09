import './ProductCard.css';
import { ReactSVG } from 'react-svg';
import type { ProductsList } from '../../types/Product';
import { Link } from 'react-router-dom';
import type { ProductCardSize } from '../../types/Product';

export type ProductCardProps = ProductsList & {
	card_size: ProductCardSize;
};

function ProductCard({ id, stars, displays, display, rating, name, comments, price, old_cost, card_size }: ProductCardProps) {
	return (
		<Link className={`product-card ${card_size === 'big' ? 'product-card-big' : 'product-card-small'} bg-objects`} to={`/product/${id}`}>
			<div className='product-card-image-frame'>
				<img src={displays ? displays : display} alt={name} />
				{old_cost && <>
					<ReactSVG className='product-card-discount-icon logo-primary' src='/img/discount_bubble.svg' />
					<span className={`product-card-discount-percent text-minor ${card_size === 'big' ? 'text-1' : 'text-5'}`}>-{Math.round(((old_cost - price) / old_cost) * 100)}%</span>
				</>}
			</div>
			<p className={`text-minor ${card_size === 'big' ? 'header-3' : 'text-2'}`}>{name}</p>
			<div className='product-card-stats'>
				<div className='product-card-stat-container'>
					<ReactSVG className='product-card-stat-icon icon-minor-text logo-minor-text' src='/icons/star_full.svg' />
					<span className={`product-card-stat text-minor ${card_size === 'big' ? 'text-2' : 'text-5'}`}>{rating ? Math.round(rating) : Math.round(stars)}</span>
				</div>
				<div className='product-card-stat-container'>
					<ReactSVG className='product-card-stat-icon icon-minor-text' src='/icons/comments.svg' />
					<span className={`product-card-stat text-minor ${card_size === 'big' ? 'text-2' : 'text-5'}`}>{comments}</span>
				</div>
			</div>
			<div className='product-card-cost-container'>
				<span className={`product-card-cost text-minor ${card_size === 'big' ? 'header-2' : 'text-2'}`}>
					${Math.floor(price)}
					<sup className='produt-card-cost-cents'>{Math.round((price - Math.floor(price)) * 100)}</sup>
				</span>
				{old_cost && <>
					<span className={`product-card-cost product-card-old-cost text-minor ${card_size === 'big' ? 'text-1' : 'text-4'}`}>${old_cost.toFixed(2)}</span>
				</>}
			</div>
		</Link>
	);
}

export { ProductCard };