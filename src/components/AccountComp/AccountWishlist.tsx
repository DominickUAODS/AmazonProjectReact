import { useEffect, useState } from 'react';
import commonStyles from "../common.module.css"
import styles from './AccountWishlist.module.css'
import AccountMenu from '../AccountMenu/AccountMenu';
import WishlistCard from './WishlistCard';
import Pagination from '../Pagination/Pagination';
import { useAuth } from '../Helpers/AuthContext';


export default function AccountWishlist() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [wishlist, setWishlist] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const { authFetch, accessToken } = useAuth();

	useEffect(() => {
		async function fetchWishlist() {
			setLoading(true);
			try {
				const responce = await authFetch(`${API_SERVER}/users/wishlist`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
				});

				if (!responce.ok) throw new Error('Failed to fetch wishlist');
				const data = await responce.json();
				console.log(data);
				setWishlist(data);

			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchWishlist();
	}, [API_SERVER, accessToken, authFetch]);

	const handleRemove = async (productId: string) => {
		try {
			const responce = await authFetch(`${API_SERVER}/users/wishlist/${productId}/toggle`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
			});
			if (!responce.ok) throw new Error('Failed to remove product from wishlist');

			setWishlist(prev => prev.filter(p => p.id !== productId));
		} catch (err) {
			console.error(err);
		}
	};

	const filteredProducts = wishlist.filter(p =>
		p.title.toLowerCase().includes(search.toLowerCase())
	);

	const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
	const startIndex = (currentPage - 1) * PAGE_SIZE;
	const endIndex = startIndex + PAGE_SIZE;
	const visibleProducts = filteredProducts.slice(startIndex, endIndex);

	return (
		<div className={styles.acWishBlock}>

			<AccountMenu />

			<div className={styles.accWishlist}>

				<div className={styles.accWishlistTitle}>
					<p>Wishlist</p>
					<div className={styles.searchWishes} >
						<div className={styles.searchWishes}>
							<input
								placeholder="Search..."
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<button className={styles.searchButton}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M13.986 14.1076C12.906 15.5236 10.416 16.2016 9.3 16.2016C5.82 16.2016 3 13.3816 3 9.90156C3 6.42156 5.82 3.60156 9.3 3.60156C12.78 3.60156 15.6 6.42156 15.6 9.90156C15.6 10.5856 15.492 11.2456 15.288 11.8636" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M21.0001 20.3995L13.9861 14.1055" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</button>
						</div>
					</div>
				</div>

				{loading ? (
					<p>Loading...</p>
				) : (
					<>
						<div className={styles.wishlistSet}>
							{visibleProducts.map(product => (
								<WishlistCard
									key={product.id}
									product={product}
									actionSlot={
										<button
											className={commonStyles.removeBtn}
											onClick={() => handleRemove(product.id)}
										>
											Remove
										</button>
									}
								/>
							))}
						</div>

						{totalPages > 1 && (
							<div className={commonStyles.fixedPagination}>
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={(page) => setCurrentPage(page)}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>

	);
}