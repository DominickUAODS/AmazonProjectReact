import React, { useEffect, useRef, useState } from 'react';
import styles from './Filters.module.css';
import type { Category } from '../../../types/Category';
import commonStyles from '../../common.module.css';



interface FiltersProps {
	categoryFilter: string;
	setCategoryFilter: (value: string) => void;
	search: string;
	setSearch: (value: string) => void;
	categories: Category[];
	openAddCategory: () => void;
}

const Filters: React.FC<FiltersProps> = ({ categoryFilter, setCategoryFilter, search, setSearch, categories, openAddCategory }) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={styles.filters}>
			<div className={styles.selectWrapper} ref={wrapperRef}>
				<div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
					<span className={styles.selectedValue}>
						{categoryFilter
							? categories.find(cat => cat.id === categoryFilter)?.name
							: "Choose category..."}
					</span>
					<svg
						className={`${styles.selectIcon} ${isOpen ? styles.open : ""}`}
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.168 5.81201L8.62403 11.128C8.27203 11.468 7.71203 11.468 7.36003 11.128L1.83203 5.81201"
							stroke="#0E2042"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>

				{isOpen && (
					<ul className={styles.optionsList}>
						<li
							className={`${styles.optionItem} ${commonStyles.secondaryButton}`}
							onClick={openAddCategory}
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 2.96387V10.4579" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M21.0018 11.9639H13.5078" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M3 11.9639H10.494C11.328 11.9639 12 12.6359 12 13.4699V20.9639" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>

							Add category
						</li>
						{categories.map(cat => (
							<li
								key={cat.id}
								className={styles.optionItem}
								onClick={() => {
									setCategoryFilter(cat.id);
									setIsOpen(false);
								}}
							>
								{cat.name}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className={styles.inputWrapper}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.986 14.1061C12.906 15.5221 10.416 16.2001 9.3 16.2001C5.82 16.2001 3 13.3801 3 9.9001C3 6.4201 5.82 3.6001 9.3 3.6001C12.78 3.6001 15.6 6.4201 15.6 9.9001C15.6 10.5841 15.492 11.2441 15.288 11.8621" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M21.0003 20.4L13.9863 14.106" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>

				<input
					type="text"
					placeholder="Search..."
					className={styles.input}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default Filters;