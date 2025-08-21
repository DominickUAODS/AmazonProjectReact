import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductPage.module.css'
import ProductPageMainBlock from './ProductPageMainBlock';
import BreadCrumb from './BreadCrumb';
import commonStyles from "../common.module.css";
import CarouselCategory from './CarouselCategory';
export default function ProductPage() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className={styles.pp}>
			<BreadCrumb />
			<ProductPageMainBlock />
			<CarouselCategory categoryName={"More casual women`s dresses"} />
			<CarouselCategory actionSlot={
				<div className={commonStyles.discountBlock}>
					<svg width="64" height="40" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.12384 40.2582C0.0858968 39.9434 0.0669252 39.6287 0.0479536 39.3139C-1.16623 19.0895 20.9357 7.26576 36.9477 2.83923C54.781 -2.07914 74.9668 -0.800369 91.4531 8.19042C114.162 20.5847 124.748 46.6914 127.689 71.9325C128.391 78.0117 121.978 82.1824 117.065 78.7789C108.243 72.6998 99.6868 61.4072 88.8161 59.3022C75.8205 56.7839 63.4131 62.9221 51.0436 66.66C32.1858 72.3457 2.36249 64.3386 0.12384 40.2582Z" fill="#B8EA48"/>
					</svg>
				</div>} 
				categoryName={"Fashion: sale"} />

			<button
				onClick={scrollToTop}
				className={`${commonStyles.anchorButton} ${styles.topButton}`}
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M21.252 15.8682L12.936 7.89422C12.408 7.38422 11.568 7.38422 11.04 7.89422L2.74805 15.8682"
						stroke="#0E2042"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
}