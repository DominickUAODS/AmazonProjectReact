import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './LoginAdmin.module.css'
import commonStyles from '../../common.module.css';
import PasswordInput from '../../SignUpAccount/PasswordInput';
import { useAuth } from '../../Helpers/AuthContext';


export default function LoginAdmin() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const { login } = useAuth();
	const navigate = useNavigate();
	// const closeModal = () => navigate("/");

	const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [staySignedIn, setStaySignedIn] = useState(false);

	// const openSignUp = () => {
	// 	navigate('/signup', { state: { background } });
	// };

	// const openForgotPassword = () => {
	// 	navigate('/forgot-password', { state: { background } });
	// };

	// const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
	// 	if (e.target === e.currentTarget) {
	// 		closeModal();
	// 	}
	// };

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (!email) {
			newErrors.email = 'Missing email address';
		}
		if (!password) {
			newErrors.password = 'Missing password';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Login failed' });
				return;
			}

			const data = await response.json();
			const storage = localStorage;

			// Сохраняем токены
			storage.setItem('accessToken', data.access_token);
			storage.setItem('refreshToken', data.refresh_token);
			storage.setItem('user', JSON.stringify(data.user));

			login(data.user, { access: data.access_token, refresh: data.refresh_token }, true);

			navigate('/-/admin-panel');

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}
	};


	return (
		// <div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			// <div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock0}>
					<div className={styles.loginBlock0}>
						<div className={styles.loginBlock}>
							<div className={commonStyles.info}>
								<span className={commonStyles.infoSpan0}>
									Welcome to admin panel
								</span>
								<span className={commonStyles.infoSpan1}>
									Login into your account
								</span>
							</div>


							<div className={styles.inputDataBlock}>
								<fieldset className={commonStyles.inputWrapper}>
									<legend className={errors.email ? commonStyles.errorLegend : ''}>Email</legend>
									<input
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</fieldset>
								{errors.email && <div className={commonStyles.errorText}>{errors.email}</div>}


								<fieldset className={commonStyles.inputWrapper}>
									<legend className={errors.password ? commonStyles.errorLegend : ''}>Password</legend>
									<PasswordInput
										placeholder="Enter your password"
										name="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</fieldset>
								{errors.password && <div className={commonStyles.errorText}>{errors.password}</div>}


								{/* <div className={styles.stayLogInblock}>
									<label className={styles.checkboxLabel}>
										<input
											type="checkbox"
											checked={staySignedIn}
											onChange={(e) => setStaySignedIn(e.target.checked)} />
										Stay signed in
									</label>
									<a onClick={openForgotPassword} className={styles.forgotPassword}>Forgot password?</a>
								</div> */}

							</div>

							{errors.general && <p className={commonStyles.errorText}>{errors.general}</p>}

							<div className={styles.logInButtonBlock}>
								<button className={commonStyles.nextStepButton} onClick={handleLogin}>
									Log in
								</button>
								{/* <div className={styles.wantToSignUp}>
									<span>
										Don’t have an account?
										<a onClick={openSignUp}> Sign up</a>
									</span>
								</div> */}
							</div>


						</div>
					</div>
					{/* <img className={styles.imgReactangle} src='/img/rectangle.png'></img> */}
				</div>
			// </div>
		//</div>
	);
}