
import styles from './AllCategoriesDropDown.module.css'
import commonStyles from '../../common.module.css';
import { useEffect, useState } from 'react';
import type { Category } from '../../../types/Category';

type AllCategoriesDropDownProps = {
	isLegend: boolean,
	my_value: string | null,
	onChange: (value: string) => void;
}

type CategoryWithSubs = Category & {
	subcategories: CategoryWithSubs[];
};

export default function AllCategoriesDropDown({ isLegend, my_value, onChange }: AllCategoriesDropDownProps) {
	const [open, setOpen] = useState<boolean>(false);
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(`${API_SERVER}/category`);
				const data: CategoryWithSubs[] = await response.json();


				const map = new Map<string, CategoryWithSubs>();
				data.forEach((cat) =>
					map.set(cat.id, { ...cat, subcategories: [] })
				);

				const roots: CategoryWithSubs[] = [];
				data.forEach((cat) => {
					if (cat.parent_id) {
						const parent = map.get(cat.parent_id);
						if (parent) {
							parent.subcategories.push(map.get(cat.id)!);
						}
					} else {
						roots.push(map.get(cat.id)!);
					}
				});

				setCategories(roots);
			} catch (err) {
				console.error("Ошибка загрузки категорий:", err);
			}
		};

		fetchCategories();
	}, [API_SERVER]);


	const CategoryItem: React.FC<{ cat: CategoryWithSubs; level: number }> = ({ cat, level }) => {
		const [expanded, setExpanded] = useState(false);

		return (
			<div className={styles.categoryItem}>
				<div
					className={styles.categoryRow}
					style={{ paddingLeft: `${level * 16}px` }} // отступ зависит от уровня
				>
					<span
						className={styles.categoryName}
						onClick={() => {
							onChange(cat.id);
							setOpen(false);
						}}
					>
						{cat.name}
					</span>

					{cat.subcategories.length > 0 && (
						<span
							className={styles.arrow}
							onClick={() => setExpanded((prev) => !prev)}
						>
							{expanded ? (
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path
										d="M6 8.5L12 14.5L18 8.5"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : (
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path
										d="M18 15.5L12 9.5L6 15.5"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)}
						</span>
					)}
				</div>

				{expanded && cat.subcategories.length > 0 && (
					<div className={styles.subcategories}>
						{cat.subcategories.map((sub) => (
							<CategoryItem key={sub.id} cat={sub} level={level + 1} />
						))}
					</div>
				)}
			</div>
		);
	};
	const selectedCategory = categories
		.flatMap(function collect(c: CategoryWithSubs): CategoryWithSubs[] {
			return [c, ...c.subcategories.flatMap(collect)];
		})
		.find(c => c.id === my_value);

	return (
		<div className={styles.allCatDropDown}>
			<div className={styles.formGroup}>
				<fieldset className={`${commonStyles.inputWrapper} ${styles.inputCat}`}>
					{isLegend && <legend>Category</legend>}
					<input
						type="text"
						placeholder="Enter category name"
						defaultValue={selectedCategory?.name || ""}
					/>
					<div
						className={styles.openArrow}
						onClick={() => setOpen((prev) => !prev)}
					>
						{!open ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 8.5L12 14.5L18 8.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						) : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 15.5L12 9.5L6 15.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						)}
					</div>
				</fieldset>
			</div>

			{open && (
				<div className={styles.dropdownTree}>
					{categories.map((cat) => (
						<CategoryItem key={cat.id} cat={cat} level={0} />
					))}
				</div>
			)}
		</div>
	);
}