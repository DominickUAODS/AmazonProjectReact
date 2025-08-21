
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SignUpForm.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from './PasswordInput';

export default function SignUpForm({ background }: { background: Location }) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; general?: string }>({});

	const handleContinue = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (!email) {
			newErrors.email = 'Missing email address';
		}
		if (!password) {
			newErrors.password = 'Missing password';
		}
		if (!confirmPassword) {
			newErrors.confirmPassword = 'Missing confirm password';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await fetch(`${API_SERVER}/Auth/register-start`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Sign up failed' });
				return;
			}

			// Успех — переходим на экран ввода кода
			navigate('/checkIn', { state: { background, email } });
		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}
	};


	const openLogIn = () => {
		navigate('/login', { state: { background } });
	};


	return (
		<div className={styles.signUpForm}>
			<div className={commonStyles.inputWrappersBlock}>
				<fieldset className={commonStyles.inputWrapper}>
					<legend className={errors.email ? commonStyles.errorLegend : ''}>Email</legend>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							if (errors.email) {
								setErrors(prev => ({ ...prev, email: undefined }));
							}
						}}
					/>
				</fieldset>
				{errors.email && <div className={commonStyles.errorText}>{errors.email}</div>}


				<fieldset className={commonStyles.inputWrapper}>
					<legend className={errors.password ? commonStyles.errorLegend : ''}>Password</legend>
					<PasswordInput
						placeholder="Enter your password"
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
					<legend className={errors.confirmPassword ? commonStyles.errorLegend : ''}>Confirm password</legend>
					<PasswordInput
						placeholder="Repeat your password"
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
				{errors.confirmPassword && <div className={commonStyles.errorText}>{errors.confirmPassword}</div>}

			</div>

			{errors.general && <p className={commonStyles.errorText}>{errors.general}</p>}

			<div className={styles.buttonBlock}>
				<button className={commonStyles.nextStepButton} onClick={handleContinue}>
					Continue
				</button>
				<div className={styles.wantToLogIn}>
					<span>
						Have an account?
						<a onClick={openLogIn}> Log in</a>
					</span>
				</div>
			</div>
		</div>
	);
}