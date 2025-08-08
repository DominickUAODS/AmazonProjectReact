import { useNavigate} from 'react-router-dom';
import styles from './ChangeEmailModal.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from '../SignUpAccount/PasswordInput';
import customerData from '../../data/customers.json';
import CodeInput from '../SignUpAccount/CodeInput';


export default function ChangeEmailModal() {
    const navigate = useNavigate();
    const closeModal = () => navigate("/settings"); 
     


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={commonStyles.cnModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.ceFirstBlock}>
                    <div className={commonStyles.modalInfo}>
                        <span className={commonStyles.modalInfoSpan}> Change Email </span>
                    </div>
                    <span className={styles.ceInfoSpan}>Your current email is <a>{customerData.customer.email}</a> </span>



                    <div className={styles.ceSecondBlock}>
                        <span className={styles.ceInfoSpan}>To change it, enter a new email, then click “Send code” and enter it in corresponding prompt.</span>
                        <fieldset className={commonStyles.inputWrapper}>
								<legend>Password</legend>
								<PasswordInput
                        		placeholder="Enter your password"
                        		name="password"
                    			/>
						</fieldset>
                    </div>


                    <div className={styles.codeEnterBlock}>
                        <CodeInput
                            inputClassName={commonStyles.codeInput}
                            wrapperClassName={`${commonStyles.enterCode} ${styles.ceEnterCode}`}
                        />

                        <button className={commonStyles.sendCodeAgainBtn}>
                            <span>Send Code</span>
                        </button>

                    </div>
                    
                </div>
                
                



                <div className={commonStyles.buttonGroup}>
                    <button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

                    <button className={commonStyles.nextStepButton}>Confirm</button>
                </div>
			</div>
		</div>
	);
}