import styles from "./AdminMenu.module.css";
import menuStyles from "../../MainMenu/MainMenu.module.css";
import commonStyles from '../../common.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserInMainMenu from "../../MainMenu/UserInMainMenu";
import ProductCatalog from "../../MainMenu/ProductCatalog";
import prStyles from "../../MainMenu/ProductCatalog.module.css";
import MenuSettingsBlock from "../../MainMenu/MenuSettingsBlock";
import type { OneCategoryMenu } from "../../../types/OneCategoryMenu";



export default function OneCategoryMenu({icon,number}:OneCategoryMenu){

    
    return(
        <div className={`${commonStyles.modalBackdrop} ${menuStyles.menuModal}`}>
            <div style={{ cursor: "pointer" }} className={styles.pCMainBlock}>
                <div className={styles.pcSpanBlock}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28 11.0328C28 8.3688 25.84 6.2168 23.184 6.2168H8.816C6.152 6.2168 4 8.3768 4 11.0328V18.5528C4 21.2168 6.16 23.3688 8.816 23.3688H20.056C20.848 23.3688 21.624 23.5288 22.352 23.8488L26.648 25.7128C27.288 25.9928 28 25.5208 28 24.8248V15.7528" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.064 11.8564C14.168 10.4484 15.96 9.88045 17 10.4724C17.496 10.7524 17.84 11.2884 17.92 11.8564C18.008 12.5044 17.704 13.0724 17.296 13.5604C16.472 14.5524 15.76 15.5124 16.032 16.8884" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 19.1992H16.008" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>

                    <span className={styles.categorySpan}>Help & FAQ</span>
                </div>
            </div>
        </div>
    );
}