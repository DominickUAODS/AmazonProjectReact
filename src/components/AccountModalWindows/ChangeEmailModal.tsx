import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChangeEmailModal.module.css'
import commonStyles from '../common.module.css';
import CodeInput from '../SignUpAccount/CodeInput';
import { useAuth } from '../Helpers/AuthContext';


export default function ChangeEmailModal() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const closeModal = () => navigate("/settings");

	const { authFetch, accessToken, logout } = useAuth();

	const [email, setEmail] = useState('');

	const [verificationCode, setVerificationCode] = useState('');

	const [errors, setErrors] = useState<{ email?: string; newEmail?: string; verificationCode?: string; general?: string }>({});

	let staySignedIn = false;
	if (localStorage.length !== 0) {
		staySignedIn = true;
	}

	const storage = staySignedIn ? localStorage : sessionStorage;

	const storedData = storage.getItem("user");

	const user = storedData ? JSON.parse(storedData) : null;

	const newErrors: typeof errors = {};

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleSendCode = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			newErrors.email = 'Missing email address';
		}

		if (user.email === email) {
			newErrors.newEmail = 'New email is the same to current';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await authFetch(`${API_SERVER}/auth/resend-code`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: user.email,
					purpose: "change"
				}),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Email change failed' });
				return;
			}

			const data = await response.json();
			console.log(data);

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}
	}


	const handleConfirm = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			newErrors.email = 'Missing email address';
		}

		if (!verificationCode) {
			newErrors.verificationCode = 'Missing verification code';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const responseVRF = await fetch(`${API_SERVER}/auth/verify`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: JSON.stringify({ email: user.email, code: verificationCode }),
			});

			if (!responseVRF.ok) {
				const err = await responseVRF.json();
				setErrors({ general: err.message || 'Incorrect code, try again' });
				return;
			}

			if (responseVRF.ok) {
				try {
					const response = await authFetch(`${API_SERVER}/auth/change-email`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
						body: JSON.stringify({ new_email: email }),
					});

					if (!response.ok) {
						const err = await response.json();
						setErrors({ general: err.message || 'Email change failed' });
						return;
					}

					logout();

				} catch (err) {
					console.error(err);
					setErrors({ general: 'Ошибка подключения к серверу' });
				}
			}

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}

	}


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={commonStyles.cnModal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.ceFirstBlock}>

					<div className={commonStyles.modalInfo}>
						<span className={commonStyles.modalInfoSpan}> Change Email </span>
					</div>
					<span className={styles.ceInfoSpan}>Your current email is <a>{user.email}</a> </span>


					<div className={styles.ceSecondBlock}>
						<span className={styles.ceInfoSpan}>To change it, enter a new email, then click “Send code” and enter it in corresponding prompt.</span>
						<fieldset className={commonStyles.inputWrapper}>
							<legend className={errors.email ? commonStyles.errorLegend : ''}>Email</legend>
							<input
								type="email"
								placeholder="Enter your new email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</fieldset>
						{errors.email && <div className={commonStyles.errorText}>{errors.email}</div>}
					</div>


					<div className={styles.codeEnterBlock}>
						<CodeInput
							inputClassName={commonStyles.codeInput}
							wrapperClassName={`${commonStyles.enterCode} ${styles.ceEnterCode}`}
							onChange={(code) => {
								setVerificationCode(code); if (errors.verificationCode) { setErrors({}); }
							}}
						/>

						<button onClick={handleSendCode} className={commonStyles.sendCodeAgainBtn}>
							<span>Send Code</span>
						</button>

					</div>

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