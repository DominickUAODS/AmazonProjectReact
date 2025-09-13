import { useState } from "react";
import styles from "./OneFeatureProduct.module.css";

interface OneFeatureProductProps {
	name: string;
	description: string;
}

export default function OneFeatureProduct({ name, description }: OneFeatureProductProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.feature}>

			{/* Заголовок */}
			<div
				className={styles.featureB1}
				onClick={() => setIsOpen((prev) => !prev)}
				style={{ cursor: "pointer" }}
			>
				<span className={styles.featureB1Span}>{name}</span>

				<svg
					width="28"
					height="28"
					viewBox="0 0 28 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
						transition: "transform 0.3s ease",
					}}
				>
					<path
						d="M24.7941 10.1719L15.0921 19.4749C14.4761 20.0699 13.4961 20.0699 12.8801 19.4749L3.20605 10.1719"
						stroke="#0E2042"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>

			{/* Скрываемый блок */}
			{isOpen && (
				<div className={styles.featureB2}>
					<span className={styles.featureB2Span}>{description}</span>
				</div>
			)}
		</div>
	);
}