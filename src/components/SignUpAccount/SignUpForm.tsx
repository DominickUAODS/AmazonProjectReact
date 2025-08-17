
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
	const [, setError] = useState('');

	const handleContinue = async () => {

		if (!email || !password || !confirmPassword) {
			setError('Заполните все поля');
			return;
		}
		if (password !== confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}

		try {
			const responce = await fetch(`${API_SERVER}/Auth/register/start`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (!responce.ok) {
				const text = await responce.text();
				setError(text);
				return;
			}

			// Успех — переходим на экран ввода кода
			navigate('/checkIn', { state: { email, password, background } });
		} catch (err) {
			console.error(err);
			setError('Ошибка подключения к серверу');
		}
	};


	const openLogIn = () => {
		navigate('/login', { state: { background } });
	};


	return (
		<div className={styles.signUpForm}>
			<div className={commonStyles.inputWrappersBlock}>
				<fieldset className={commonStyles.inputWrapper}>
					<legend>Email</legend>
					<input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</fieldset>


				<fieldset className={commonStyles.inputWrapper}>
					<legend>Password</legend>
					<PasswordInput
						placeholder="Enter your password"
						name="password"
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
				</fieldset>

				<fieldset className={commonStyles.inputWrapper}>
					<legend>Confirm password</legend>
					<PasswordInput
						placeholder="Repeat your password"
						name="password"
						value={confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
					/>
				</fieldset>
			</div>
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