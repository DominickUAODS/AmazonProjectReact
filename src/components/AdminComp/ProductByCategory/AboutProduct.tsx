import type { ProductFeature } from "./ProductCardAdmin";
import styles from "./AboutProduct.module.css"
import commonStyles from "../../common.module.css";
import OneAboutProductAdmin from "./OneAboutProductAdmin";

type Props = {
	features: ProductFeature[]
	onChange: (features: ProductFeature[]) => void;
};

export default function AboutProduct({ features, onChange }: Props) {
	//const features = product.features ?? [];

	const handleNameChange = (index: number, name: string) => {
		const updated = [...features];
		updated[index] = { ...updated[index], name };
		onChange(updated);
	};

	const handleDescriptionChange = (index: number, desc: string) => {
		const updated = [...features];
		updated[index] = { ...updated[index], description: desc };
		onChange(updated);
	};

	const handleAddFeature = () => {
		onChange([...features, { name: "", description: "" }]);
	};

	const handleDeleteFeature = (index: number) => {
		onChange(features.filter((_, i) => i !== index));
	};

	return (
		<div className={styles.productFea}>
			<div className={styles.header}>
				<span>About product</span>
			</div>

			<div className={styles.addProductFeature}>
				{features.map((fea, index) => (
					<OneAboutProductAdmin
						key={index}
						feature={fea}
						onNameChange={(name) => handleNameChange(index, name)}
						onDescriptionChange={(desc) => handleDescriptionChange(index, desc)}
						onDelete={() => handleDeleteFeature(index)}
					/>
				))}

				<button
					className={`${commonStyles.secondaryButton} ${styles.addDetailBtn}`}
					onClick={handleAddFeature}
				>
					<svg
						width="28"
						height="29"
						viewBox="0 0 28 29"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14 3.95703V12.7"
							stroke="#4A7BD9"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M24.5008 14.457H15.7578"
							stroke="#4A7BD9"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3.5 14.457H12.243C13.216 14.457 14 15.241 14 16.214V24.957"
							stroke="#4A7BD9"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span>Add product feature</span>
				</button>
			</div>
		</div>
	)
}