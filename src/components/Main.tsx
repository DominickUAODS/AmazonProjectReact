import './Main.css';
import { MainCarousel } from './MainCarousel';
import { CategoryLine } from './CategoryLine';
import { ProductLine } from './ProductLine';
import { LoginBanner } from './LoginBanner';

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
      <hr className='main-separator' />
      <ProductLine type='trending' pageSize={productsPageSize} />
      <hr className='main-separator' />
      <CategoryLine page={2} pageSize={categoriesPageSize} />
      <hr className='main-separator' />
      <ProductLine type='sale' pageSize={productsPageSize} />
      <hr className='main-separator' />
      <LoginBanner />
    </div>
  );
}

export { Main };
