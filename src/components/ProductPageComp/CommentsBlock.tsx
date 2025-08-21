import { useState } from 'react';
import styles from './CommentsBlock.module.css'
import RatingProduct from './RatingProduct';
import StartsComments from './StartsComments';


export default function CommentsBlock() {
    const [selectedTag, setSelectedTag] = useState<string[]>([]);

	
	return (
		<div className={styles.ppcb}>
            <span className={styles.ppcbSpan}>
                Customer reviews
            </span>

            <div className={styles.ppcbB}>
                <div className={styles.ppcb0}>
                    <RatingProduct onTagSelect={setSelectedTag} selectedTags={selectedTag}/>
                </div>

                <div className={styles.ppcb11}>
                    <StartsComments selectedTags={selectedTag}/>
                </div>
            </div>

			
		</div>
	);
}