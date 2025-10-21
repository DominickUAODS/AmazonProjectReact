import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SignUpFinal.module.css'
import commonStyles from '../common.module.css';
import { useState } from 'react';

export default function SignUpFinal({ background }: { background: Location }) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;

	const location = useLocation();
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');


	const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; general?: string }>({});

	const { email } = location.state || {};

	const closeModal = () => {
        navigate(background.pathname || "/");
    };

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: typeof errors = {};

		if (!firstName) {
			newErrors.firstName = 'First name missing';
		}

		if (!firstName) {
			newErrors.lastName = 'Last name missing';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			//console.log('background.state:', background.state);
			const response = await fetch(`${API_SERVER}/auth/register-complete`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, first_name: firstName, last_name: lastName }),
			});
			console.log(response)
			if (!response.ok) {
				const err = await response.json();
				setErrors({ general: err.message || 'Sign up failed' });
				return;
			}
			//console.log("Переходим на /congrats");
			navigate('/congrats', { state: { background } });

		} catch (err) {
			console.error(err);
			setErrors({ general: 'Ошибка подключения к серверу' });
		}
	};

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
					<div className={styles.modalFSBlock0}>
						<div className={styles.modalFSBlock}>

							<div className={commonStyles.info}>
								<span className={commonStyles.infoSpan0}>
									Finishing touches
								</span>
								<span className={commonStyles.infoSpan1}>
									Enter your first and last name
								</span>
							</div>

							<div className={styles.enterFSblock}>
								<div className={commonStyles.inputWrappersBlock}>
									<fieldset className={`${commonStyles.inputWrapper} ${styles.inpurFS}`}>
										<legend className={errors.firstName ? commonStyles.errorLegend : ''}>First name</legend>
										<input
											type="text"
											placeholder="Enter your first name"
											value={firstName}
											onChange={(e) => {
												setFirstName(e.target.value);
												if (errors.firstName) {
													setErrors(prev => ({ ...prev, password: undefined }));
												}
											}}
										/>
									</fieldset>
									{errors.firstName && <div className={commonStyles.errorText}>{errors.firstName}</div>}


									<fieldset className={`${commonStyles.inputWrapper} ${styles.inpurFS}`}>
										<legend className={errors.lastName ? commonStyles.errorLegend : ''}>Last name</legend>
										<input
											type="text"
											placeholder="Enter your last name"
											value={lastName}
											onChange={(e) => {
												setLastName(e.target.value);
												if (errors.lastName) {
													setErrors(prev => ({ ...prev, password: undefined }));
												}
											}}
										/>
									</fieldset>
									{errors.lastName && <div className={commonStyles.errorText}>{errors.lastName}</div>}

								</div>
							</div>
							
							<div className={styles.btnBlock}>
							<button className={commonStyles.nextStepButton} onClick={handleSubmit}>
								Create account
							</button>
							</div>
						</div>
					</div>

					<img className={styles.imgReactangle} src='public\img\Rectangle_413.png'></img>
				</div>
			</div>
		</div>
	);
}