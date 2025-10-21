import styles from './SortingByStars.module.css'
import commonStyles from "../common.module.css";

export default function SortingByStars({
	active,
	onChange,
}: {
	active: number | null;
	onChange: (val: number | null) => void;
}) {
	return (
		<div className={styles.sortingByStars}>
			<button
				onClick={() => onChange(null)}
				className={`${commonStyles.secondaryButton} ${active === null ? styles.active : ""}`}
			>
				All
			</button>
			{[5, 4, 3, 2, 1].map(star => (
				<button
					key={star}
					onClick={() => onChange(star)}
					className={`${commonStyles.secondaryButton} ${active === star ? styles.active : ""}`}
				>
					{star} <svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6.41505 17.0041C5.73005 17.4991 4.81505 16.8341 5.07505 16.0291L6.18005 12.6191C6.33505 12.1391 6.16505 11.6141 5.75505 11.3191L2.85505 9.21406C2.17005 8.71906 2.52505 7.63906 3.36505 7.63906H6.95005C7.45505 7.63906 7.90005 7.31406 8.05505 6.83406L9.16005 3.42406C9.42005 2.61906 10.5551 2.61906 10.8201 3.42406L11.9251 6.83406C12.0801 7.31406 12.5301 7.63906 13.0301 7.63906H16.6151C17.4601 7.63906 17.8101 8.71906 17.1251 9.21406L14.2251 11.3191C13.8151 11.6141 13.6451 12.1391 13.8001 12.6191L14.9051 16.0291C15.1651 16.8341 14.2451 17.4991 13.5651 17.0041L10.8501 14.8291C10.4401 14.4991 9.86005 14.4891 9.43505 14.7941L6.40005 17.0041H6.41505Z"
							fill="#4A7BD9"
							stroke="#4A7BD9"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			))}
		</div>
	);
}