import React, { useState, useRef, useEffect } from 'react';
import styles from './ColumnSelector.module.css';
import type { ColumnVisibility } from './AdminPanel';

interface ColumnSelectorProps {
	columns: ColumnVisibility;
	setColumns: React.Dispatch<React.SetStateAction<ColumnVisibility>>;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ columns, setColumns }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const toggleColumn = (key: keyof ColumnVisibility) => {
		setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className={styles.wrapper} ref={ref}>
			<button onClick={() => setOpen(!open)} className={styles.button}>
				Columns ▾
			</button>
			{open && (
				<div className={styles.menu}>
					{Object.keys(columns).map((key) => (
						<label key={key} className={styles.option}>
							<input
								type="checkbox"
								checked={columns[key as keyof ColumnVisibility]}
								onChange={() => toggleColumn(key as keyof ColumnVisibility)}
							/>
							{key === 'status' ? 'Status' : key === 'registered' ? 'Registration date' : 'Email'}
						</label>
					))}
				</div>
			)}
		</div>
	);
};

export default ColumnSelector;