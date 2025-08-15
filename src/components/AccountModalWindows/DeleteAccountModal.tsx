import { useNavigate} from 'react-router-dom';
import styles from './DeleteAccountModal.module.css'
import commonStyles from '../common.module.css';


export default function DeleteAccountModal() {
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
                    <span className={commonStyles.modalInfoSpan}> Delete account? </span>
                </div>
                <div className={styles.delSpans}>
                    <span>This action will permanently remove your profile and correlated data.</span>
                    <span>Once clicked, all associated information, including orders, wishlisted items, and settings, is irreversibly erased from the system.</span>
                    <span>Do you wish to proceed?</span>

                </div>



                <div className={commonStyles.buttonGroup}>
                    
                    <button onClick={handleBackdropClick} className={commonStyles.nextStepButton}>Cancel</button>
                    <button  className={commonStyles.destructiveButton}>Delete account</button>
                </div>
			</div>
		</div>
	);
}