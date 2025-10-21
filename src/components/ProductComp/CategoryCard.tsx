import './CategoryCard.css';
import { ReactSVG } from 'react-svg';
import { Link, useNavigate } from 'react-router-dom';
import type { Category } from '../../types/Category';

function CategoryCard({ id, image, name, description }: Category) {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/products/${id}`);
    };
    
    return (
        <div className='category-card bg-objects' onClick={handleClick}>
            <img src={image || "public/img/Rectangle_413.png"} alt={name} />
            <p className='text-minor text-2'>{name}: {description}</p>
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