import styles from './StarsComments.module.css';
import commonStyles from "../common.module.css";
import { useEffect, useState } from 'react';
import SortSelect from './SortSelect';
import SortingByStars from './SortingByStars';
import OneComment, { type CommentType } from './OneComment';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Helpers/AuthContext';

// const comments: CommentType[] = [
// 	// 1. Всё кроме images
// 	{
// 		user_firstname: "Alice Cooper",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 5,
// 		title: "Perfect quality",
// 		content: "Really loved the fabric and stitching. Worth every penny!",
// 		published: "12.06.2024",
// 		is_helpful: true,
// 		rewiew_tags: ["Excellent", "Durable"],
// 		helpful_count: 0,
// 	},
// 	// 2. Оригинал (ничего не меняем)
// 	{
// 		user_firstname: "Louisa Hines",
// 		helpful_count: 3,
// 		title: "It's true to size and has pockets",
// 		stars: 4,
// 		content:
// 			"I absolutely adore this dress. I've gotten numerous compliments, with people saying I look stylish. It's incredibly comfortable! I wore it to my granddaughter's graduation and to church.",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		published: "31.05.2024",
// 		is_helpful: false,
// 		rewiew_tags: ["High quality", "Actual price"],
// 		rewiew_images: [
// 			"./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
// 			"./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
// 			"./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
// 			"./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
// 			"./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
// 			"./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
// 		],
// 	},
// 	// 3. Только звёзды
// 	{
// 		user_firstname: "Mark Wayne",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 2,
// 		published: "01.07.2024",
// 		is_helpful: false,
// 	},
// 	// 4. Звёзды + title
// 	{
// 		user_firstname: "Helen Brooks",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 5,
// 		title: "Amazing dress!",
// 		published: "05.07.2024",
// 		is_helpful: true,
// 		helpful_count: 10,
// 	},
// 	// 5. Звёзды + тэги
// 	{
// 		user_firstname: "Oliver Twist",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 3,
// 		rewiew_tags: ["Trendy", "Comfortable"],
// 		published: "07.07.2024",
// 		is_helpful: false,
// 		helpful_count: 1,
// 	},
// 	// 6. Только контент
// 	{
// 		user_firstname: "Emily White",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 4,
// 		content: "Nice but a little bit overpriced for the quality.",
// 		published: "10.07.2024",
// 		is_helpful: false,
// 	},
// 	// 7. Звёзды + тэги
// 	{
// 		user_firstname: "Jack Black",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 5,
// 		rewiew_tags: ["Best purchase", "Highly recommend"],
// 		published: "15.07.2024",
// 		is_helpful: true,
// 		helpful_count: 25,
// 	},
// 	// 8. Title + тэги
// 	{
// 		user_firstname: "Sophia Loren",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 3,
// 		title: "Stylish but small",
// 		rewiew_tags: ["Runs small", "Color fades"],
// 		published: "20.07.2024",
// 		is_helpful: false,
// 	},
// 	// 9. Title + content
// 	{
// 		user_firstname: "Chris Pratt",
// 		user_image: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
// 		stars: 4,
// 		title: "Great fit",
// 		content: "Fits really well, just the fabric feels a little thin.",
// 		published: "25.07.2024",
// 		is_helpful: true,
// 	},
// ];

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
	const [take] = useState(5); // количество комментариев за раз
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const { accessToken, isAuthenticated } = useAuth();

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


	// const filteredAndSorted = useMemo(() => {
	// 	let result = [...comments];

	// 	if (starFilter !== null) {
	// 		result = result.filter(c => Math.ceil(c.stars) === starFilter);
	// 	}

	// 	if (selectedTags.length > 0) {
	// 		result = result.filter(c => {
	// 			if (!c.rewiew_tags) return false;
	// 			return filterMode === "AND"
	// 				? selectedTags.every(tag => c.rewiew_tags?.includes(tag))
	// 				: selectedTags.some(tag => c.rewiew_tags?.includes(tag));
	// 		});
	// 	}

	// 	// сортировка
	// 	switch (sortType) {
	// 		case "top":
	// 			result.sort((a, b) => (b.helpful_count ?? 0) - (a.helpful_count ?? 0));
	// 			break;
	// 		case "recent":
	// 			result.sort((a, b) => {
	// 				const [da, ma, ya] = a.published.split(".").map(Number);
	// 				const [db, mb, yb] = b.published.split(".").map(Number);
	// 				return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
	// 			});
	// 			break;
	// 		case "older":
	// 			result.sort((a, b) => {
	// 				const [da, ma, ya] = a.published.split(".").map(Number);
	// 				const [db, mb, yb] = b.published.split(".").map(Number);
	// 				return new Date(ya, ma - 1, da).getTime() - new Date(yb, mb - 1, db).getTime();
	// 			});
	// 			break;
	// 	}

	// 	return result;
	// }, [starFilter, sortType, selectedTags, filterMode]);

	// const visibleComments = filteredAndSorted.slice(0, visibleCount);
	// const hasMore = visibleCount < filteredAndSorted.length;


	return (
		<div className={styles.sc}>
			<div className={styles.sorting}>
				<SortingByStars active={starFilter} onChange={setStarFilter} />
				<SortSelect value={sortType} onChange={setSortType} />
			</div>
			<div className={styles.comments}>
				<div className={styles.commentsButton}>
					<button className={commonStyles.secondaryButton}>
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
						<OneComment key={i} {...c} />
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
		</div>
	);
}