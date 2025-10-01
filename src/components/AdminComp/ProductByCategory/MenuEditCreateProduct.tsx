import styles from './MenuEditCreateProduct.module.css'

type Props = {
	activeTab: "general" | "details" | "about";
	onTabClick: (tab: "general" | "details" | "about") => void;
};

export default function MenuEditCreateProduct({ activeTab, onTabClick }: Props) {
	return (
		<div className={styles.menuEditCreate}>
			<span
				className={activeTab === "general" ? styles.active : ""}
				onClick={() => onTabClick("general")}
			>General information</span>

			<span
				className={activeTab === "details" ? styles.active : ""}
				onClick={() => onTabClick("details")}
			>Product details</span>

			<span
				className={activeTab === "about" ? styles.active : ""}
				onClick={() => onTabClick("about")}
			>About product</span>
		</div>
	);
}