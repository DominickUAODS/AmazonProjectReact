import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CarouselCategory.module.css'
import type Product from "../../interfaces/ProductInterface";
import commonStyles from "../common.module.css";
import WishlistCard from '../AccountComp/WishlistCard';
import { products } from '../../data (temp)/products';
import { useState } from 'react';


export type CarouselCategoryType = {
    categoryName: string;
    products?: Product[];
    actionSlot?: React.ReactNode; 
};


const sampleProducts: Product[] = [
    { id: 1, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/6e2e55f0bddfdf51465db90fded8480f8149ec66.jpg", reviews: 10, rating: 4, price: 29.99 },
    { id: 2, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/5418ecdd2e9a4e847fbcbe5ee7d562907fe5d12a.jpg", reviews: 5, rating: 3, price: 19.99, discount: true, oldPrice: 24.99 },
    { id: 3, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/ad967c765b4e9352dd1d134a5ac133e2cb95e5a3.jpg", reviews: 8, rating: 4, price: 39.99 },
    { id: 4, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/d396e6068cd525590f9e988856354570a86751cd.jpg", reviews: 12, rating: 4, price: 49.99 },
    { id: 5, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/d363949f776baa005ce979be414a1f8c2e5a1077.jpg", reviews: 3, rating: 3, price: 14.99 },
    { id: 6, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/e84e9cf1047b6cf50615eee311207e6cbe262271.jpg", reviews: 7, rating: 4, price: 22.99, discount: true, oldPrice: 27.99 },
    { id: 7, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/5418ecdd2e9a4e847fbcbe5ee7d562907fe5d12a.jpg", reviews: 5, rating: 3, price: 19.99, discount: true, oldPrice: 24.99 },
    { id: 8, title: "SOMALER Women's Cotton Wide Brim Sun Hat - UPF50+ UV Protection, Packable Beach Bucket Cap for Summer Travel", image: "/img/5418ecdd2e9a4e847fbcbe5ee7d562907fe5d12a.jpg", reviews: 5, rating: 3, price: 19.99, discount: true, oldPrice: 24.99 },
  ];



  export default function CarouselCategory({ categoryName, products, actionSlot }: CarouselCategoryType) {
    const ITEMS_VISIBLE = 6;
    const [startIndex, setStartIndex] = useState(0);
    products = sampleProducts;
  
    const handlePrev = () => {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    };
  
    const handleNext = () => {
      setStartIndex((prev) => Math.min(prev + 1, (products ?? []).length - ITEMS_VISIBLE));
    };
  
    const visibleProducts = (products ?? []).slice(
      startIndex,
      startIndex + ITEMS_VISIBLE
    );
  
    return (
      <div className={styles.cc}>
        <div className={styles.spanSeeAll}>
          <span className={styles.mainSpancc}> {categoryName}</span>
          <button className={styles.seeAllButton}>See all
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.58398 1.92188L10.9 7.46587C11.24 7.81787 11.24 8.37788 10.9 8.72988L5.58398 14.2579" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>
          </button>
        </div>
  
        <div className={styles.carousel}>
          <button className={commonStyles.anchorButton} onClick={handlePrev} disabled={startIndex === 0}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1.92188L5.68396 7.46587C5.34396 7.81787 5.34396 8.37788 5.68396 8.72988L11 14.2579" stroke="#4A7BD9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        

          </button>
  
          <div className={styles.productMap}>
            {visibleProducts.map((c, i) => (
              <WishlistCard actionSlot={actionSlot} key={i} product={c} />
            ))}
          </div>
  
          <button className={commonStyles.anchorButton} onClick={handleNext} disabled={startIndex >= (products ?? []).length - ITEMS_VISIBLE}>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.08398 1.92188L11.4 7.46587C11.74 7.81787 11.74 8.37788 11.4 8.72988L6.08398 14.2579" stroke="#4A7BD9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> </svg>
          </button>
        </div>
      </div>
    );
  }