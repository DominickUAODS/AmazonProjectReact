import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AccountSettings.module.css'
import customerData from '../../data/customers.json';
import AccountMenu from '../AccountMenu/AccountMenu';
import SettingsInfo from './SeetingsInfo';

export default function AccountSettings() {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();

	const openChangeName = () => {
		navigate('/changeName', { state: { background: location } });
	};

	const openChangePassword = () => {
		navigate('/changePassword', { state: { background: location } });
	};

	
	const openChangeEmail = () => {
		navigate('/changeEmail', { state: { background: location } });
	};

	const openLogOut = () => {
		navigate('/logOut', { state: { background: location } });
	};


	const openDeleteAcc = () => {
		navigate('/delete?', { state: { background: location } });
	};



	useEffect(() => {
	  const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
		  setIsOpen(false);
		}
	  };
	  document.addEventListener('mousedown', handleClickOutside);
	  return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);
  
	return (
		<div className={styles.acSetBlock}>
			<div className={styles.menu}>
			<AccountMenu/>
			</div>



			<div className={styles.accSettings}>
				<div className={styles.accSettingsTitle}>
					<p>Account Settings</p>
				</div>

				<div className={styles.settingsSet}>
					<div className={styles.setBlock}>
						<div className={styles.setBlockTitle}>
							<p className={styles.sbMainTitle}>
								Profile photo
							</p>
							<p className={styles.sbSubTitle}>
								Change your profile picture.
							</p>
						</div>
						<div className={styles.setBlockButtons}>
						<button className={`${styles.changePhButton} ${styles.secondaryButton}`}>
								<span>
									Change photo
								</span>
						</button>
						<div className={styles.wrapper} ref={ref}>
							<button
								className={`${styles.butIcon} ${isOpen ? styles.active : ''}`}
								onClick={() => setIsOpen(prev => !prev)}
							>
								{isOpen ? (
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12.0001 20.9632C16.9508 20.9632 20.9641 16.9498 20.9641 11.9992C20.9641 7.04848 16.9508 3.03516 12.0001 3.03516C7.04945 3.03516 3.03613 7.04848 3.03613 11.9992C3.03613 16.9498 7.04945 20.9632 12.0001 20.9632Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M14.178 15.2539L13.572 15.7099C12.678 16.3819 11.406 15.7459 11.406 14.6299V11.1919C11.406 11.0299 11.22 10.9699 11.1 11.0779C10.656 11.4679 10.698 11.5579 9.82202 11.9779" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M12.1922 9.05471C12.1202 9.34871 11.8742 9.58871 11.5802 9.65471C11.2562 9.72671 10.9562 9.61271 10.7642 9.39671C10.5962 9.20471 10.5182 8.94071 10.5782 8.65871C10.6442 8.35871 10.8842 8.11271 11.1782 8.04071C11.7962 7.89071 12.3362 8.43671 12.1922 9.05471Z" fill="#0E2042"/>
									</svg>
									
								) : (
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M12.0001 20.9651C16.9508 20.9651 20.9641 16.9518 20.9641 12.0011C20.9641 7.05043 16.9508 3.03711 12.0001 3.03711C7.04945 3.03711 3.03613 7.05043 3.03613 12.0011C3.03613 16.9518 7.04945 20.9651 12.0001 20.9651Z" stroke="#0E2042" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M14.178 15.2539L13.572 15.7099C12.678 16.3819 11.406 15.7459 11.406 14.6299V11.1919C11.406 11.0299 11.22 10.9699 11.1 11.0779C10.656 11.4679 10.698 11.5579 9.82202 11.9779" stroke="#0E2042" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M12.192 9.05471C12.12 9.34871 11.874 9.58871 11.5799 9.65471C11.2559 9.72671 10.956 9.61271 10.764 9.39671C10.596 9.20471 10.5179 8.94071 10.5779 8.65871C10.6439 8.35871 10.8839 8.11271 11.1779 8.04071C11.7959 7.89071 12.336 8.43671 12.192 9.05471Z" fill="#0E2042" fillOpacity="0.5"/>
								</svg>
								)}
							</button>

							{isOpen && <SettingsInfo />}
							</div>

						</div>
					</div>

					<div className={`${styles.setBlock} ${styles.setBlockWh}`}>
						<div className={styles.setBlockTitle}>
							<p className={styles.sbMainTitle}>
								First name and last name
							</p>
							<p className={styles.sbSubTitle}>
								Update your first and last name for your profile where it's displayed.
							</p>
						</div>
						<div className={styles.setBlockButtons}>
						<div className={styles.nameDisplay}>
							<span className={styles.nameText}>{customerData.customer.name}</span>
						</div>
						<button onClick={openChangeName} className={`${styles.changeNameButton} ${styles.secondaryButton}`}>
								<span>
									Change name
								</span>
						</button>
						</div>
					</div>



					<div className={styles.setBlock}>
						<div className={styles.setBlockTitle}>
							<p className={styles.sbMainTitle}>
								Email
							</p>
							<p className={styles.sbSubTitle}>
								Update the email address associated with your account.
							</p>
						</div>
						<div className={styles.setBlockButtons}>
						<div className={styles.emailDisplay}>
							<span className={styles.emailText}>{customerData.customer.email}</span>
						</div>
						<button onClick={openChangeEmail} className={`${styles.changeEmailButton} ${styles.secondaryButton}`}>
								<span>
									Change email
								</span>
						</button>
						</div>
					</div>


					
					<div className={`${styles.setBlock} ${styles.setBlockWh}`}>
						<div className={styles.setBlockTitle}>
							<p className={styles.sbMainTitle}>
								Password
							</p>
							<p className={styles.sbSubTitle}>
								Change your account's password.
							</p>
						</div>
						<div className={styles.setBlockButtons}>
						<div className={styles.emailDisplay}>
							<span className={styles.passwordText}>{customerData.customer.password}</span>
						</div>
						<button onClick={openChangePassword} className={`${styles.changePasswordButton} ${styles.secondaryButton}`}>
								<span>
									Change password
								</span>
						</button>
						</div>
					</div>



					<div className={styles.setBlock}>
						<div className={styles.setBlockTitle}>
							<p className={styles.sbMainTitle}>
								Log out
							</p>
							<p className={styles.sbSubTitle}>
								Ends current session, disconnecting user from account or system.
							</p>
						</div>
						<div className={styles.setBlockButtons}>
						<button onClick={openLogOut} className={`${styles.changePasswordButton} ${styles.secondaryButton}`}>
								<span>
									Log out
								</span>
						</button>
						</div>
					</div>


					<div className={`${styles.setBlock} ${styles.setBlockWh}`}>
						<div className={styles.setBlockTitle}>
							<p className={styles.sbMainTitle}>
								Delete account
							</p>
							<p className={styles.sbSubTitle}>
							Permanently remove your account and associated data, disabling access and erasing personal information.
							</p>
						</div>
						<div className={styles.setBlockButtons}>
						<button onClick = {openDeleteAcc} className={`${styles.deleteButton} ${styles.destructiveButton}`}>
								<span>
									Delete
								</span>
						</button>
						</div>
					</div>



				</div>
			</div>
		</div>
	);
}