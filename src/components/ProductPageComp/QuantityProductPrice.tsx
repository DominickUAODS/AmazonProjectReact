import { useEffect, useState } from "react";
import styles from "./QuantityProductPrice.module.css";
import commonStyles from "../common.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from '../Helpers/AuthContext';
import type Product from "../../interfaces/ProductInterface";
import { addToCart } from "../CartModal/CartHelpers";

interface QuantityProductPriceProps {
	price: number;
	status: string;
}

export default function QuantityProductPrice({ price, status }: QuantityProductPriceProps) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const { id: productId } = useParams<{ id: string }>();
	const { authFetch, accessToken } = useAuth();
	const [quantity, setQuantity] = useState(1);
	const [isInWishlist, setIsInWishlist] = useState(false);
	const [loading, setLoading] = useState(true);

	const increase = () => setQuantity((prev) => prev + 1);
	const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

	const total = (price * quantity).toFixed(2);
	const [dollars, cents] = total.split(".");

	useEffect(() => {
		async function checkWishlist() {
			if (!productId || !accessToken) return;
			try {
				const responce = await authFetch(`${API_SERVER}/users/wishlist`,
					{
						headers: { Authorization: `Bearer ${accessToken}` },
					});
				if (!responce.ok) throw new Error("Failed to load wishlist");
				const data = await responce.json();
				setIsInWishlist(data.some((p: Product) => p.id === productId));
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		checkWishlist();
	}, [productId, accessToken, API_SERVER, authFetch])

	const handleToggleWishlist = async () => {
		if (!productId || !accessToken) return;

		try {
			const response = await authFetch(`${API_SERVER}/users/wishlist/${productId}/toggle`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, },
				}
			);

			if (!response.ok) throw new Error("Failed to toggle wishlist");

			setIsInWishlist((prev) => !prev);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.qpp}>
			<div className={styles.innerqpp}>
				<div className={styles.qppB1}>
					{/* Цена */}
					<div className={styles.price}>
						<span className={styles.priceSpan}>
							<span className={styles.dollar}>$</span>
							<span className={styles.main}>{dollars}</span>
							<sup className={styles.cents}>{cents}</sup>
						</span>
					</div>

					{/* Инфо */}
					<div className={styles.addedInfo}>
						<div className={styles.addedInfoB1}>
							<div className={styles.addedInfoBlock}>
								<span className={styles.pStatusSpan}>Status</span>
								<span className={styles.pStatusSpan2}>{status}</span>
							</div>
							<div className={styles.addedInfoBlock}>
								<span className={styles.pStatusSpan}>Payment methods</span>
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
									<path
										d="M4.18799 1.44141L8.17499 5.59941C8.42999 5.86341 8.42999 6.28341 8.17499 6.54741L4.18799 10.6934"
										stroke="#0E2042"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<div className={styles.addedInfoBlock}>
								<span className={styles.pStatusSpan}>Security</span>
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
									<path
										d="M4.18799 1.44141L8.17499 5.59941C8.42999 5.86341 8.42999 6.28341 8.17499 6.54741L4.18799 10.6934"
										stroke="#0E2042"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>

						{/* Счетчик */}
						<div className={styles.addedInfoBlock}>
							<span className={styles.pStatusSpan}>Quantity</span>
							<div className={styles.counter}>
								{/* Минус */}
								<svg
									onClick={decrease}
									style={{ cursor: "pointer" }}
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.5 5.98047H10.5"
										stroke="#0E2042"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>

								{/* Кол-во */}
								<span className={styles.quantity}>{quantity}</span>

								{/* Плюс */}
								<svg
									onClick={increase}
									style={{ cursor: "pointer" }}
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 1.5V10.5M1.5 6H10.5"
										stroke="#0E2042"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Кнопки */}
					<div className={styles.buttonGroup}>
						<button className={commonStyles.nextStepButton}>Buy now</button>
						<button className={commonStyles.secondaryButton} onClick={() => {
							for (let i = 0; i < quantity; i++) {
								addToCart(productId!);
							}
						}}>Add to cart</button>
						<button
							onClick={handleToggleWishlist}
							disabled={loading}
							className={commonStyles.tetriatyButton}
						>
							{isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}