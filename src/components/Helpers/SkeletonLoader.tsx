import styles from "./SkeletonLoader.module.css";

export default function SkeletonLoader() {
	return (
		<div className={styles.skeletonWrapper}>
			<div className={styles.skeletonHeader}></div>
			<div className={styles.skeletonLine}></div>
			<div className={styles.skeletonLine}></div>
			<div className={styles.skeletonLine}></div>
		</div>
	);
}
