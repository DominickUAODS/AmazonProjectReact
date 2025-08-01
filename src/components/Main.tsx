import './Main.css';
import { MainCarousel } from './MainCarousel';
import { CategoryLine } from './CategoryLine';
import { ProductLine } from './ProductLine';
import { LoginBanner } from './LoginBanner';
import { ScrollToTopButton } from './ScrollToTopButton';

function Main() {
  const banners = [
    '/img/banner_1.png',
    '/img/banner_2.png',
  ];

  const categoriesPageSize = 6;
  const productsPageSize = 6;
  
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
