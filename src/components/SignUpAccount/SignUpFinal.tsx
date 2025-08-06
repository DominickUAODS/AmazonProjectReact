import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SignUpFinal.module.css'
import commonStyles from '../common.module.css';


export default function SignUpFinal({ background }: { background: Location }) {
    const navigate = useNavigate();
    const closeModal = () => navigate(-1); 


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

    const openCongrats = () => {
		navigate('/congrats',{ state: { background } });
	};

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={commonStyles.modalBlock}>
                <div className={styles.modalFSBlock0}>
                        <div className={styles.modalFSBlock}>

                            <div className={commonStyles.info}>
                                <span className={commonStyles.infoSpan0}>
                                    Finishing touches
                                </span>
                                <span className={commonStyles.infoSpan1}>
                                    Enter your first and last name
                                </span>
                            </div>

                            <div className={styles.enterFSblock}>
                                <div className={commonStyles.inputWrappersBlock}>
                                    <fieldset className={commonStyles.inputWrapper}>
                                        <legend>First name</legend>
                                        <input type="email" placeholder="Enter your first name" />
                                    </fieldset>

                                    <fieldset className={commonStyles.inputWrapper}>
                                        <legend>Last name</legend>
                                        <input type="email" placeholder="Enter your last name" />
                                    </fieldset>
                                </div>
                            </div>

                            <button className={commonStyles.nextStepButton} onClick={openCongrats}>
                                Create account
                            </button>
                        </div>
                    </div>

                    <img className = {styles.imgReactangle} src='public\img\Rectangle 413.png'></img>
                </div>
			</div>
		</div>
	);
}