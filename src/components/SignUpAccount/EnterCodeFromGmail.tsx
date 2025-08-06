import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EnterCodeFromGmail.module.css'
import { useRef } from 'react';
import commonStyles from '../common.module.css';



export default function EnterCodeFromGmail({
    background,
    isPasswordReset,
  }: {
    background: Location;
    isPasswordReset: boolean;
  }) {
    const navigate = useNavigate();
    const closeModal = () => navigate(-1); 
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const openFinalSignUp = () => {
		navigate('/finalSignUp', { state: { background } });
	};

    const handlePasswordReset = () => {
        navigate('/resetPassword', { state: { background } });
      };
      
    

    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

    const handleBack = () => {
		navigate(-1);
	};

    

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9a-zA-Z]?$/.test(value)) return;
        if (value.length > 1) return;

        const input = inputsRef.current[index];
        if (input) input.value = value;

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        const code = inputsRef.current.map((input) => input?.value || '').join('');
        if (code.length === 6) {
            console.log('Code entered:', code);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !inputsRef.current[index]?.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={commonStyles.modalBlock}>
                        <div className={styles.backButtonBlock} onClick={handleBack}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.2498 4.80078L12.9598 18.6608C12.1098 19.5408 12.1098 20.9408 12.9598 21.8208L26.2498 35.6408" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <button className={styles.backButton} >
                                Back
                            </button>
                        </div>
                    <div className={styles.modalCodeBlock0}>
                        <div className={styles.modalCodeBlock}>

                            <div className={commonStyles.info}>
                                <span className={commonStyles.infoSpan0}>
                                    Send code
                                </span>
                                <span className={commonStyles.infoSpan1}>
                                    Enter the code to confirm your email
                                </span>
                            </div>

                            <div className={styles.enterCodeBlock}>
                                <div className={styles.enterCode}>
                                        {Array.from({ length: 6 }).map((_, i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            maxLength={1}
                                            ref={(el) => {
                                                inputsRef.current[i] = el;
                                              }}                                              
                                            onChange={(e) => handleChange(i, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, i)}
                                            className={styles.codeInput}
                                        />
                                        ))}
                                </div>

                                <button className={styles.sendCodeAgainBtn}>
                                    <span>Send Code</span>
                                </button>
                            </div>

                            <button
                                className={commonStyles.nextStepButton}
                                onClick={isPasswordReset ? handlePasswordReset : openFinalSignUp}
                            >
                             Continue
                            </button>
                        </div>
                    </div>
                    <img className = {styles.imgReactangle} src='public\img\Rectangle 413.png'></img>
                </div>
			</div>
		</div>
	);
}