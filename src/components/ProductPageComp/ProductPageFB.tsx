import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductPageFB.module.css'
import ImageCarousel from './ImageCarousel';
import FeaturesProductBlock from './FeaturesProductBlock';
import QuantityProductPrice from './QuantityProductPrice';

const images = [
    "./public/img/70cf443b07961618ce0eb78c2e454e2cc8171788.jpg",
    "./public/img/96777c3c3a0012cb29dde415fdbe855e099cc04f (1).jpg",
    "./public/img/23b804463a532050bf1d9e72ceeaff57e3ea8c3b.jpg",
    "./public/img/7a07a907160d4959e3f9b948b047a53245415bd6.jpg",
    "./public/img/fcba567adbf7ee885f03859f02b01f544c29048a.jpg"
  ];
export default function ProductPageFB() {
	
	return (
		<div className={styles.ppfb}>
            <ImageCarousel images={images}/>
            <FeaturesProductBlock/>
            <QuantityProductPrice price={38.64} status='In stock'/>		
		</div>
	);
}