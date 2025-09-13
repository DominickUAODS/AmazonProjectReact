import { useState } from "react";
import styles from "./QuantityProductPrice.module.css";
import commonStyles from "../common.module.css";

interface QuantityProductPriceProps {
	price: number;
	status: string;
}

export default function QuantityProductPrice({ price, status }: QuantityProductPriceProps) {
	const [quantity, setQuantity] = useState(1);

	const increase = () => setQuantity((prev) => prev + 1);
	const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

	const total = (price * quantity).toFixed(2);
	const [dollars, cents] = total.split(".");

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
						<button className={commonStyles.secondaryButton}>Add to cart</button>
						<button className={commonStyles.tetriatyButton}>Add to wish list</button>
					</div>
				</div>
			</div>
		</div>
	);
}