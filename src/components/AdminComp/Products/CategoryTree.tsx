import React from 'react';
import CategoryItem from './CategoryItem';
import type { Category } from '../../../types/Category';

interface CategoryTreeProps {
	categories: Category[];
	selectedIds: string[];
	selectedCategory: Category | null;
	onSelectCategory: (category: Category) => void;
	onToggleSelect: (category: Category, checked: boolean, allIds: string[]) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
	categories,
	selectedIds,
	onSelectCategory,
	onToggleSelect,
	selectedCategory
}) => {
	return (
		<div>
			{categories.map((category) => (
				<CategoryItem
					key={category.id}
					category={category}
					selectedIds={selectedIds}
					onSelectCategory={onSelectCategory}
					selectedCategoryId={selectedCategory?.id}
					onToggleSelect={onToggleSelect}
				/>
			))}
		</div>
	);
};

export default CategoryTree;


// import React from "react";
// import styles from "./CategoryTree.module.css";
// import type { Category } from "../../../types/Category";



// const CategoryTree: React.FC<CategoryTreeProps> = ({
// 	categories,
// 	selectedIds,
// 	selectedCategory,
// 	onSelectCategory,
// 	onToggleSelect
// }) => {
// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.list}>
// 				{categories.map((category) => (
// 					<div
// 						key={category.id}
// 						className={`${styles.item} ${selectedCategory?.id === category.id ? styles.active : ""
// 							}`}
// 						onClick={() => onSelectCategory(category)}
// 					>
// 						{category.name}
// 					</div>
// 				))}
// 			</div>

// 			<div className={styles.borderBottom}></div>

// 			{selectedCategory ? (
// 				<div className={styles.selectedBlock}>
// 					<div className={styles.selectedHeader}>
// 						<h3>{selectedCategory.name}</h3>
// 						<button
// 							className={styles.addBtn}
// 							onClick={() => onToggleSelect(selectedCategory, true, [selectedCategory.id])}
// 						>
// 							＋
// 						</button>
// 					</div>

// 					<div className={styles.subcategories}>
// 						{selectedCategory.subcategories.length > 0 ? (
// 							selectedCategory.subcategories.map((sub) => (
// 								<div key={sub.id} className={styles.subItem}>
// 									{sub.name}
// 								</div>
// 							))
// 						) : (
// 							<p className={styles.empty}>Нет подкатегорий</p>
// 						)}
// 					</div>
// 				</div>
// 			) : (
// 				<p className={styles.empty}>Выберите категорию или добавьте новую</p>
// 			)}
// 		</div>
// 	);
// };

// export default CategoryTree;