import './ProductList.css';
import { Link, useSearchParams } from 'react-router-dom'

function ProductList() {
    const [searchParams] = useSearchParams();

    return (
        <>
            {searchParams.get('search') && <p className='text-minor header-1'>Search: {searchParams.get('search')}</p>}
            {searchParams.get('category') && <p className='text-minor header-1'>Caregory: {searchParams.get('category')}</p>}
            <Link className='button button-secondary' to='/'>Back</Link>
        </>
    );
}

export { ProductList };
