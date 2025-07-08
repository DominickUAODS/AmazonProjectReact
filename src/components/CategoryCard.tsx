import { ReactSVG } from 'react-svg';
import './CategoryCard.css';
import type { Category } from '../types/Category';

function CategoryCard({ id, image, title, description }: Category) {
    return (
        <div className='category-card bg-objects'>
            <img src={image} alt={title} />
            <p className='text-minor text-2'>{title}: {description}</p>
            <div className='category-card-see-all-container'>
                <span className='text-minor text-5'>See all</span>
                <a className='button button-tertiary' href={`/products?category=${id}`}>
                    <ReactSVG src='/icons/arrow_right.svg' />
                </a>
            </div>
        </div>
    );
}

export { CategoryCard };