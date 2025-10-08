import styles from "./UserInMainMenu.module.css";
import commonStyles from '../common.module.css';
import { useLocation, useNavigate } from "react-router-dom";

export default function UserInMainMenu({
    background,
    onClose,
  }: {
    background: Location;
    onClose: () => void;
  }){
    const navigate = useNavigate();
	const storedData = localStorage.getItem("user");
	const user = storedData ? JSON.parse(storedData) : null;
    const openSignUp = () => {
		navigate("/signUp", { state: { background} });

	};

    const openLogIn = () => {
		navigate("/logIn", { state: { background } });

	};


    const handleClick = () => {
      navigate(`/settings`);
    };

    const handleMobileClick = () =>{
        navigate(`/account-menu`);
    };

    const isMobile = window.innerWidth <= 768;

    const handleResponsiveClick = () => {
        if (isMobile) {
          handleMobileClick();
        } else {
          handleClick();
        }
      };
    
    return(
        <div className={styles.customerBlock}>

            <div className={commonStyles.cusPhoto} onClick={user && handleResponsiveClick}>
                <div className={styles.phMobile}>
                    <img
                        src={user?.profile_photo || "/img/default-user.svg"}
                        alt={user ? `${user.first_name} ${user.last_name}` : "User"}
                    />
                    <div className={styles.closeMenuMobile} onClick={onClose}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3999 10.4004L21.2045 21.205" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                            <path d="M21.2046 10.4004L10.4 21.205" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div className={styles.cusNameRole}>
                    <p className={`${commonStyles.cusName} ${styles.userName}`}>
                        {user ? `${user.first_name} ${user.last_name}` : "Not signed in"}
                    </p>
                    <p className={`${commonStyles.cusRole} ${styles.userRole}`}>
                        {user?.role || "Log in to enjoy a more pleasant experience"}
                    </p>
                </div>
            </div>
            {user ? null : (
            <div className={styles.authButtons}>
                <button className={commonStyles.nextStepButton} onClick={openSignUp}>Sign up</button>
                <button className={commonStyles.secondaryButton} onClick={openLogIn}>Log in</button>
            </div>
        )}
    </div>

    );
}