import { useState } from 'react';
import commonStyles from '../common.module.css';

interface PasswordInputInterface {
    placeholder?: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export default function PasswordInput({ placeholder = "Enter password", name, value, onChange }: PasswordInputInterface){

    const [showPassword, setShowPassword] = useState(false);


    return(
        <>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
              <button
        type="button"
        className={commonStyles.showButton}
        onClick={() => setShowPassword(prev => !prev)}
      >
        {showPassword ? (
          // HIDE 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M3.03613 12.3237C4.96813 9.42572 8.25613 7.51172 12.0001 7.51172C15.7441 7.51172 19.0321 9.42572 20.9641 12.3237"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 17.2675C14.4157 17.2675 16.374 15.3092 16.374 12.8935C16.374 10.4778 14.4157 8.51953 12 8.51953C9.58428 8.51953 7.62598 10.4778 7.62598 12.8935C7.62598 15.3092 9.58428 17.2675 12 17.2675Z"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.7801 15.8633C16.9321 17.3693 14.5681 18.2753 12.0001 18.2753C9.43207 18.2753 7.07407 17.3753 5.22607 15.8693"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.9761 7.16266V5.72266"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.2881 9.40341L19.4941 8.19141"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.67621 9.40228L4.51221 8.23828"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          // SHOW 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11.2207C4.938 14.1307 8.244 16.0507 12 16.0507C15.756 16.0507 19.062 14.1307 21 11.2207"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 16.4102V19.2902"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.342 14.1602L20.376 16.2002"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.66999 14.1602L3.63599 16.2002"
              stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
        
        </>
    );
}