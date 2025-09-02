import './ProductCard.css';
import { ReactSVG } from 'react-svg';
import type { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import type { ProductCardSize } from '../types/ProductCardSize';



function ProductCard({ id, image, title, rating, comments, cost, old_cost, card_size }: Product) {
    return (
        <Link className={`product-card ${card_size === 'big' ? 'product-card-big' : ''} bg-objects`} to={`/products/${id}`}>
            <div className='product-card-image-frame'>
                <img src={image} alt={title} />
                {old_cost && <>
                    <ReactSVG className='product-card-discount-icon logo-primary' src='/img/discount_bubble.svg' />
                    <span className={`product-card-discount-percent text-minor ${card_size === 'big' ? 'text-1' : 'text-5'}`}>-{Math.round(((old_cost - cost) / old_cost) * 100)}%</span>
                </>}
            </div>
            <p className={`text-minor ${card_size === 'big' ? 'header-3' : 'text-2'}`}>{title}</p>
            <div className='product-card-stats'>
                <div className='product-card-stat-container'>
                    <ReactSVG className='product-card-stat-icon icon-minor-text logo-minor-text' src='/icons/star_full.svg' />
                    <span className={`product-card-stat text-minor ${card_size === 'big' ? 'text-2' : 'text-5'}`}>{Math.round(rating)}</span>
                </div>
                <div className='product-card-stat-container'>
                    <ReactSVG className='product-card-stat-icon icon-minor-text' src='/icons/comments.svg' />
                    <span className={`product-card-stat text-minor ${card_size === 'big' ? 'text-2' : 'text-5'}`}>{comments}</span>
                </div>
            </div>
            <div className='product-card-cost-container'>
                <span className={`product-card-cost text-minor ${card_size === 'big' ? 'header-2' : 'text-2'}`}>
                    ${Math.floor(cost)}
                    <sup className='produt-card-cost-cents'>{Math.round((cost - Math.floor(cost)) * 100)}</sup>
                </span>
                {old_cost && <>
                    <span className={`product-card-cost product-card-old-cost text-minor ${card_size === 'big' ? 'text-1' : 'text-4'}`}>${old_cost.toFixed(2)}</span>
                </>}
            </div>
        </Link>
    );
}

export { ProductCard };