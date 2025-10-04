import styles from './StarsComments.module.css';
import commonStyles from "../common.module.css";
import { useEffect, useState } from 'react';
import SortSelect from './SortSelect';
import SortingByStars from './SortingByStars';
import OneComment, { type CommentType } from './OneComment';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Helpers/AuthContext';
import CreateReview from '../ReviewComp/CreateReview';



type StartsCommentsProps = {
	selectedTags: string[];
	filterMode?: "AND" | "OR";
};

export default function StartsComments({ selectedTags, filterMode = "OR" }: StartsCommentsProps) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const { id } = useParams<{ id: string }>();
	const [starFilter, setStarFilter] = useState<number | null>(null);
	const [sortType, setSortType] = useState<"top" | "recent" | "older">("recent");
	const [comments, setComments] = useState<CommentType[]>([]);
	const [skip, setSkip] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [take] = useState(5); // количество комментариев за раз
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);



	const { accessToken, isAuthenticated } = useAuth();

	const openAddReview= () => { 
		setShowModal(true);       
	};

	

	const fetchComments = async (reset = false) => {
		if (loading) return;
		setLoading(true);

		const params = new URLSearchParams();
		if (starFilter) params.append("stars", starFilter.toString());
		selectedTags.forEach(tag => params.append("tags", tag.toString()));
		params.append("filterMode", filterMode);
		params.append("sort", sortType);
		params.append("skip", reset ? "0" : skip.toString());
		params.append("take", take.toString());

		const headers: HeadersInit = { "Content-Type": "application/json", };

		if (isAuthenticated) {
			headers["Authorization"] = `Bearer ${accessToken}`;
		}

		const response = await fetch(`${API_SERVER}/reviews/by-product/${id}?${params.toString()}`,
			{
				method: "GET",
				headers,
			});
		const data: CommentType[] = await response.json();

		if (reset) {
			setComments(data);
			setSkip(data.length);
		} else {
			setComments(prev => [...prev, ...data]);
			setSkip(prev => prev + data.length);
		}

		setHasMore(data.length === take);
		setLoading(false);
	};

	// Перезапрос при смене фильтров или сортировки
	useEffect(() => {
		setSkip(0);
		fetchComments(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [starFilter, sortType, selectedTags, filterMode]);




	return (
		<div className={styles.sc}>
			<div className={styles.sorting}>
				<SortingByStars active={starFilter} onChange={setStarFilter} />
				<SortSelect value={sortType} onChange={setSortType} />
			</div>
			<div className={styles.comments}>
				<div className={styles.commentsButton}>
					<button className={commonStyles.secondaryButton} onClick={openAddReview}>
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14 3.45703V12.2" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.5001 13.957H15.7571" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M3.5 13.957H12.243C13.216 13.957 14 14.741 14 15.714V24.457" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						Create review
					</button>
				</div>



				<div className={styles.cBlock}>
					{comments.map((c, i) => (
						<OneComment key={i} {...c} 
						onDelete={(deletedId) => {
							setComments(prev => prev.filter(comment => comment.id !== deletedId));
						  }}/>
					))}

					{hasMore && (
						<button
							className={`${commonStyles.secondaryButton} ${styles.seeMoreButton}`}
							// onClick={() => setVisibleCount(prev => prev + 5)}
							//>
							//	See more
							onClick={() => fetchComments()}
							disabled={loading}
						>
							{loading ? "Loading..." : "See more"}
						</button>
					)}
				</div>

			</div>

			
			<CreateReview
				show={showModal}
				onClose={() => setShowModal(false)}
				onCreate={(newComment) => {
					if (!comments.find(c => c.id === newComment.id)) {
					setComments(prev => [newComment, ...prev]);
					} else {
					setComments(prev => prev.map(c => c.id === newComment.id ? newComment : c));
					}
				}}
			/>
		</div>
	);
}