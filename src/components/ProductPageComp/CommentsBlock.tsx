import styles from './CommentsBlock.module.css'
import RatingProduct from './RatingProduct';
import StartsComments from './StartsComments';


export default function CommentsBlock() {
	
	return (
		<div className={styles.ppcb}>
            <span className={styles.ppcbSpan}>
                Customer reviews
            </span>

            <div className={styles.ppcbB}>
                <div className={styles.ppcb0}>
                    <RatingProduct />
                </div>

                <div className={styles.ppcb11}>
                    <StartsComments/>
                </div>
            </div>

			
		</div>
	);
}