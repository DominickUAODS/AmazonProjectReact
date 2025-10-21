
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SignUpAccount.module.css'
import SignUpForm from './SignUpForm';
import commonStyles from '../common.module.css';


export default function SignUpAccount({background}:{background:Location}) {
	const navigate = useNavigate();
	const location = useLocation();
	const closeModal = () => {
        navigate(background.pathname || "/");
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
					<div className={styles.modalSignUpBlock0}>
						<div className={styles.modalSignUpBlock}>
							<div className={commonStyles.info}>
								<span className={commonStyles.infoSpan0}>
									Create account
								</span>
								<span className={commonStyles.infoSpan1}>
									Shop in the marketplace while traveling
								</span>
							</div>
							<div className={styles.signUpForm}>
								<SignUpForm background={location.state?.background} />
							</div>
							<span className={styles.tAp}>
								By clicking “Continue”, you agree with <a>PERRY Terms and Conditions</a>
							</span>
						</div>
					</div>
					<img className={styles.imgReactangle} src='public\img\Rectangle_413.png'></img>
				</div>
			</div>
		</div>
	);
}