import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './ForgotPassword.module.css'
import commonStyles from '../common.module.css';
import { emailFilter } from '../../filters/LiSuFilters';

export default function ForgotPassword({ background }: { background: Location }) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

	const closeModal = () => {
        navigate(background.pathname || "/");
    };

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const openCheckIn = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (!email) {
			newErrors.email = 'Missing email address';
		} else {
			const emailError = emailFilter(email);
			if (emailError) newErrors.email = emailError;
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/auth/reset-start`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Reset password failed' });
				return;
			}

			navigate('/checkin-for-password', { state: { background, email } });

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}
	};


	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
					<div className={styles.fpBlock0}>
						<div className={styles.fpBlock}>
							<div className={commonStyles.info}>
								<span className={commonStyles.infoSpan0}>
									Forgot password
								</span>
								<span className={commonStyles.infoSpan1}>
									Enter your email to reset your password
								</span>
							</div>

							<div className={styles.emailInputBlock}>
								<fieldset className={commonStyles.inputWrapper}>
									<legend>Email</legend>
									<input
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</fieldset>
								{errors.password && <div className={commonStyles.errorText}>{errors.password}</div>}
							</div>


							<button className={commonStyles.nextStepButton} onClick={openCheckIn}>
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