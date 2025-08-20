import { useNavigate } from 'react-router-dom';
import styles from './ChangeNameModal.module.css'
import commonStyles from '../common.module.css';
import { useAuth } from '../Helpers/AuthContext';
import { useState } from 'react';


export default function ChangeNameModal() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const closeModal = () => navigate("/settings");
	const { authFetch, accessToken } = useAuth();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');


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

	const handleConfirm = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await authFetch(`${API_SERVER}/users/`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
				body: JSON.stringify({
					id: user.id,
					role: user.role,
					first_name: firstName,
					last_name: lastName
				}),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Update photo failed' });
				return;
			}

			const data = await response.json();
			console.log(data);

			// Сохраняем токены
			//storage.setItem('accessToken', data.access_token);
			//storage.setItem('refreshToken', data.refresh_token);
			storage.setItem('user', JSON.stringify(data));

			//login(data.user, { access: data.access_token, refresh: data.refresh_token }, staySignedIn);

			closeModal();
			navigate('/settings');

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}

	}


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={commonStyles.cnModal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalInfo}>
					<span className={commonStyles.modalInfoSpan}> Change name </span>
				</div>

				<div className={styles.cnInputs}>
					<fieldset className={commonStyles.inputWrapper}>
						<legend>First name</legend>
						<input
							type="text"
							placeholder="Enter new first name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</fieldset>

					<fieldset className={commonStyles.inputWrapper}>
						<legend>Last name</legend>
						<input
							type="text"
							placeholder="Enter new last name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</fieldset>
				</div>

				<div className={commonStyles.buttonGroup}>
					<button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

					<button onClick={handleConfirm} className={commonStyles.nextStepButton}>Confirm</button>
				</div>
			</div>
			{errors.general && <div className={commonStyles.errorText}>{errors.general}</div>}
		</div>
	);
}