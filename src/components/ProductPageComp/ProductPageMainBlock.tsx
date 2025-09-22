import styles from './ProductPageMainBlock.module.css'
import ProductPageFB from './ProductPageFB';
import DetailsBProductPage from './DetailsBProductPage';
import CommentsBlock from './CommentsBlock';
import type { ProductDetail } from '../../types/Product';
import type Product from '../../types/Product';

interface ProductPageMainBlockProps {
	product: Product;
}

export default function ProductPageMainBlock({ product }: ProductPageMainBlockProps) {

	return (
		<div className={styles.ppmb}>
			<ProductPageFB
				product={product}
				images={product.displays}
				price={product.price}
				stock={product.number > 0 ? "In stock" : "Out of stock"}
				features={product.features}
			/>
			<DetailsBProductPage
				details={product.details.map((d: ProductDetail) => ({
					title: d.property_key,
					text: d.attribute
				}))}
			/>
			<CommentsBlock />
		</div>
	);
}