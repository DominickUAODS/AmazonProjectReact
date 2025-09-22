
import styles from './OneComment.module.css'
import commonStyles from "../common.module.css";
import PFTag from './PFTag';
import { useState } from 'react';
import { useAuth } from '../Helpers/AuthContext';
import { reviewTagOptions } from '../../types/ReviewTagOptions';

export type CommentType = {
	id: string;
	stars: number;
	title?: string;
	content?: string;
	published: string;
	is_helpful: boolean;
	rewiew_tags?: string[];
	rewiew_images?: string[];
	user_firstname: string;
	user_lastname: string;
	user_image: string;
	helpful_count?: number;
}


export default function OneComment({ id, stars, title, content, published, is_helpful = false, rewiew_tags, rewiew_images, user_firstname, user_lastname, user_image, helpful_count = 0 }: CommentType) {
	const { isAuthenticated, accessToken, user } = useAuth();
	const [helpful, setHelpful] = useState<boolean>(is_helpful);
	const [helpCount, setHelpCount] = useState<number>(helpful_count);
	//const helCount = helpful_count ?? 0;


	// const formatDate = (dateStr: string) => {
	// 	const [day, month, year] = dateStr.split(".").map(Number);
	// 	const date = new Date(year, month - 1, day);
	// 	return date.toLocaleDateString("en-US", {
	// 		month: "long",
	// 		day: "numeric",
	// 		year: "numeric",
	// 	});
	// };

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};


	const personWord = (n: number) => (n <= 1 ? "person" : "people");

	const getHelpfulText = () => {
		if (helpful) {
			if (helpCount === 0) return "You found this helpful";
			return `You and ${helpCount} ${personWord(helpCount)} found this helpful`;
		} else {
			if (helpCount > 0) return `${helpCount} ${personWord(helpCount)} found this helpful`;
			return "";
		}
	};

	const onHelpfulClick = async () => {
		if (!isAuthenticated || !user || !accessToken) return;

		try {
			const res = await fetch(`${import.meta.env.VITE_API_SERVER}/reviewreviews/toggle-helpful`, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, },
				body: JSON.stringify({
					review_id: id,
					user_id: user.id,
					is_helpful: !helpful,
				}),
			});

			if (!res.ok) throw new Error("Failed to toggle helpful");

			// обновляем локально
			setHelpful((prev) => !prev);
			setHelpCount(prev => prev + (helpful ? -1 : 1));
		} catch (err) {
			console.error(err);
		}
	};

	//const roundedStars = Math.ceil(stars);

	const roundedStars = Array.from({ length: 5 }, (_, i) => i < stars);

	// const FullStar = () => (
	// 	<svg
	// 		width="24"
	// 		height="24"
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
	// 		width="24"
	// 		height="24"
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

	return (
		<div className={styles.comment}>
			<div className={styles.commentMainBlock}>
				<div className={styles.userComment}>
					<div className={styles.userDate}>
						<div className={styles.userNI}>
							<img src={user_image || "/img/default-user.svg"}></img>
							<span>{user_firstname} {user_lastname}</span>
						</div>

						<div className={styles.date}>
							{formatDate(published)}
						</div>
					</div>

					<div className={styles.stars}>
						{roundedStars.map((filled, i) => (
							<svg
								key={i}
								width="24"
								height="24"
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

					</div>
				</div>

				{(title || content) && (
					<div className={styles.titleContent}>
						{title && <span className={styles.spanTitle}>{title}</span>}
						{content && <span className={styles.spanContent}>{content}</span>}
					</div>
				)}


				{rewiew_images && rewiew_images.length > 0 && (
					<div className={styles.imagesBlock}>
						{rewiew_images.map((img, index) => (
							<img key={index} src={img} alt="" />
						))}
					</div>
				)}

				{/* {rewiew_tags && rewiew_tags.length > 0 && (
					<div className={styles.tagsBlock}>
						{rewiew_tags.map((tag, index) => (
							<PFTag key={index} title={tag.title} className={styles.tag} />
						))}
					</div>
				)} */}

				{rewiew_tags && rewiew_tags.length > 0 && (
					<div className={styles.tagsBlock}>
						{rewiew_tags.map((tagKey, index) => {
							const tagOption = reviewTagOptions.find(t => t.key === tagKey.toString());
							if (!tagOption) return null; // если ключ не найден
							return <PFTag key={index} title={tagOption.title} className={styles.tag} />;
						})}
					</div>
				)}

			</div>

			<div className={styles.buttonsBlock}>
				<div className={styles.buttons}>
					<div className={styles.helpfulButton}>
						<button
							type="button"
							aria-pressed={helpful}
							onClick={onHelpfulClick}
							disabled={!isAuthenticated}
							className={!isAuthenticated ? commonStyles.disabledButton :
								helpful ? commonStyles.nextStepButton : commonStyles.secondaryButton}
						>
							Helpful
						</button>
					</div>
					<button className={commonStyles.secondaryButton}>Translate</button>

				</div>
				{getHelpfulText() && <span>{getHelpfulText()}</span>}

			</div>
		</div>
	);
}