import ccStyles from './CategoryCard.module.css'
import styles from './EmptyCategoryCard.module.css'

export default function EmptyCategoryCard() {
	return (
		<div className={`${ccStyles.mainPosition} ${styles.empMainPosition}`}>
            <div className={styles.emCCDiv}>
                <span>Select a category to see its information</span>
            </div>
		</div>
	);
}