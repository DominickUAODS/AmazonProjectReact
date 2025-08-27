import React from 'react';
import styles from './Filters.module.css';

interface FiltersProps {
	roleFilter: 'All' | 'Customer' | 'Administrator';
	setRoleFilter: (role: 'All' | 'Customer' | 'Administrator') => void;
	search: string;
	setSearch: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ roleFilter, setRoleFilter, search, setSearch}) => {
	return (
		<div className={styles.filters}>
			<select
				value={roleFilter}
				onChange={(e) => setRoleFilter(e.target.value as FiltersProps['roleFilter'])}
				className={styles.select}
			>
				<option value="All">All</option>
				<option value="Administrator">Administrator</option>
				<option value="Customer">Customer</option>
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