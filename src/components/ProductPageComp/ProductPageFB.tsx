import styles from './ProductPageFB.module.css'
import ImageCarousel from './ImageCarousel';
import FeaturesProductBlock from './FeaturesProductBlock';
import QuantityProductPrice from './QuantityProductPrice';
import type { ProductFeature } from '../../types/Product';
import type Product from '../../types/Product';

interface ProductPageFBProps {
	product: Product;
	images: string[];
	price: number;
	stock: string;
	features: ProductFeature[];
}

export default function ProductPageFB({ product, images, price, stock, features }: ProductPageFBProps) {

	return (
		<div className={styles.ppfb}>
			<ImageCarousel images={images} />
			<FeaturesProductBlock product={product} features={features} />
			<QuantityProductPrice price={price} status={stock} />
		</div>
	);
}