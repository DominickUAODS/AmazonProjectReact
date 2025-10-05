import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeleteAccountModal.module.css'
import commonStyles from '../common.module.css';
import { useAuth } from '../Helpers/AuthContext';

export default function DeleteAccountModal() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const closeModal = () => navigate("/settings");
	const { accessToken, logout, authFetch } = useAuth();
	const [errors, setErrors] = useState<{ general?: string }>({});

	let staySignedIn = false;
	if (localStorage.length !== 0) {
		staySignedIn = true;
	}

	const storage = staySignedIn ? localStorage : sessionStorage;

	const storedData = storage.getItem("user");

	const user = storedData ? JSON.parse(storedData) : null;

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleDelete = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await authFetch(`${API_SERVER}/users/${user.id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Delete failed' });
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
					<span className={commonStyles.modalInfoSpan}> Delete account? </span>
				</div>

				<div className={styles.delSpans}>
					<span>This action will permanently remove your profile and correlated data.</span>
					<span>Once clicked, all associated information, including orders, wishlisted items, and settings, is irreversibly erased from the system.</span>
					<span>Do you wish to proceed?</span>
				</div>

				<div className={commonStyles.buttonGroup}>
					<button onClick={handleBackdropClick} className={commonStyles.nextStepButton}>Cancel</button>
					<button onClick={handleDelete} className={commonStyles.destructiveButton}>Delete account</button>
				</div>

				{errors.general && <div className={commonStyles.errorText}>{errors.general}</div>}
			</div>
		</div>
	);
}