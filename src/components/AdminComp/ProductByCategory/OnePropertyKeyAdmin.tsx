//import type { ProductDetail } from "./ProductCardAdmin";
import styles from './OnePropertyKeyAdmin.module.css'
import commonStyles from "../../common.module.css";
import type { ProductDetail } from './ProductCardAdmin';

// type Props = {
// 	propertyKey: string;
// 	attribute: string;
// 	onAttributeChange: (val: string) => void;
// };

// export default function OnePropertyKeyAdmin({
// 	propertyKey,
// 	attribute,
// 	onAttributeChange,
// }: Props) {
// 	return (
// 		<div className={styles.oneProp}>
// 			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputPk}`}>
// 				<legend>Property key</legend>
// 				<input
// 					type="text"
// 					value={propertyKey}
// 					readOnly
// 				/>
// 			</fieldset>

// 			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputAtt}`}>
// 				<legend>Attribute</legend>
// 				<input
// 					type="text"
// 					value={attribute}
// 					placeholder="Describe detail about your product..."
// 					onChange={(e) => onAttributeChange(e.target.value)}
// 				/>
// 			</fieldset>

// 		</div>
// 	);
// }

type Props = {
	propertyKeyId: string;
	propertyKeyName: string;
	attribute: string;
	availableKeys: ProductDetail[];
	onPropertyKeyChange: (keyId: string, keyName: string) => void;
	onAttributeChange: (val: string) => void;
	onDelete: () => void;
};

export default function OnePropertyKeyAdmin({
	propertyKeyId,

	attribute,
	availableKeys,
	onPropertyKeyChange,
	onAttributeChange,
	onDelete,
}: Props) {
	return (
		<div className={styles.oneProp}>
			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputPk}`}>
				<legend>Property key</legend>
				<select
					value={propertyKeyId}
					onChange={(e) => {
						const selected = availableKeys.find(k => k.property_key_id === e.target.value);
						if (selected) onPropertyKeyChange(selected.property_key_id, selected.property_key);
					}}
					className={styles.selectPk}
				>
					<option value="">Select property...</option>
					{availableKeys.map((key) => (
						<option key={key.property_key_id} value={key.property_key_id}>
							{key.property_key}
						</option>
					))}
				</select>
			</fieldset>

			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputAtt}`}>
				<legend>Attribute</legend>
				<input
					type="text"
					value={attribute}
					placeholder="Describe detail about your product..."
					onChange={(e) => onAttributeChange(e.target.value)}
				/>
			</fieldset>

			<button
				type="button"
				className={`${commonStyles.destructiveButton} ${styles.deletePropButton}`}
				onClick={onDelete}
				//style={{ marginTop: "10px" }}

			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19.0205 7.37988L17.4005 20.1599C17.2805 21.0599 16.5005 21.7199 15.6005 21.7199H8.40047C7.50047 21.7199 6.72047 21.0599 6.60047 20.1599L4.98047 7.37988" stroke="#EA4848" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M19.0205 4.25977H4.98047" stroke="#EA4848" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M9.30078 4.25973V4.01973C9.30078 3.05973 10.0808 2.21973 11.1008 2.21973H12.9608C13.9208 2.21973 14.7608 2.99973 14.7608 4.01973V4.25973" stroke="#EA4848" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>
		</div>
	);
}