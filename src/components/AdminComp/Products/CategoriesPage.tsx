import { useState, useEffect, useMemo } from 'react';
import CategoryTree from './CategoryTree';
import CategoryCard from './CategoryCard';
import AdminHeader from '../AdminHeader';
import Filters from './Filters';
import CreateEditCategoryModal from './CreateEditCategoryModal';
import type { Category } from '../../../types/Category';
import styles from './CategoriesPage.module.css';
import EmptyCategoryTree from './EmptyCategoryTree';
import EmtyCategoryCard from './EmptyCategoryCard';
import AddSubCategoryToEmpty from './AddSubCategoryToEmpty';

export interface CategoryFormData {
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
	const [barHighlighted, setBarHighlighted] = useState(false);

	const [debouncedSearch, setDebouncedSearch] = useState<string>('');
	useEffect(() => {

		setSelectedCategory(null);
	  }, [categoryFilter]);

	  const [initialized, setInitialized] = useState(false);

	useEffect(() => {
	const fetchCategories = async () => {
		setLoading(true);
		try {
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
			console.log("Raw data from server:", data); 
			

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

			const map = new Map<string, Category>();
			flat.forEach((cat) => map.set(cat.id, { ...cat, subcategories: [] }));

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
			console.log("Transformed category tree (roots):", roots);
			setCategories(roots);
		} catch (err) {
			console.error("Ошибка загрузки категорий:", err);
		} finally {
			setLoading(false);
			setInitialized(true);
		}
	};


	if (!initialized || debouncedSearch || categoryFilter) {
		fetchCategories();
	}
}, [API_SERVER, debouncedSearch, categoryFilter, initialized]);
	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE);
		return () => clearTimeout(timeout);
	}, [search, SEARCH_DEBOUNCE]);

	
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


	const openAddRootCategory = () => {
		setModalCategory(null);   
		setPendingParentId(null); 
		setShowModal(true);       
	  };

	const openAddSubcategory = (parent: Category) => {
		setModalCategory(null);           
		setPendingParentId(parent.id);    
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
						openAddCategory={openAddRootCategory}
					/>
				</div>

				<div className={styles.borderBottom}></div>

				{categoryFilter !== "" && selectedParent ? (
						<div
						className={styles.selectedCategoryBar}
						style={{
						backgroundColor: barHighlighted ? "rgba(224, 235, 255, 1)" : "transparent",
						cursor: "pointer",
						}}
						onClick={() => {
						if (selectedCategory?.id === selectedParent.id) {
							setBarHighlighted((prev) => !prev); 
						} else {
							setSelectedCategory(selectedParent); 
							setBarHighlighted(true);             
						}
						}}
					>
						<div className={styles.selectedCategoryName}>{selectedParent.name}</div>
						<button
						type="button"
						className={styles.addSubcategoryBtn}
						onClick={(e) => {
							e.stopPropagation();              
							openAddSubcategory(selectedParent); 
						  }}
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
				
				{categoryFilter === "" ? null : (
					<div className={styles.borderBottom}></div>
				)}

				

						<div>
						{categoryFilter === "" ? (
							<EmptyCategoryTree spanTitle={"Subcategory not found"}/>
						) : visibleCategories.length > 0 ? (
							<CategoryTree
							categories={visibleCategories}
							selectedIds={selectedIds}
							selectedCategory={selectedCategory}
							onSelectCategory={handleSelectCategory}
							onToggleSelect={handleToggleSelect}
							/>
						) : (
							<>
								<AddSubCategoryToEmpty parent = {selectedParent || null} addSub={openAddSubcategory}/>
							</> 
						)}
						</div>

			</div>
			<div className={styles.section2}>
				{categoryFilter === "" ? (
					
					<>
					<EmtyCategoryCard/>
					</>
				) : (

					(selectedCategory || selectedParent) && (
					<CategoryCard
						category={(selectedCategory || selectedParent)!}
						parentCategoryName={selectedCategory?.parentName ?? undefined}
						onEdit={handleEditCategory}
						onDelete={handleDeleteCategory}
					/>
					)
				)}
			</div>

			<CreateEditCategoryModal
			show={showModal}
			onClose={() => setShowModal(false)}
			onCreate={(data: CategoryFormData) => handleModalSubmit(data)}
			category={modalCategory}
			parentId={modalCategory?.parent_id ?? pendingParentId ?? null}

			/>
		</div>
	);
};

export default CategoriesPage;
