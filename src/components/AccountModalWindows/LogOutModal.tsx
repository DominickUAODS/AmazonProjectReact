import { useNavigate } from 'react-router-dom';
import styles from './LogOutModal.module.css'
import commonStyles from '../common.module.css';
import { useAuth } from '../Helpers/AuthContext';


export default function LogOutModal() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const closeModal = () => navigate("/settings");



	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleLogOut = () => {
		logout();
		closeModal();
	}


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={`${commonStyles.cnModal} ${styles.loModal}`} onClick={(e) => e.stopPropagation()}>
				<div className={`${commonStyles.modalInfo} ${styles.loModalInfo}`}>
					<span className={`${commonStyles.modalInfoSpan} ${styles.loInfoSpan}`}> Log out? </span>
				</div>

				<span className={styles.logOutSpan}>
					You will log out of your account on this device.
				</span>

				<div className={commonStyles.buttonGroup}>
					<button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

					<button onClick={handleLogOut} className={commonStyles.nextStepButton}>Log out</button>
				</div>
			</div>
		</div>
	);
}