import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EnterCodeFromGmail.module.css'
import commonStyles from '../common.module.css';
import CodeInput from './CodeInput';

export default function EnterCodeFromGmail({ background, isPasswordReset }: { background: Location; isPasswordReset: boolean; }) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const location = useLocation();
	const [verificationCode, setVerificationCode] = useState('');
	const closeModal = () => navigate(-1);
	const { email } = location.state || {};
	const [errors, setErrors] = useState<{ verificationCode?: string; general?: string }>({});

	// Таймер и состояние кнопки
	const [timeLeft, setTimeLeft] = useState(0);
	//const [isSending, setIsSending] = useState(false);
	const [sendCodeClicked, setSendCodeClicked] = useState(false);

	useEffect(() => {
		if (timeLeft <= 0) return;
		const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
		return () => clearInterval(timer);
	}, [timeLeft]);

	const startTimer = () => {
		setTimeLeft(60); // 1 минута
	};

	const handleSendCode = async () => {
		if (!email) return;

		const purpose = isPasswordReset ? 'reset' : 'register';

		try {
			const response = await fetch(`${API_SERVER}/auth/resend-code`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, purpose }),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.error || err || 'Failed to send code' });
				return;
			}

			setSendCodeClicked(true); // Показываем кнопку Resend
			startTimer();
		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка при отправке кода' });
		}
	};

	const handleResendCode = async () => {
		startTimer(); // Сразу перезапускаем таймер
		await handleSendCode(); // Отправляем код заново
	};

	const handleVerify = async () => {
		const newErrors: typeof errors = {};
		if (!verificationCode) newErrors.verificationCode = 'Missing verification code';
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/auth/verify`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, code: verificationCode }),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Incorrect code, try again' });
				return;
			}

			if (isPasswordReset) {
				handlePasswordReset();
			} else {
				openFinalSignUp();
			}
		} catch (err) {
			console.error(err);
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
							<path d="M26.2498 4.80078L12.9598 18.6608C12.1098 19.5408 12.1098 20.9408 12.9598 21.8208L26.2498 35.6408" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

								{!sendCodeClicked && (
									<button className={commonStyles.sendCodeAgainBtn} onClick={handleSendCode}>
										<span>Send Code</span>
									</button>
								)}


								{sendCodeClicked && (
									<button
										className={commonStyles.sendCodeAgainBtn}
										onClick={handleResendCode}
										disabled={timeLeft > 0}
									>
										{timeLeft > 0 ? `Resend code 0:${timeLeft.toString().padStart(2, '0')}` : 'Resend code'}
									</button>
								)}
							</div>

							<div className={styles.btnDiv}>

								<button
									className={commonStyles.nextStepButton}
									onClick={isPasswordReset ? handlePasswordReset : handleVerify}
								>
									Continue
								</button>
							</div>
						</div>
					</div>
					<img className={styles.imgReactangle} src='public\img\rectangle.png'></img>
				</div>
			</div>
		</div>
	);
}