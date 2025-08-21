import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './EnterCodeFromGmail.module.css'
import commonStyles from '../common.module.css';
import CodeInput from './CodeInput';

export default function EnterCodeFromGmail({ background, isPasswordReset }: { background: Location; isPasswordReset: boolean; }) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const location = useLocation();
	const [verificationCode, setVerificationCode] = useState('');
	const closeModal = () => navigate(-1);
	//const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
	const { email } = location.state || {};

	const [errors, setErrors] = useState<{ verificationCode?: string; general?: string }>({});

	const handleVerify = async () => {

		const newErrors: typeof errors = {};

		if (!verificationCode) {
			newErrors.verificationCode = 'Missing verification code';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/auth/verify`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: JSON.stringify({ email, code: verificationCode }),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Incorrect code, try again' });
				return;
			}

			if (response.ok) {
				if (isPasswordReset) {
					handlePasswordReset();
				} else {
					openFinalSignUp();
				}
			} else {
				const errMsg = await response.text();
				alert(`Ошибка: ${errMsg}`);
			}
		} catch (err) {
			console.error('Ошибка при отправке кода:', err);
		}
	};

	const openFinalSignUp = () => {
		navigate('/final-signup', { state: { background, email, code: verificationCode } });
	};

	const handlePasswordReset = () => {
		navigate('/reset-password', { state: { background, email, code: verificationCode } });
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
					<div className={styles.backButtonBlock} onClick={handleBack}>
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M26.2498 4.80078L12.9598 18.6608C12.1098 19.5408 12.1098 20.9408 12.9598 21.8208L26.2498 35.6408" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
								<CodeInput
									inputClassName={commonStyles.codeInput}
									wrapperClassName={commonStyles.enterCode}
									onChange={(code) => {
										setVerificationCode(code);
										if (errors.verificationCode || errors.general) {
											setErrors({});
										}
									}}
									onComplete={(code) => setVerificationCode(code)}
								/>

								{(errors.verificationCode || errors.general) && (
									<div className={commonStyles.errorCode}>{errors.verificationCode || errors.general}</div>
								)}

								<button className={commonStyles.sendCodeAgainBtn}>
									<span>Send Code</span>
								</button>
							</div>

							<button
								className={commonStyles.nextStepButton}
								onClick={isPasswordReset ? handlePasswordReset : handleVerify}
							>
								Continue
							</button>
						</div>
					</div>
					<img className={styles.imgReactangle} src='public\img\Rectangle 413.png'></img>
				</div>
			</div>
		</div>
	);
}