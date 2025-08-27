import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePasswordModal.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from '../SignUpAccount/PasswordInput';
import { useAuth } from '../Helpers/AuthContext';


export default function ChangePasswordModal() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const closeModal = () => navigate("/settings");
	const { accessToken, logout, authFetch } = useAuth();

	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errors, setErrors] = useState<{ oldPassword?: string; password?: string; confirmPassword?: string; bothPassord?: string; general?: string }>({});

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (!oldPassword) {
			newErrors.oldPassword = 'Missing current password';
		}
		if (!password) {
			newErrors.password = 'Missing password';
		}
		if (!confirmPassword) {
			newErrors.confirmPassword = 'Missing confirm password';
		}

		if (password !== confirmPassword) {
			newErrors.bothPassord = 'Passwords do not match';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await authFetch(`${API_SERVER}/auth/change-password`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
				body: JSON.stringify({
					current_password: oldPassword,
					new_password: password
				}),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Change password failed' });
				return;
			}

			logout();

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}
	}


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={commonStyles.cnModal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.firstStep}>
					<div className={commonStyles.modalInfo}>
						<span className={commonStyles.modalInfoSpan}> Enter password </span>
					</div>

					<div className={styles.inputSpanBlock}>
						<span className={styles.addedInfoSpan}>Firstly, enter your current password to confirm this is you.</span>
						<fieldset className={commonStyles.inputWrapper}>
							<legend>Password</legend>
							<PasswordInput
								placeholder="Enter your current password"
								name="password"
								value={oldPassword}
								onChange={(e) => {
									setOldPassword(e.target.value);
									if (errors.oldPassword) {
										setErrors(prev => ({ ...prev, oldPassword: undefined }));
									}
								}}
							/>
						</fieldset>
						{errors.oldPassword && <div className={commonStyles.errorText}>{errors.oldPassword}</div>}

					</div>
				</div>

				<div className={styles.secondStep}>
					<div className={commonStyles.modalInfo}>
						<span className={commonStyles.modalInfoSpan}> Change Password </span>
					</div>

					<div className={styles.inputSpanBlock}>
						<span className={styles.addedInfoSpan}>Enter new password for your account.</span>
						<fieldset className={commonStyles.inputWrapper}>
							<legend>New password</legend>
							<PasswordInput
								placeholder="Enter new password"
								name="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									if (errors.password) {
										setErrors(prev => ({ ...prev, password: undefined }));
									}
								}}
							/>
						</fieldset>
						{errors.password && <div className={commonStyles.errorText}>{errors.password}</div>}

						<fieldset className={commonStyles.inputWrapper}>
							<legend>Repeat password</legend>
							<PasswordInput
								placeholder="Repeat new password"
								name="password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									if (errors.confirmPassword) {
										setErrors(prev => ({ ...prev, confirmPassword: undefined }));
									}
								}}
							/>
						</fieldset>
						{(errors.confirmPassword || errors.bothPassord) && <div className={commonStyles.errorText}>{(errors.confirmPassword || errors.bothPassord)}</div>}

					</div>
				</div>




				<div className={commonStyles.buttonGroup}>
					<button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

					<button onClick={handleChangePassword} className={commonStyles.nextStepButton}>Confirm</button>
				</div>
				{errors.general && <div className={commonStyles.errorText}>{errors.general}</div>}
			</div>
		</div>
	);
}