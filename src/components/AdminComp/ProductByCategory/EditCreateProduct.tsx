
import styles from './EditCreateProduct.module.css'
import cmStyles from '../Products/CategoriesPage.module.css'
import type { ProductFromApi } from './ProductCardAdmin';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuEditCreateProduct from './MenuEditCreateProduct';
import AboutProduct from './AboutProduct';
import GeneralInfo from './GeneralInfo';
import ProductDetails from './ProductDetails';


export default function EditCreateProduct() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const { id: productId } = useParams();
	const navigate = useNavigate();
	const generalRef = useRef<HTMLDivElement>(null);
	const detailsRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const [activeTab, setActiveTab] = useState<"general" | "details" | "about">("general");

	const [product, setProduct] = useState<ProductFromApi>({
		id: undefined,
		name: "",
		code: "",
		price: 0,
		discount: 0,
		number: 0,
		category_id: "",
		displays: [],
		details: [],
		features: [],
	});
	const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!productId) return;

		fetch(`${API_SERVER}/product/${productId}`)
			.then(async (res) => {
				//console.log("[EditCreateProduct] Response status:", res.status, res.statusText);
				if (!res.ok) {
					const text = await res.text();
					console.error("[EditCreateProduct] Response body:", text);
					throw new Error("Ошибка загрузки продукта");
				}
				return res.json();
			})
			.then((data) => {
				//console.log("[EditCreateProduct] Продукт с сервера:", data);
				setProduct(data);
				if (data.category_id) setCategoryId(data.category_id);
			})
			.catch((err) => {
				console.error("[EditCreateProduct] Ошибка при загрузке продукта:", err);
				//setProduct(null);
			});

	}, [API_SERVER, productId]);

	const updateProduct = (patch: Partial<ProductFromApi>) => {
		setProduct((prev) => ({ ...prev, ...patch }));
	};

	const handleTabClick = (tab: "general" | "details" | "about") => {
		setActiveTab(tab);

		let element: HTMLDivElement | null = null;
		if (tab === "general") element = generalRef.current;
		if (tab === "details") element = detailsRef.current;
		if (tab === "about") element = aboutRef.current;

		element?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSubmit = async () => {
		if (productId) {
			const payload = {
				...product,
				category_id: categoryId || null,
			}
			//console.log("Сохраняем изменения продукта:", product);

			await fetch(`${API_SERVER}/product/${productId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			})
				.then(res => res.json()).then(() => { navigate(-1) })
			// .then(data => {
			// 	console.log("Обновлено:", data);
			// 	navigate(-1);
			// });
		} else {
			//console.log("Создаём новый продукт:", product);
			const payload = {
				...product,
				category_id: categoryId || null,
			}
			//console.log("Создаём новый продукт:", payload);
			await fetch(`${API_SERVER}/product`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			})
				.then(res => res.json()).then(() => { navigate(-1) })
			// .then(data => {
			// 	console.log("Создано:", data);
			// 	navigate(-1);
			// });
		}
	};
	//console.log("setCategoryId");
	//	console.log(categoryId);

	return (
		<div className={cmStyles.panel}>

			<MenuEditCreateProduct activeTab={activeTab} onTabClick={handleTabClick} />

			<div className={styles.tabContent}>
				<div ref={generalRef}>
					<GeneralInfo product={product} onCategoryChange={setCategoryId} onChange={updateProduct} />
				</div>
				<div ref={detailsRef}>
					<ProductDetails details={product.details} categoryId={categoryId} onChange={(details) => updateProduct({ details })} />
				</div>
				<div ref={aboutRef}>
					<AboutProduct features={product.features} onChange={(features) => updateProduct({ features })} />
				</div>
			</div>

			{/* Нижний бар */}
			<div className={styles.footerNav}>
				<div className={styles.spnGroup}>
					<span className={styles.stn}>
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 4.93945V17.4295" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M34.9998 19.9395H22.5098" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M5 19.9395H17.49C18.88 19.9395 20 21.0595 20 22.4495V34.9395" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						{productId ? "Edit product" : "Create product"}
					</span>
				</div>
				<div className={styles.btnGroup}>
					<button
						className={styles.secondaryButton}
						onClick={() => navigate(-1)}
					>
						Cancel
					</button>
					<button
						className={styles.nextStepButton}
						onClick={handleSubmit}
					>
						{productId ? "Save changes" : "Create"}
					</button>
				</div>
			</div>
		</div>
	);
}