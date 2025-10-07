import styles from './ProductPage.module.css'
import ProductPageMainBlock from './ProductPageMainBlock';
import BreadCrumb from './BreadCrumb';
import commonStyles from "../common.module.css";
import CarouselCategory from './CarouselCategory';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type Product from '../../types/Product';
import type ProductList from '../../interfaces/_ProductInterface';
import type { Category } from '../../types/Category';

export default function ProductPage() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const { id } = useParams<{ id: string }>();

	const [product, setProduct] = useState<Product>();
	const [loading, setLoading] = useState(true);

	const [relatedProducts, setRelatedProducts] = useState<ProductList[]>([]);
	const [onSaleProducts, setOnSaleProducts] = useState<ProductList[]>([]);

	const [categoriesMap, setCategoriesMap] = useState<Record<string, Category>>({});

	const [currentCategory, setCurrentCategory] = useState<Category>();
	const [rootCategory, setRootCategory] = useState<Category>();

	useEffect(() => {
		async function fetchProduct() {
		  console.log("[fetchProduct] start");
		  console.log("[fetchProduct] id:", id);
		  console.log("[fetchProduct] API_SERVER:", API_SERVER);
		  console.log("[fetchProduct] url:", `${API_SERVER}/product/${id}`);
	  
		  try {
			const res = await fetch(`${API_SERVER}/product/${id}`);
	  
			console.log("[fetchProduct] response status:", res.status);
	  
			if (!res.ok) {
			  const text = await res.text();
			  console.error("[fetchProduct] response not ok:", text);
			  throw new Error("Failed to fetch product");
			}
	  
			const data = await res.json();
			console.log("[fetchProduct] response body:", data);
	  
			setProduct(data);
		  } catch (err) {
			console.error("[fetchProduct] error:", err);
		  } finally {
			console.log("[fetchProduct] finished");
			setLoading(false);
		  }
		}
	  
		if (id) {
		  console.log("[useEffect] id exists, calling fetchProduct()");
		  fetchProduct();
		} else {
		  console.warn("[useEffect] id is missing!");
		}
	  }, [id, API_SERVER]);

	useEffect(() => {
		fetch(`${API_SERVER}/category`)
			.then((res) => res.json())
			.then((data: Category[]) => {
				const map: Record<string, Category> = {};
				data.forEach((cat) => (map[cat.id] = cat));
				setCategoriesMap(map);
			});
	}, [API_SERVER]);

	useEffect(() => {
		if (!product || Object.keys(categoriesMap).length === 0) return;

		const currCat = categoriesMap[product.category_id];
		if (!currCat) return;

		// находим корневую категорию
		let rootCat: Category = currCat;
		while (rootCat.parent_id) {
			const parent = categoriesMap[rootCat.parent_id];
			if (!parent) break;
			rootCat = parent;
		}

		setCurrentCategory(currCat);
		setRootCategory(rootCat);

		async function fetchCarousels() {
			// Related products (текущая категория)
			const resRelated = await fetch(`${API_SERVER}/product?categoryId=${currCat.id}`);
			const related: ProductList[] = await resRelated.json();
			setRelatedProducts(related);

			// On sale products (все товары корневой категории)
			const resSale = await fetch(`${API_SERVER}/product?categoryId=${rootCat.id}&OnlyDiscounted=true`);
			const sale: ProductList[] = await resSale.json();
			setOnSaleProducts(sale);
		}

		fetchCarousels();
	}, [API_SERVER, categoriesMap, product]);

	if (!product || !currentCategory || !rootCategory) return <div>Loading...</div>;

	// const currentCategory = categoriesMap[product.category_id];
	// let rootCategory: Category = currentCategory;
	// while (rootCategory.parent_id) {
	// 	rootCategory = categoriesMap[rootCategory.parent_id];
	// }

	const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

	if (loading) return <p>Loading...</p>;
	if (!product) return <p>Product not found</p>;

	return (
		<div className={styles.pp}>
			<BreadCrumb category={currentCategory} categoriesMap={categoriesMap} />
			<ProductPageMainBlock product={product} />
			<CarouselCategory categoryName={currentCategory?.name || "Current category"} products={relatedProducts.length > 0 ? relatedProducts : undefined} />
			<CarouselCategory actionSlot={
				<div className={commonStyles.discountBlock}>
					<svg width="64" height="40" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.12384 40.2582C0.0858968 39.9434 0.0669252 39.6287 0.0479536 39.3139C-1.16623 19.0895 20.9357 7.26576 36.9477 2.83923C54.781 -2.07914 74.9668 -0.800369 91.4531 8.19042C114.162 20.5847 124.748 46.6914 127.689 71.9325C128.391 78.0117 121.978 82.1824 117.065 78.7789C108.243 72.6998 99.6868 61.4072 88.8161 59.3022C75.8205 56.7839 63.4131 62.9221 51.0436 66.66C32.1858 72.3457 2.36249 64.3386 0.12384 40.2582Z" fill="#B8EA48" />
					</svg>
				</div>}
				categoryName={rootCategory?.name ? `${rootCategory.name}: sale` : "Sale"} products={onSaleProducts.length > 0 ? onSaleProducts : undefined} />

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