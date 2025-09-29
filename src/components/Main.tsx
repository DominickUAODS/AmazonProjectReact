import './Main.css';
import { MainCarousel } from './ProductComp/MainCarousel';
import { CategoryLine } from './ProductComp/CategoryLine';
import { ProductLine } from './ProductComp/ProductLine';
import { LoginBanner } from './ProductComp/LoginBanner';
import { ScrollToTopButton } from './ProductComp/ScrollToTopButton';

function Main() {
	const categoriesPageSize = import.meta.env.VITE_MAIN_CATEGORIES_PAGE_SIZE;
	const productsPageSize = import.meta.env.VITE_MAIN_PRODUCTS_PAGE_SIZE;

	const banners = [
		'/img/banner_1.png',
		'/img/banner_2.png',
	];

	return (
		<div className='main'>
			<MainCarousel banners={banners} />
			<CategoryLine page={1} pageSize={categoriesPageSize} />
			<hr className='hr-separator' />
			<ProductLine type='trending' pageSize={productsPageSize} />
			<hr className='hr-separator' />
			<CategoryLine page={2} pageSize={categoriesPageSize} />
			<hr className='hr-separator' />
			<ProductLine type='sale' pageSize={productsPageSize} />
			<hr className='hr-separator' />
			<LoginBanner />
			<ScrollToTopButton />
		</div>
	);
}

export { Main };