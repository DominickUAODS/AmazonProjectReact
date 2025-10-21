import styles from './PFTag.module.css'

export type PFTagProps = {
	title: string;
	isActive?: boolean;
	onClick?: () => void;
};

export default function PFTag({ title, onClick, isActive }: PFTagProps) {
	return (
		<div
			className={`${styles.tag} ${isActive ? styles.activeTag : ""}`}
			onClick={onClick}
		>
			<span className={styles.tagSpan}>{title}</span>
		</div>
	);
}
