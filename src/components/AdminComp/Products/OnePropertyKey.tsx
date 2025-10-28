import { useEffect, useState } from 'react';
import commonStyles from '../../common.module.css';
import styles from './OnePropertyKey.module.css';

type OnePropertyKeyProps = {
	name?: string;
	isReadOnly?: boolean;
	onChange?: (name: string) => void;
	onDelete?: () => void;
};

export default function OnePropertyKey({ name, isReadOnly, onChange, onDelete }: OnePropertyKeyProps) {
	//const isEmpty = !name;
	const [pkName, setPKname] = useState<string>(name || "");

	useEffect(() => {
		setPKname(name || "");
		//console.log("OnePropertyKeyProps", name)
	}, [name]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setPKname(newValue);
		onChange?.(newValue); // пробрасываем наверх
	};

	return (
		<div className={styles.onePropertyKey}>
			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputPk}`}>
				<legend>Property key</legend>
				<input
					type="text"
					placeholder="Enter name of property key..."
					value={isReadOnly ? (pkName || name) : pkName}
					// onChange={(e) => setPKname(e.target.value)}
					onChange={handleInputChange}
					disabled={isReadOnly} // блокируем
				/>
			</fieldset>
			{!isReadOnly && (
				<button
					type="button"
					className={`${commonStyles.destructiveButton} ${styles.deletePropButton}`}
					onClick={onDelete}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.0205 7.37988L17.4005 20.1599C17.2805 21.0599 16.5005 21.7199 15.6005 21.7199H8.40047C7.50047 21.7199 6.72047 21.0599 6.60047 20.1599L4.98047 7.37988" stroke="#EA4848" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M19.0205 4.25977H4.98047" stroke="#EA4848" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M9.30078 4.25973V4.01973C9.30078 3.05973 10.0808 2.21973 11.1008 2.21973H12.9608C13.9208 2.21973 14.7608 2.99973 14.7608 4.01973V4.25973" stroke="#EA4848" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			)}
		</div>
	);
}