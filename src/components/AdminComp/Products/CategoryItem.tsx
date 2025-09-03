import React, { useState } from 'react';
import styles from './CategoryItem.module.css';
import type { Category } from '../../../types/Category';

interface CategoryItemProps {
	category: Category;
	selectedIds: string[];
	onToggleSelect: (category: Category, checked: boolean, childrenIds: string[]) => void;
	onSelectCategory?: (category: Category) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	selectedIds,
	onToggleSelect,
	onSelectCategory,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const children = category.subcategories ?? [];
	const hasChildren = children.length > 0;

	const isChecked = selectedIds.includes(category.id);

	const toggleExpand = () => setIsExpanded((v) => !v);

	const handleCheckboxChange = (checked: boolean) => {
		const allIds = [category.id, ...getAllChildrenIds(category)];
		onToggleSelect(category, checked, allIds);
	};

	const getAllChildrenIds = (cat: Category): string[] => {
		let ids: string[] = [];
		if (cat.subcategories) {
			cat.subcategories.forEach((sub) => {
				ids.push(sub.id);
				ids = ids.concat(getAllChildrenIds(sub));
			});
		}
		return ids;
	};

	return (
		<div className={styles.categoryItem}>
			<div className={styles.row} onClick={() => onSelectCategory?.(category)} >
				<div className={styles.leftPart}>
					<input
						type="checkbox"
						className={styles.checkbox}
						checked={isChecked}
						onChange={(e) => handleCheckboxChange(e.target.checked)}
						onClick={(e) => e.stopPropagation()}
					/>
					<span className={styles.titleItem}>{category.name}</span>
				</div>

				{hasChildren && (
					<button
						type="button"
						className={styles.btnExp}
						aria-expanded={isExpanded}
						onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
					>
						{isExpanded ? (
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702"
									stroke="#0E2042"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : (
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M21.252 8.71777L12.936 16.6918C12.408 17.2018 11.568 17.2018 11.04 16.6918L2.74805 8.71777"
									stroke="#0E2042"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</button>
				)}
			</div>

			{isExpanded && hasChildren && (
				<div className={styles.childrenItem}>
					{children.map((sub) => (
						<CategoryItem
							key={sub.id}
							category={sub}
							selectedIds={selectedIds}
							onToggleSelect={onToggleSelect}
							onSelectCategory={onSelectCategory}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
