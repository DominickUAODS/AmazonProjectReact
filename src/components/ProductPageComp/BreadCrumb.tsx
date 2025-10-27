import styles from './BreadCrumb.module.css'
import type { Category } from '../../types/Category';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface BreadCrumbProps {
	category: Category;
	categoriesMap: Record<string, Category>;
}

export default function BreadCrumb({ category, categoriesMap }: BreadCrumbProps) {
	const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);

	useEffect(() => {
		if (!category) return;

		const path: Category[] = [];
		let current: Category | undefined = category;

		while (current) {
			path.unshift(current); // добавляем в начало
			if (!current.parent_id) break; // дошли до корня
			current = categoriesMap[current.parent_id]; // ищем родителя
		}

		setBreadcrumbs(path);
	}, [category, categoriesMap]);

	return (
		<div className={styles.breadCrumbs}>
			<div>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M10.1521 19.7929H6.28206C5.89806 19.7929 5.58606 19.6009 5.58606 19.3669V11.8789" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M18.414 11.8789V19.3669C18.414 19.6009 18.102 19.7929 17.718 19.7929H13.848" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M21 10.5648L12 5.05078L3 10.5648" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M13.848 14.6758H10.152V19.7938" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			{breadcrumbs.map((crumb, idx) => (
				<span key={crumb.id}>
					<Link className={styles.onebread} to={`/products/${crumb.id}`}>{crumb.name}</Link>
					{idx < breadcrumbs.length - 1 && <span>  /  </span>}
				</span>
			))}
		</div>
	);
}