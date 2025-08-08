import { useNavigate} from 'react-router-dom';
import styles from './LogOutModal.module.css'
import commonStyles from '../common.module.css';


export default function LogOutModal() {
    const navigate = useNavigate();
    const closeModal = () => navigate("/settings"); 
     


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={`${commonStyles.cnModal} ${styles.loModal}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${commonStyles.modalInfo} ${styles.loModalInfo}`}>
                    <span className={`${commonStyles.modalInfoSpan} ${styles.loInfoSpan}`}> Log out? </span>
                </div>

                <span className={styles.logOutSpan}>
                    This action will remove this item from your wishlist.
                </span>

                <div className={commonStyles.buttonGroup}>
                    <button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

                    <button className={commonStyles.nextStepButton}>Log out</button>
                </div>
			</div>
		</div>
	);
}