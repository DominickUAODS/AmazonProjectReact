import React, { useEffect, useState } from 'react';
//import type { Category } from '../../../types/Category';
import styles from './ProductCard.module.css'
import type { OneProductProps } from './OneProduct';
import ProductGallery from './ProductGallery';
import { useNavigate } from 'react-router-dom';

export type ProductFeature = {
	name: string;
	description: string;
}

export type ProductDetail = {
	property_key_id: string;
	property_key: string;
	attribute: string;
};

export type ProductFromApi = {
	id?: string;
	name: string;
	code: string;
	category_id: string;
	price: number;
	discount: number;
	number: number;
	displays: string[];
	details: ProductDetail[];
	features: ProductFeature[];
};

interface ProductCardProps {
	productId?: string | null;
	onEdit?: (product: OneProductProps) => void;
	onDelete?: (productId: string) => void;
}

const ProductCardAdmin: React.FC<ProductCardProps> = ({ productId }) => {
	const [product, setProduct] = useState<ProductFromApi | null>(null);
	const navigate = useNavigate();

	const handleEdit = () => {
		if (productId) {
			navigate(`/-/product-settings/${productId}`);
		}
	};

	useEffect(() => {
		if (!productId) {
			setProduct(null);
			return;
		}

		fetch(`${import.meta.env.VITE_API_SERVER}/Product/${productId}`)
			.then(res => {
				if (!res.ok) throw new Error("Ошибка загрузки продукта");
				return res.json();
			})
			.then(data => setProduct(data))
			.catch(err => {
				console.error(err);
				setProduct(null);
			});
	}, [productId]);


	return (
		<>
			{productId ?
				(<div className={styles.mainPosition}>
					<div className={styles.productInfo}>
						<div className={styles.photoName}>
							{product?.displays && (<><ProductGallery images={product.displays} /></>)}
							<span className={styles.name}>{product?.name}</span>
						</div>
						<span className={styles.customerReviews}> See all customer reviews</span>
					</div>

					<div className={styles.btnGroup}>
						<button className={styles.editBtn} onClick={handleEdit}>
							<svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M20.0692 24.4999H9.42219C6.55919 24.4999 4.24219 22.1829 4.24219 19.3199V8.67285" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M9.42969 3.5H20.0767C22.9397 3.5 25.2567 5.817 25.2567 8.68V19.327" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M16.7805 14.6377L11.4815 19.9437L8.81445 17.2697L14.1135 11.9707" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M7.93945 20.8115L11.4815 19.9435L8.80745 17.2695L7.93945 20.8115Z" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M15.4785 10.668L18.1035 13.293" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M16.8223 9.36621L19.3913 11.9282" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M18.1797 7.90325L18.6417 7.43425C18.9707 7.10525 19.5027 7.10525 19.8317 7.43425L21.3087 8.91825C21.6377 9.24725 21.6377 9.77925 21.3087 10.1082L20.8467 10.5703" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
							<span className={styles.spanInfo}>Edit</span>
						</button>
						<button className={styles.deleteBtn}>
							<svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M22.9405 8.60938L21.0505 23.5194C20.9105 24.5694 20.0005 25.3394 18.9505 25.3394H10.5505C9.50055 25.3394 8.59055 24.5694 8.45055 23.5194L6.56055 8.60938" stroke="#EA4848" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M22.9405 4.96973H6.56055" stroke="#EA4848" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M11.5996 4.96984V4.68984C11.5996 3.56984 12.5096 2.58984 13.6996 2.58984H15.8696C16.9896 2.58984 17.9696 3.49984 17.9696 4.68984V4.96984" stroke="#EA4848" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
							<span className={styles.spanInfo}>Delete</span>
						</button>
					</div>

				</div>
				) : (
					<div className={styles.mainPosition2}>
						<div className={styles.emptyCard}>
							<span>Select a product to see its information</span>
						</div>

					</div>
				)}
		</>
	);
};

export default ProductCardAdmin;