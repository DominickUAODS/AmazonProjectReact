import styles from "./UserInMainMenu.module.css";
import commonStyles from '../common.module.css';
import { useLocation, useNavigate } from "react-router-dom";

export default function UserInMainMenu({ background }: { background: Location }){
    const navigate = useNavigate();
	const storedData = localStorage.getItem("user");
	const user = storedData ? JSON.parse(storedData) : null;
    const openSignUp = () => {
		navigate("/signUp", { state: { background} });

	};

    const openLogIn = () => {
		navigate("/logIn", { state: { background } });

	};
    
    return(
        <div className={styles.customerBlock}>
            <div className={commonStyles.cusPhoto}>
                <img
                    src={user?.profile_photo || "/img/default-user.svg"}
                    alt={user ? `${user.first_name} ${user.last_name}` : "User"}
                />
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
                <button className={commonStyles.secondaryButton} onClick={openLogIn}>Login</button>
            </div>
        )}
    </div>

    );
}