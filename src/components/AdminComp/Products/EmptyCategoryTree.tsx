import styles from './EmptyCategoryTree.module.css'

export default function EmptyCategoryTree({ spanTitle }: { spanTitle: string }) {
	return (
		<div className={styles.emtyCategoryTree}>
            <img src="/img/admin_panel_img.png" alt="Admin panel" />
            <span>{spanTitle}</span>
		</div>
	);
}