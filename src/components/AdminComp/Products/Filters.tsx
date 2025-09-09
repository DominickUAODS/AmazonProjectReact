import React from 'react';
import styles from './Filters.module.css';
import type { Category } from '../../../types/Category';

interface FiltersProps {
	categoryFilter: string;
	setCategoryFilter: (value: string) => void;
	search: string;
	setSearch: (value: string) => void;
	categories: Category[];
}

const Filters: React.FC<FiltersProps> = ({ categoryFilter, setCategoryFilter, search, setSearch, categories }) => {
	return (
		<div className={styles.filters}>
			<select
				value={categoryFilter}
				onChange={(e) => setCategoryFilter(e.target.value)}
				className={styles.select}
			>
				{/* Первый пункт */}
				<option value="">Choise category...</option>

				{/* Динамически строим список только из корневых категорий */}
				{categories.map((cat) => (
					<option key={cat.id} value={cat.id}>
						{cat.name}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Search..."
				className={styles.input}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
};

export default Filters;