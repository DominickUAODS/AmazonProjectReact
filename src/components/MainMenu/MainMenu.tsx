import styles from "./MainMenu.module.css";
import commonStyles from '../common.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserInMainMenu from "./UserInMainMenu";

export default function MainMenu({ background }: { background: Location }){
    const location = useLocation();
    const navigate = useNavigate();
	const isActive = (path: string) => location.pathname.startsWith(path);
	const storedData = localStorage.getItem("user");
	const user = storedData ? JSON.parse(storedData) : null;

    const closeModal = () => {
        navigate(background.pathname || "/");
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};
    
    
    return(
        <div className={`${commonStyles.modalBackdrop} ${styles.menuModal}`} onClick={handleBackdropClick}>
            <div className={styles.menu}>
                <div className={styles.menuInner}>
                    <UserInMainMenu background={background}/>
                </div>
            </div>
        </div>
    );
}