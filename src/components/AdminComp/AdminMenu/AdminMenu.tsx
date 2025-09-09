import styles from "./AdminMenu.module.css";
import menuStyles from "../../MainMenu/MainMenu.module.css";
import commonStyles from '../../common.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserInMainMenu from "../../MainMenu/UserInMainMenu";
import ProductCatalog from "../../MainMenu/ProductCatalog";
import prStyles from "../../MainMenu/ProductCatalog.module.css";
import MenuSettingsBlock from "../../MainMenu/MenuSettingsBlock";


export default function AdminMenu({ background }: { background: Location }){
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = window.innerWidth <= 768;


    const closeModal = () => {
        navigate(background.pathname || "/");
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};
    
    
    return(
        <div className={`${commonStyles.modalBackdrop} ${menuStyles.menuModal}`}>
            <div className={menuStyles.menu}>
                <div className={menuStyles.menuInner}>
                    <UserInMainMenu background={background} onClose={closeModal}/>
                    <div className={prStyles.productCatalog}>

                    </div>
                </div>
            </div>
        </div>
    );
}