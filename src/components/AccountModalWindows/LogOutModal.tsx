import { useNavigate } from 'react-router-dom';
import styles from './LogOutModal.module.css'
import commonStyles from '../common.module.css';
import { useAuth } from '../Helpers/AuthContext';
import { useState } from 'react';


export default function LogOutModal() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const { accessToken, refreshToken, logout } = useAuth();
	const closeModal = () => navigate("/settings");

	const [errors, setErrors] = useState<{ general?: string }>({});

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleLogOut = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/auth/logout`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
				body: JSON.stringify({ refresh_token: refreshToken }),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Logout failed' });
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
			<div className={`${commonStyles.cnModal} ${styles.loModal}`} onClick={(e) => e.stopPropagation()}>
				<div className={`${commonStyles.modalInfo} ${styles.loModalInfo}`}>
					<span className={`${commonStyles.modalInfoSpan} ${styles.loInfoSpan}`}> Log out? </span>
				</div>

				<span className={styles.logOutSpan}>
					You will log out of your account on this device.
				</span>

				<div className={commonStyles.buttonGroup}>
					<button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

					<button onClick={handleLogOut} className={commonStyles.nextStepButton}>Log out</button>
				</div>
				{errors.general && <div className={commonStyles.errorText}>{errors.general}</div>}
			</div>
		</div>
	);
}