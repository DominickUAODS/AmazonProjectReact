import type { ProductDetail } from "./ProductCardAdmin";
import styles from './OnePropertyKeyAdmin.module.css'
import commonStyles from "../../common.module.css";


type Props = {
	propertyKey: string;
	attribute: string;
	onAttributeChange: (val: string) => void;
  };


export default function OnePropertyKeyAdmin({
	propertyKey,
	attribute,
	onAttributeChange,
  }: Props) {
    return (
        <div className={styles.oneProp}>
            <fieldset className={`${commonStyles.inputWrapper} ${styles.inputPk}`}>
				<legend>Property key</legend>
				<input
					type="text"
					value={propertyKey}
				/>
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


        </div>
    );
}