import './CategoryCard.css';
import { ReactSVG } from 'react-svg';
import type { Category } from '../types/Category';
import { Link, useNavigate } from 'react-router-dom';

function CategoryCard({ id, image, title, description }: Category) {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/products/${id}`);
    };
    return (
        <div className='category-card bg-objects' onClick={handleClick}>
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