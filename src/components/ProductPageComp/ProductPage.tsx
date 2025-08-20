import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductPage.module.css'
import ProductPageMainBlock from './ProductPageMainBlock';
import BreadCrumb from './BreadCrumb';

export default function ProductPage() {
	
	return (
		<div className={styles.pp}>
            <BreadCrumb/>
            <ProductPageMainBlock/>
		</div>
	);
}