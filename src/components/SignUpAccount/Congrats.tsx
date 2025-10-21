import { useNavigate } from 'react-router-dom';
import styles from './Congrats.module.css'
import commonStyles from '../common.module.css';


export default function Congrats() {
	const navigate = useNavigate();
	const closeModal = () => navigate("/");

	const openMain = () => {
		navigate('/');
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
					<div className={styles.modalFSBlock0}>
						<div className={styles.modalFSBlock}>

							<div className={commonStyles.info}>
								<span className={commonStyles.infoSpan0}>
									Congratulations!
								</span>
								<span className={commonStyles.infoSpan1}>
									The registration was completed
								</span>
							</div>

							<div className={styles.buttons}>
							<button className={commonStyles.nextStepButton} onClick={openMain}>
								Let`s start shopping
							</button>
							</div>
						
						</div>
					</div>

					<img className={styles.imgReactangle} src='public\img\Rectangle_413.png'></img>
				</div>
			</div>
		</div>
	);
}