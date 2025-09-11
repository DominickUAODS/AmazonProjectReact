import { useState, useEffect, useMemo } from 'react';
import CategoryTree from './CategoryTree';
import CategoryCard from './CategoryCard';
import AdminHeader from '../AdminHeader';
import Filters from './Filters';
import CreateEditCategoryModal from './CreateEditCategoryModal';
import type { Category } from '../../../types/Category';
import styles from './CategoriesPage.module.css';

interface CategoryFormData {
	name: string;
	description: string;
	isActive: boolean;
	image?: string;
	icon?: number;
	parentId?: string | null;
}

const CategoriesPage = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const SEARCH_DEBOUNCE = Number(import.meta.env.VITE_SEARCH_DEBOUNCE);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [modalCategory, setModalCategory] = useState<Category | null>(null);
	const [pendingParentId, setPendingParentId] = useState<string | null>(null);
	const [search, setSearch] = useState<string>('');
	const [categoryFilter, setCategoryFilter] = useState('');
	const [loading, setLoading] = useState(true);

	const [debouncedSearch, setDebouncedSearch] = useState<string>('');

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await fetch(`${API_SERVER}/category`);
				const data = await response.json();

				const flat: Category[] = data.map((cat: Category) => ({
					id: cat.id,
					image: cat.image,
					icon: cat.icon,
					name: cat.name,
					is_active: cat.is_active,
					description: cat.description,
					parent_id: cat.parent_id,
					subcategories: [],
				}));

				// Строим карту
				const map = new Map<string, Category>();
				flat.forEach((cat) => map.set(cat.id, { ...cat, subcategories: [] }));

				// Заполняем связи
				const roots: Category[] = [];
				flat.forEach((cat) => {
					//console.log(cat)
					if (cat.parent_id) {
						const parent = map.get(cat.parent_id);
						if (parent) {
							cat.parentName = parent.name;
							parent.subcategories.push(map.get(cat.id)!);
						}
					} else {
						roots.push(map.get(cat.id)!);
					}
				});

				setCategories(roots);
			} catch (error) {
				console.error("Ошибка загрузки категорий:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchCategories();
	}, [API_SERVER]);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE);
		return () => clearTimeout(timeout);
	}, [search, SEARCH_DEBOUNCE]);

	useEffect(() => {

		const handleSearch = async () => {
			setLoading(true);

			try {
				// const url = categoryFilter
				// 	? `${API_SERVER}/category/search?query=${encodeURIComponent(debouncedSearch)}&parentId=${categoryFilter}`
				// 	: `${API_SERVER}/category/search?query=${encodeURIComponent(debouncedSearch)}`;
				
				let url = `${API_SERVER}/category`;

				
				if (debouncedSearch || categoryFilter) {
					url = `${API_SERVER}/category/search?`;

					if (debouncedSearch) {
						url += `query=${encodeURIComponent(debouncedSearch)}&`;
					}
					if (categoryFilter) {
						url += `parentId=${categoryFilter}&`;
					}

					url = url.replace(/&$/, "");
				}

				const response = await fetch(url);
				const data = await response.json();

				const flat: Category[] = data.map((cat: Category) => ({
					id: cat.id,
					image: cat.image,
					icon: cat.icon,
					name: cat.name,
					is_active: cat.is_active,
					description: cat.description,
					parent_id: cat.parent_id,
					subcategories: [],
				}));

				// Строим карту
				const map = new Map<string, Category>();
				flat.forEach((cat) => map.set(cat.id, { ...cat, subcategories: [] }));

				// Заполняем связи
				const roots: Category[] = [];
				flat.forEach((cat) => {
					if (cat.parent_id) {
						const parent = map.get(cat.parent_id);
						if (parent) {
							cat.parentName = parent.name;
							parent.subcategories.push(map.get(cat.id)!);
						}
					} else {
						roots.push(map.get(cat.id)!);
					}
				});

				setCategories(roots);
			} catch (err) {
				console.error("Ошибка при поиске категорий:", err);
			} finally {
				setLoading(false);
			}
		};

		handleSearch();
	}, [API_SERVER, debouncedSearch, categoryFilter]);


	// утилита поиска узла по id в дереве
	const findById = (nodes: Category[], id: string): Category | null => {
		for (const n of nodes) {
			if (n.id === id) return n;
			const child = findById(n.subcategories || [], id);
			if (child) return child;
		}
		return null;
	};

	// выбранная в фильтре родительская категория
	const selectedParent = useMemo(
		() => (categoryFilter ? findById(categories, categoryFilter) : null),
		[categories, categoryFilter]
	);

	// что показывать в дереве: либо корни, либо подкатегории выбранного родителя
	const visibleCategories = useMemo<Category[]>(
		() => (selectedParent ? selectedParent.subcategories : categories),
		[selectedParent, categories]
	);

	const handleSelectCategory = (category: Category) => setSelectedCategory(category);

	const handleToggleSelect = (_category: Category, checked: boolean, allIds: string[]) => {
		if (checked) {
			setSelectedIds(prev => Array.from(new Set([...prev, ...allIds])));
		} else {
			setSelectedIds(prev => prev.filter(id => !allIds.includes(id)));
		}
	};

	const handleEditCategory = (category: Category) => {
		setModalCategory(category);
		setPendingParentId(null);
		setShowModal(true);
	};

	const handleDeleteCategory = (categoryId: string) => {
		const removeRecursive = (cats: Category[]): Category[] =>
			cats
				.filter(c => c.id !== categoryId)
				.map(c => ({ ...c, subcategories: removeRecursive(c.subcategories) }));
		setCategories(prev => removeRecursive(prev));

		if (selectedCategory?.id === categoryId) setSelectedCategory(null);
		setSelectedIds(prev => prev.filter(id => id !== categoryId));
	};

	const addToTree = (cats: Category[], parentId: string | null, node: Category): Category[] => {
		if (!parentId) return [...cats, node];
		return cats.map((c) =>
			c.id === parentId
				? { ...c, subcategories: [...(c.subcategories || []), node] }
				: { ...c, subcategories: addToTree(c.subcategories || [], parentId, node) }
		);
	};

	const handleModalSubmit = (data: CategoryFormData) => {
		const normalizedParentId = pendingParentId ?? data.parentId ?? null;

		if (modalCategory) {
			// обновление
			const updateRecursive = (cats: Category[]): Category[] =>
				cats.map((c) =>
					c.id === modalCategory.id
						? {
							...c,
							name: data.name,
							description: data.description,
							is_active: data.isActive,
							image: data.image ?? c.image ?? null,
							icon: data.icon ?? c.icon ?? null,
							parent_id: normalizedParentId,
						}
						: { ...c, subcategories: updateRecursive(c.subcategories || []) }
				);
			setCategories((prev) => updateRecursive(prev));
			if (selectedCategory?.id === modalCategory.id) {
				setSelectedCategory({
					...selectedCategory,
					name: data.name,
					description: data.description,
					is_active: data.isActive,
					image: data.image ?? selectedCategory.image ?? null,
					icon: data.icon ?? selectedCategory.icon ?? null,
					parent_id: normalizedParentId,
				});
			}
		} else {
			// добавление (локально; при необходимости заменишь на fetch POST)
			const newCat: Category = {
				id: crypto.randomUUID(),
				name: data.name,
				description: data.description,
				is_active: data.isActive,
				image: data.image ?? null,
				icon: data.icon ?? null,
				parent_id: normalizedParentId,
				parentName: null,
				subcategories: [],
			};
			setCategories((prev) => addToTree(prev, normalizedParentId, newCat));
			setSelectedCategory(newCat);
			setSelectedIds((prev) => [...prev, newCat.id]);
		}

		setPendingParentId(null);
		setShowModal(false);
		setModalCategory(null);
	};

	const openAddSubcategory = (parent: Category) => {
		setModalCategory(null);           // создаём новую
		setPendingParentId(parent.id);    // проставим parent_id
		setShowModal(true);
	};

	if (loading) return <p>Loading categories...</p>;

	return (
		<div className={styles.panel}>
			<AdminHeader />
			<div className={styles.section1}>
				<div className={styles.header}>
					<div className={styles.title}>Category</div>
					<Filters
						categoryFilter={categoryFilter}
						setCategoryFilter={setCategoryFilter}
						search={search}
						setSearch={setSearch}
						categories={categories}
					/>
				</div>

				<div className={styles.borderBottom}></div>

				{categoryFilter !== "" && selectedParent ? (
					<div className={styles.selectedCategoryBar}>
						<div className={styles.selectedCategoryName}>{selectedParent.name}</div>
						<button
						type="button"
						className={styles.addSubcategoryBtn}
						onClick={() => openAddSubcategory(selectedParent)}
						aria-label="Add subcategory"
						title="Add subcategory"
						>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
						</button>
					</div>
					) : (
					<div className={styles.selectedCategoryPlaceholder}>
						
					</div>
				)}

				<div className={styles.borderBottom}></div>

				{categoryFilter !== "" ? (
				<CategoryTree
					categories={visibleCategories}
					selectedIds={selectedIds}
					selectedCategory={selectedCategory}
					onSelectCategory={handleSelectCategory}
					onToggleSelect={handleToggleSelect}
				/>
				) : (
				<div className={styles.emptyTreePlaceholder}></div>
				)}

			</div>
			<div className={styles.section2}>
				{categoryFilter === "" ? (
					// Если Choose category...
					<>
					<div className={styles.placeholderDiv}> {/* Пока пустой див */}</div>
					<div className={styles.placeholderDiv}></div>
					</>
				) : (

					selectedCategory && (
					<CategoryCard
						category={selectedCategory}
						parentCategoryName={selectedCategory.parentName ?? undefined}
						onEdit={handleEditCategory}
						onDelete={handleDeleteCategory}
					/>
					)
				)}
			</div>

			<CreateEditCategoryModal
				show={showModal}
				onClose={() => setShowModal(false)}
				onCreate={handleModalSubmit}
				category={modalCategory || ({} as Category)}
			/>
		</div>
	);
};

export default CategoriesPage;
