
import styles from './ProductByCategory.module.css'
import cmStyles from '../Products/CategoriesPage.module.css'
import { useEffect, useState } from 'react';
import type { Category } from '../../../types/Category';
import ProductFilter from './ProductFilter';
import type { OneProductProps } from './OneProduct';
import ProductListWithPagination from './ProductListWithPagination';
import ProductCardAdmin from './ProductCardAdmin';



export default function ProductByCategory() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const productsPerPage = Number(import.meta.env.VITE_PRODUCT_PER_PAGE);
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<OneProductProps[]>([]);
	const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]); // для чекбоксов
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null); // для подсветки
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');

	// Загружаем категории
	useEffect(() => {
		fetch(`${API_SERVER}/category`)
			.then(res => res.json())
			.then(data => setCategories(data))
			.catch(err => console.error(err));
	}, [API_SERVER]);

	// Загружаем продукты при изменении фильтров
	const loadProducts = async () => {
		const params = new URLSearchParams();
		if (categoryFilter) params.append("CategoryId", categoryFilter);
		if (search) params.append("search", search);
		//console.log("Фильтр по категории:", categoryFilter);
		//console.log("Запрос:", `${API_SERVER}/Product?${params.toString()}`)
		fetch(`${API_SERVER}/Product?${params.toString()}`)
			.then(async (res) => {
				if (!res.ok) {
					const text = await res.text();
					throw new Error(`Ошибка ${res.status}: ${text}`);
				}
				const text = await res.text();
				if (!text) return []; // если пусто → вернём []
				return JSON.parse(text);
			})
			.then((data) => {
				setProducts(data);
				setCurrentPage(1);
				//console.log("Полученные продукты:", data);
			})
			.catch((err) => console.error("Ошибка загрузки продуктов:", err));
	};

	useEffect(() => {
		loadProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [API_SERVER, categoryFilter, search]);

	const handleDeleteProduct = async (productId: string) => {
		//console.log("i am here")
		try {
			//console.log(productId)

			const responce = await fetch(`${API_SERVER}/product/${productId}`, {
				method: "DELETE",
			});
			if (!responce.ok) {
				throw new Error(`Ошибка при удалении: ${responce.status}`);
			}
			await loadProducts();
		} catch (err) {
			console.error("Ошибка при удалении продукта:", err);
		}
	};

	return (
		<div className={cmStyles.panel}>
			<div className={cmStyles.section1}>
				<div className={cmStyles.header}>

					<div className={styles.title}>
						Category
					</div>

					<ProductFilter
						categoryFilter={categoryFilter}
						setCategoryFilter={setCategoryFilter}
						search={search}
						setSearch={setSearch}
						categories={categories}
					/>
				</div>

				<ProductListWithPagination
					products={products}
					selectedIds={selectedProductIds}
					setSelectedIds={setSelectedProductIds}
					selectedProductId={selectedProductId}
					setSelectedProductId={setSelectedProductId}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					productsPerPage={productsPerPage}
				/>
			</div>

			<div className={cmStyles.section2}>
				<ProductCardAdmin productId={selectedProductId} onDelete={handleDeleteProduct} />
			</div>

		</div>
	);
}