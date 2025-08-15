import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SignUpFinal.module.css'
import commonStyles from '../common.module.css';
import { useState } from 'react';


export default function SignUpFinal({ background }: { background: any }) {
    const navigate = useNavigate();
    const closeModal = () => navigate("/"); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
            

    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};
    
    
  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both first and last names');
      return;
    }

    const { email, password } = (background.state as any) || {};

    if (!email || !password) {
      setError('Missing email or password data');
      return;
    }

    try {
        console.log('background.state:', background.state);
      const res = await fetch('http://localhost:5000/api/Auth/register/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text);
        return;
      }
      console.log("Переходим на /congrats");
      navigate('/congrats', { state: { background } });
    } catch (err) {
      setError('Ошибка подключения к серверу');
      console.error(err);
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
                                    <fieldset className={commonStyles.inputWrapper}>
                                        <legend>First name</legend>
                                        <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </fieldset>

                                    <fieldset className={commonStyles.inputWrapper}>
                                        <legend>Last name</legend>
                                        <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </fieldset>
                                </div>
                            </div>

                            <button className={commonStyles.nextStepButton} onClick={handleSubmit}>
                                Create account
                            </button>
                        </div>
                    </div>

                    <img className = {styles.imgReactangle} src='public\img\Rectangle 413.png'></img>
                </div>
			</div>
		</div>
	);
}