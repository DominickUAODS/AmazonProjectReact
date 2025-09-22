import { useParams } from 'react-router-dom';
import PFTag from './PFTag';
import styles from './RatingProduct.module.css'
import { useEffect, useState } from 'react';
import type { ReviewsInfo } from '../../types/Review';
import { reviewTagOptions } from '../../types/ReviewTagOptions';

export default function RatingProduct({ onTagSelect, selectedTags, }: { onTagSelect: (tags: string[]) => void; selectedTags: string[]; }) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const { id } = useParams<{ id: string }>();

	const [commentsInfo, setCommentsInfo] = useState<ReviewsInfo | null>(null);
	const [loading, setLoading] = useState(true);
	

	useEffect(() => {
		async function fetchCommentsInfo() {
			try {
				const res = await fetch(`${API_SERVER}/reviews/${id}/reviews-info`);
				if (!res.ok) throw new Error("Failed to fetch reviews");
				const data = await res.json();
				//console.log(data);
				setCommentsInfo(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchCommentsInfo();
	}, [id, API_SERVER]);


	const average = commentsInfo?.average ?? 0;
	const totalReviews = commentsInfo?.total_reviews ?? 0;
	const ratings = commentsInfo?.rating ?? [0, 0, 0, 0, 0];
	const roundedStars = Array.from({ length: 5 }, (_, i) => i < average);

	//const tags = ["Actual price", "Fast delivery", "High quality", "Fits the description", "Worth the price", "Matches the photos", "Exceeds expectations"]

	const tags = reviewTagOptions;

	// const FullStar = () => (
	// 	<svg
	// 		width="17"
	// 		height="16"
	// 		viewBox="0 0 17 16"
	// 		fill="none"
	// 		xmlns="http://www.w3.org/2000/svg"
	// 		className={styles.star}
	// 	>
	// 		<path
	// 			d="M5.63199 13.6048C5.08399 14.0008 4.35199 13.4688 4.55999 12.8248L5.44399 10.0968C5.56799 9.71281 5.43199 9.29281 5.10399 9.05681L2.78399 7.37281C2.23599 6.97681 2.51999 6.11281 3.19199 6.11281H6.05999C6.46399 6.11281 6.81999 5.85281 6.94399 5.46881L7.82799 2.74081C8.03599 2.09681 8.94399 2.09681 9.15599 2.74081L10.04 5.46881C10.164 5.85281 10.524 6.11281 10.924 6.11281H13.792C14.468 6.11281 14.748 6.97681 14.2 7.37281L11.88 9.05681C11.552 9.29281 11.416 9.71281 11.54 10.0968L12.424 12.8248C12.632 13.4688 11.896 14.0008 11.352 13.6048L9.17999 11.8648C8.85199 11.6008 8.38799 11.5928 8.04799 11.8368L5.61999 13.6048H5.63199Z"
	// 			fill="#0E2042"
	// 			stroke="#0E2042"
	// 			strokeWidth="1.5"
	// 			strokeLinecap="round"
	// 			strokeLinejoin="round"
	// 		/>
	// 	</svg>
	// );

	// const EmptyStar = () => (
	// 	<svg
	// 		width="17"
	// 		height="16"
	// 		viewBox="0 0 17 16"
	// 		fill="none"
	// 		xmlns="http://www.w3.org/2000/svg"
	// 		className={styles.star}
	// 	>
	// 		<path
	// 			d="M8.1999 11.7408L5.6359 13.6048C5.0879 14.0008 4.3559 13.4688 4.5639 12.8248L5.4479 10.0968C5.5719 9.71281 5.4359 9.29281 5.1079 9.05681L2.7879 7.37281C2.2399 6.97681 2.5239 6.11281 3.1959 6.11281H6.0639C6.4679 6.11281 6.8239 5.85281 6.9479 5.46881L7.8319 2.74081C8.0399 2.09681 8.9479 2.09681 9.1599 2.74081L10.0439 5.46881C10.1679 5.85281 10.5279 6.11281 10.9279 6.11281H13.7959C14.4719 6.11281 14.7519 6.97681 14.2039 7.37281L11.8839 9.05681C11.5559 9.29281 11.4199 9.71281 11.5439 10.0968L12.4279 12.8248C12.6359 13.4688 11.8999 14.0008 11.3559 13.6048"
	// 			stroke="#0E2042"
	// 			strokeWidth="1.5"
	// 			strokeLinecap="round"
	// 			strokeLinejoin="round"
	// 		/>
	// 	</svg>
	// );

	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			onTagSelect(selectedTags.filter(t => t !== tag));
		} else {
			onTagSelect([...selectedTags, tag]);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className={styles.rp}>
			<div className={styles.rp0}>
				<div className={styles.rpStarsBlock}>
					<div className={styles.asr}>
						<div className={styles.average}>
							<span className={styles.avgNumber}>{average}</span>
							<span className={styles.avgOutOf}>/5</span>
						</div>


						<div className={styles.avgStarsBlock}>
							{/* {Array(roundedStars)
								.fill(0)
								.map((_, i) => (
									<FullStar key={`full-${i}`} />
								))}

							{Array(5 - roundedStars)
								.fill(0)
								.map((_, i) => (
									<EmptyStar key={`empty-${i}`} />
								))} */}
							{roundedStars.map((filled, i) => (
								<svg
									key={i}
									width="17"
									height="16"
									viewBox="0 0 17 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={styles.star}
								>
									<path
										d="M5.63199 13.6048C5.08399 14.0008 4.35199 13.4688 4.55999 12.8248L5.44399 10.0968C5.56799 9.71281 5.43199 9.29281 5.10399 9.05681L2.78399 7.37281C2.23599 6.97681 2.51999 6.11281 3.19199 6.11281H6.05999C6.46399 6.11281 6.81999 5.85281 6.94399 5.46881L7.82799 2.74081C8.03599 2.09681 8.94399 2.09681 9.15599 2.74081L10.04 5.46881C10.164 5.85281 10.524 6.11281 10.924 6.11281H13.792C14.468 6.11281 14.748 6.97681 14.2 7.37281L11.88 9.05681C11.552 9.29281 11.416 9.71281 11.54 10.0968L12.424 12.8248C12.632 13.4688 11.896 14.0008 11.352 13.6048L9.17999 11.8648C8.85199 11.6008 8.38799 11.5928 8.04799 11.8368L5.61999 13.6048H5.63199Z"
										fill={filled ? "#0E2042" : "none"}
										stroke="#0E2042"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							))}
						</div>


						<div className={styles.totalReviews}>
							{totalReviews} reviews
						</div>
					</div>

					<div className={styles.rpBars}>
						{ratings.map((percent, index) => {
							const star = 5 - index;
							return (
								<div key={star} className={styles.barRow}>
									<span className={styles.starLabel}>{star}</span>
									<div className={styles.barWrapper}>
										<div
											className={styles.barFill}
											style={{ width: `${percent}%` }}
										></div>
									</div>
									<span className={styles.percent}>{percent}%</span>
								</div>
							);
						})}
					</div>

				</div>


				<div className={styles.aoB}>
					<div className={styles.aoB0}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.3619 6.88716C20.3699 8.33916 20.9579 10.0972 20.9579 11.9992C20.9579 16.9492 16.9439 20.9632 11.9939 20.9632C7.04391 20.9632 3.02991 16.9492 3.02991 11.9992C3.02991 7.04916 7.04391 3.03516 11.9939 3.03516C13.3439 3.03516 14.6219 3.33516 15.7679 3.86916" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M7.01428 12.6185L10.2663 14.9465C10.8723 15.2345 11.5863 15.1565 12.1143 14.7545L19.3683 6.89453" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<span>All opinions confirmed by purchase.</span>
					</div>

					<div className={styles.aoB1}>
						<div className={styles.aoB1Button}>
							<a>Learn more</a>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.58398 1.92188L10.9 7.46587C11.24 7.81787 11.24 8.37788 10.9 8.72988L5.58398 14.2579" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>

					</div>

				</div>
			</div>

			<div className={styles.rp1}>
				<span className={styles.rp1MainSpan}>Frequent tags</span>
				<div className={styles.tagsBlock}>
					{tags.map((tag) => (
						<PFTag
							key={tag.key}
							title={tag.title}
							className={`${styles.tag} ${selectedTags.includes(tag.key) ? styles.activeTag : ""}`}
							onClick={() => toggleTag(tag.key)}
						/>
					))}
				</div>

			</div>

		</div>
	);
}