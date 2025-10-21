import styles from './SortSelect.module.css'
import { useState, useRef, useEffect } from 'react';

export default function SortSelect({
	value,
	onChange,
}: {
	value: "top" | "recent" | "older";
	onChange: (val: "top" | "recent" | "older") => void;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const options: { value: "top" | "recent" | "older"; label: string }[] = [
		{ value: "top", label: "Top reviews" },
		{ value: "recent", label: "Most recent" },
		{ value: "older", label: "Older reviews" },
	];
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={styles.selectContainer} ref={ref}>
			<button
				className={styles.selectTrigger}
				onClick={() => setOpen(!open)}
			>
				<span>{options.find(o => o.value === value)?.label}</span>
				<span className={styles.arrow}>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={open ? styles.arrowOpen : ""}
					>
						<path
							d="M14.168 5.8125L8.62403 11.1285C8.27203 11.4685 7.71203 11.4685 7.36003 11.1285L1.83203 5.8125"
							stroke="#0E2042"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</button>

			{open && (
				<div className={styles.selectDropdown}>
					{options.map(option => (
						<div
							key={option.value}
							className={`${styles.selectItem} ${value === option.value ? styles.selected : ""}`}
							onClick={() => {
								onChange(option.value);
								setOpen(false);
							}}
						>
							{value === option.value && (
								<span className={styles.checkmark}>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5 14.3333C5 14.3333 8.18524 17.6443 8.75859 17.8667C9.33193 18.0891 10.0075 18.0289 10.507 17.7184C11.0066 17.4079 20 7 20 7"
											stroke="#0E2042"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
							)}
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}