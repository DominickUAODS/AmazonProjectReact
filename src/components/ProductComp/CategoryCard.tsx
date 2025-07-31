import './CategoryCard.css';
import { ReactSVG } from 'react-svg';
import type { Category } from '../types/Category';
import { Link } from 'react-router-dom';

function CategoryCard({ id, image, title, description }: Category) {
    return (
        <div className='category-card bg-objects'>
            <img src={image} alt={title} />
            <p className='text-minor text-2'>{title}: {description}</p>
            <div className='category-card-see-all-container'>
                <span className='text-minor text-5'>See all</span>
                <Link className='button button-tertiary' to={`/products?category=${id}`}>
                    <ReactSVG src='/icons/arrow_right.svg' />
                </Link>
            </div>
        </div>
    );
}

export { CategoryCard };