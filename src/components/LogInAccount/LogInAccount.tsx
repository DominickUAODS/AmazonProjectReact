import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LogInAccount.module.css'



export default function LogInAccount() {
    const navigate = useNavigate();
	const location = useLocation();
    const closeModal = () => navigate(-1); 


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div className={styles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>

			</div>
		</div>
	);
}