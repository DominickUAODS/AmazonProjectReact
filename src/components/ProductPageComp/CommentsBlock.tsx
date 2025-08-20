import styles from './CommentsBlock.module.css'
import RatingProduct from './RatingProduct';


export default function CommentsBlock() {
	
	return (
		<div className={styles.ppcb}>
            <span className={styles.ppcbSpan}>
                Customer reviews
            </span>


            <div className={styles.ppcb0}>
                <RatingProduct   average={4}
                    totalReviews={242}
                    ratings={[65, 16, 10, 4, 5]}/>

            </div>

			
		</div>
	);
}