
import styles from './OneComment.module.css'
import commonStyles from "../common.module.css";
import PFTag from './PFTag';
import { useState } from 'react';
import { useAuth } from '../Helpers/AuthContext';
import { reviewTagOptions } from '../../types/ReviewTagOptions';
import CreateReview from '../ReviewComp/CreateReview';
import DeleteCategory from '../AdminComp/Products/DeleteCategory';

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
	user_id:string;
}

type OneCommentProps = CommentType & {
	onDelete?: (id: string) => void;
  };


export default function OneComment({
	user_id,
	id,
	stars,
	title,
	content,
	published,
	is_helpful = false,
	rewiew_tags,
	rewiew_images,
	user_firstname,
	user_lastname,
	user_image,
	helpful_count = 0,
	onDelete, 
  }: OneCommentProps) {
	const { isAuthenticated, accessToken, user } = useAuth();
	const [helpful, setHelpful] = useState<boolean>(is_helpful);
	const [isOpen, setOpen] = useState<boolean>(false);
	const [helpCount, setHelpCount] = useState<number>(helpful_count);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);


	const openDeleteReview = () =>{
		setShowDeleteModal(true);
	}

	const handleDeleteReview = async () => {
		if (!isAuthenticated || !accessToken) return;
	
		try {
			const res = await fetch(`${import.meta.env.VITE_API_SERVER}/reviews/${id}`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
				}
			});
	
			if (res.status === 204) {
				console.log("Review deleted");
				setShowDeleteModal(false);
				if (onDelete) {
					onDelete(id); 
				}
	
			} else if (res.status === 404) {
				console.error("Review not found");
			} else {
				console.error("Failed to delete review");
			}
		} catch (err) {
			console.error("Error deleting review", err);
		}
	};

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	const isMyComment = user?.last_name=== user_lastname;


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


	return (
		<div className={`${styles.comment} ${isMyComment ? styles.myComment : ""}`}>
			<div className={styles.commentMainBlock}>
				<div className={styles.userComment}>
					<div className={styles.userDate}>
						<div className={styles.userNI}>
							<img src={user_image || "/img/default-user.svg"}></img>
							<span>{user_firstname} {user_lastname}</span>
						</div>

						<div className={styles.date}>
							{formatDate(published)}
							{isMyComment && (
								 <div className={styles.dropdownWrapper}>
								 <div className={styles.deteteEditDD} onClick={() => setOpen(prev => !prev)}>
								   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									 <path d="M5.3999 12.1992C5.3999 13.0265 4.72895 13.6992 3.89605 13.6992C3.06314 13.6992 2.3999 13.0265 2.3999 12.1992C2.3999 11.3719 3.07085 10.6992 3.89605 10.6992C4.72124 10.6992 5.3999 11.3719 5.3999 12.1992Z" fill="#0E2042"/>
									 <path d="M13.23 12.1992C13.23 13.0265 12.559 13.6992 11.7261 13.6992C10.8932 13.6992 10.23 13.0265 10.23 12.1992C10.23 11.3719 10.9009 10.6992 11.7261 10.6992C12.5513 10.6992 13.23 11.3719 13.23 12.1992Z" fill="#0E2042"/>
									 <path d="M21.0601 12.1992C21.0601 13.0265 20.3891 13.6992 19.5562 13.6992C18.7233 13.6992 18.0601 13.0265 18.0601 12.1992C18.0601 11.3719 18.731 10.6992 19.5562 10.6992C20.3814 10.6992 21.0601 11.3719 21.0601 12.1992Z" fill="#0E2042"/>
								   </svg>
								 </div>
						   
								 {isOpen && (
								   <div className={styles.editDeleteDrop}>
									 <div className={styles.dropOptions}>
									   <div className={styles.option}  onClick={() => {
											setShowModal(true);  // открыть модалку
											setOpen(false);      // закрыть дропдаун
										}}><span>Edit</span></div>
									   <div
										onClick={() => {
											openDeleteReview();  
											setOpen(false);
										}}
										className={styles.option}
										>
											<span style={{color:"rgba(234, 72, 72, 1)"}}>Delete</span></div>
									 </div>
								   </div>
								 )}
							   </div>
							)}
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
							return <PFTag key={index} title={tagOption.title} isActive={false} />;
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

			<CreateReview
				show={showModal}
				onClose={() => setShowModal(false)}
				comment={{
					id,
					stars,
					title,
					content,
					published,
					is_helpful,
					rewiew_tags,
					rewiew_images,
					user_firstname,
					user_lastname,
					user_image,
					helpful_count,
					user_id
				  }}
			/>

			<DeleteCategory
				onClose={()=>setShowDeleteModal(false)}
				show={showDeleteModal}
				addSpan='Your review will be impossible to recover.'
				onDelete={handleDeleteReview}
				/>
				
		</div>
	);
}