
import type { ProductsList } from '../../types/Product';
import styles from './WishlistCard.module.css'
import commonStyles from "../common.module.css";

interface WishlistCardProps {
	product: ProductsList;
	actionSlot?: React.ReactNode;
}

export default function WishlistCard({ product, actionSlot }: WishlistCardProps) {
	const [dollars, cents] = product.price.toFixed(2).split('.');
	let oldPrice = 0;
	if (product.discount != 0) oldPrice = product.price * (1 + product.discount / 100)

	return (
		<div className={styles.wishlistCard}>
			{actionSlot && <div className={styles.actionWrapper}>{actionSlot}</div>}
			{product.discount !== 0 && (
				<div className={commonStyles.discountBlock}>
					<svg
						width="64"
						height="40"
						viewBox="0 0 128 80"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={commonStyles.discountSvg}
					>
						<path
							d="M0.12384 40.2582C0.0858968 39.9434 0.0669252 39.6287 0.0479536 39.3139C-1.16623 19.0895 20.9357 7.26576 36.9477 2.83923C54.781 -2.07914 74.9668 -0.800369 91.4531 8.19042C114.162 20.5847 124.748 46.6914 127.689 71.9325C128.391 78.0117 121.978 82.1824 117.065 78.7789C108.243 72.6998 99.6868 61.4072 88.8161 59.3022C75.8205 56.7839 63.4131 62.9221 51.0436 66.66C32.1858 72.3457 2.36249 64.3386 0.12384 40.2582Z"
							fill="#B8EA48"
						/>
						<text
							x="50%"
							y="50%"
							dominantBaseline="middle"
							textAnchor="middle"
							fill="#0E2042"
							fontSize="26"
							fontWeight="700"
						>
							-{product.discount}%
						</text>
					</svg>
				</div>
			)}
			<img className={styles.productImg} src={product.display || product.displays} alt="Product Img" />

			<div className={styles.titleRat}>
				<p>{product.name}</p>

				<div className={styles.rat}>

					<div className={styles.stars}>
						<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.19811 20.4072C7.37611 21.0012 6.27811 20.2032 6.59011 19.2372L7.91611 15.1452C8.10211 14.5692 7.89811 13.9392 7.40611 13.5852L3.92611 11.0592C3.10411 10.4652 3.53011 9.16922 4.53811 9.16922H8.84011C9.44611 9.16922 9.98011 8.77922 10.1661 8.20322L11.4921 4.11122C11.8041 3.14522 13.1661 3.14522 13.4841 4.11122L14.8101 8.20322C14.9961 8.77922 15.5361 9.16922 16.1361 9.16922H20.4381C21.4521 9.16922 21.8721 10.4652 21.0501 11.0592L17.5701 13.5852C17.0781 13.9392 16.8741 14.5692 17.0601 15.1452L18.3861 19.2372C18.6981 20.2032 17.5941 21.0012 16.7781 20.4072L13.5201 17.7972C13.0281 17.4012 12.3321 17.3892 11.8221 17.7552L8.18011 20.4072H8.19811Z" fill="#0E2042" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<p className={styles.starsP}>{product.stars}</p>
					</div>

					<div className={styles.comm}>
						<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7.63989 9.28125H17.3599" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M7.63989 12.9062H17.3599" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M21.5 8.27216C21.5 6.27416 19.88 4.66016 17.888 4.66016H7.112C5.114 4.66016 3.5 6.28016 3.5 8.27216V13.9122C3.5 15.9102 5.12 17.5242 7.112 17.5242H15.542C16.136 17.5242 16.718 17.6442 17.264 17.8842L20.486 19.2822C20.966 19.4922 21.5 19.1382 21.5 18.6162V11.8122" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<p className={styles.commP}>{product.comments}</p>
					</div>
				</div>

				<div className={styles.priceBlock}>
					{product.discount != 0 ? (
						<div className={styles.discountBlock}>
							<span className={styles.newPrice}>
								<span className={styles.dollar}>$</span>
								<span className={styles.main}>{dollars}</span>
								<sup className={styles.cents}>{cents}</sup>
							</span>
							<span className={styles.oldPrice}>${oldPrice.toFixed(2)}</span>
						</div>
					) : (
						<div className={styles.nodiscountBlock}>
							<span className={styles.newPrice}>
								<span className={styles.dollar}>$</span>
								<span className={styles.main}>{Math.floor(product.price)}</span>
								<sup className={styles.cents}>
									{(product.price % 1).toFixed(2).substring(2)}
								</sup>
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}