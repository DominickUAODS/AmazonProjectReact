import { useNavigate} from 'react-router-dom';
import styles from './ChangeNameModal.module.css'
import commonStyles from '../common.module.css';


export default function ChangeNameModal() {
    const navigate = useNavigate();
    const closeModal = () => navigate("/settings"); 
     


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={commonStyles.cnModal} onClick={(e) => e.stopPropagation()}>
                <div className={commonStyles.modalInfo}>
                    <span className={commonStyles.modalInfoSpan}> Change name </span>
                </div>

                <div className={styles.cnInputs}>
                    <fieldset className={commonStyles.inputWrapper}>
                        <legend>First name</legend>
                        <input type="text" placeholder="Enter new first name" />
                    </fieldset>

                    <fieldset className={commonStyles.inputWrapper}>
                        <legend>Last name</legend>
                        <input type="text" placeholder="Enter new last name" />
                    </fieldset>
                </div>

                <div className={commonStyles.buttonGroup}>
                    <button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

                    <button className={commonStyles.nextStepButton}>Confirm</button>
                </div>
			</div>
		</div>
	);
}