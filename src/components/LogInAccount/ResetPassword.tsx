import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './ResetPassword.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from '../SignUpAccount/PasswordInput';
import type { ModalState } from '../../types/ModalState';

export default function ResetPassword({ background }: { background: Location }) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const location = useLocation();
	const navigate = useNavigate();
	const [newPassword, setNewPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState('');

	const { email, code } = location.state || {};

	const closeModal = () => {
        navigate(background.pathname || "/");
    };

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== repeatPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/auth/reset-complete`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, code, new_password: newPassword }),
			});

			console.log(location.state);
			console.log(background);
			console.log(`${email} + ${code} + ${newPassword}`);

			if (!response.ok) {
				const err = await response.json();
				alert(err.message || 'Confirm password failed');
				return;
			}

			navigate('/login', { state: { background } satisfies ModalState });

		} catch (err) {
			console.error(err);
			setError('Ошибка подключения к серверу');
		}

	};

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
					<div className={styles.rpBlock0}>
						<div className={styles.rpBlock}>

							<div className={commonStyles.info}>
								<span className={commonStyles.infoSpan0}>
									Reset password
								</span>
								<span className={commonStyles.infoSpan1}>
									Set a new password for your account
								</span>
							</div>

							<div className={styles.resetPasswordBlock}>
								<fieldset className={commonStyles.inputWrapper}>
									<legend>New password</legend>
									<PasswordInput
										placeholder="Enter new password"
										name="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
								</fieldset>


								<fieldset className={commonStyles.inputWrapper}>
									<legend>Repeat password</legend>
									<PasswordInput
										placeholder="Repeat new password"
										name="repeatPassword"
										value={repeatPassword}
										onChange={(e) => setRepeatPassword(e.target.value)}
									/>
								</fieldset>

								{error && <p className={commonStyles.errorText}>{error}</p>}
							</div>

							<button className={commonStyles.nextStepButton} onClick={handleReset}>
								Continue
							</button>


						</div>
					</div>

					<img className={styles.imgReactangle} src="/img/Rectangle 413.png"></img>
				</div>
			</div>
		</div>
	);
}