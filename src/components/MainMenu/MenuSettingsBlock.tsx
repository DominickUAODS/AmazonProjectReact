import styles from "./ProductCatalog.module.css";

import { useNavigate } from "react-router-dom";


export default function MenuSettingsBlock(){
    const storedData = localStorage.getItem("user");
	const user = storedData ? JSON.parse(storedData) : null;
    const navigate = useNavigate();


    const openUserSettings = () => {
		navigate("/settings");

	};

    return(
        <div className={styles.productCatalog}>
            {!user ? null : (
            <div className={styles.pCMainBlock}  style={{ cursor: "pointer" }} onClick={openUserSettings}>
                <div className={styles.pcSpanBlock}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.904 5.60742H11.088C10.416 5.60742 9.79205 5.96742 9.45605 6.55142L4.55205 15.0474C4.21605 15.6314 4.21605 16.3514 4.55205 16.9354L9.45605 25.4314C9.79205 26.0154 10.416 26.3754 11.088 26.3754H20.904C21.576 26.3754 22.2 26.0154 22.536 25.4314L27.44 16.9354C27.776 16.3514 27.776 15.6314 27.44 15.0474L22.536 6.55142C22.2 5.96742 21.576 5.60742 20.904 5.60742Z" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.9999 19.6803C18.0324 19.6803 19.6799 18.0327 19.6799 16.0003C19.6799 13.9679 18.0324 12.3203 15.9999 12.3203C13.9675 12.3203 12.3199 13.9679 12.3199 16.0003C12.3199 18.0327 13.9675 19.6803 15.9999 19.6803Z" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <span className={styles.categorySpan}>Settings</span>

                </div>
            </div>
            )}

            <div style={{ cursor: "pointer" }} className={styles.pCMainBlock}>
                <div className={styles.pcSpanBlock}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28 11.0328C28 8.3688 25.84 6.2168 23.184 6.2168H8.816C6.152 6.2168 4 8.3768 4 11.0328V18.5528C4 21.2168 6.16 23.3688 8.816 23.3688H20.056C20.848 23.3688 21.624 23.5288 22.352 23.8488L26.648 25.7128C27.288 25.9928 28 25.5208 28 24.8248V15.7528" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.064 11.8564C14.168 10.4484 15.96 9.88045 17 10.4724C17.496 10.7524 17.84 11.2884 17.92 11.8564C18.008 12.5044 17.704 13.0724 17.296 13.5604C16.472 14.5524 15.76 15.5124 16.032 16.8884" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 19.1992H16.008" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>

                    <span className={styles.categorySpan}>Help & FAQ</span>
                </div>
            </div>
        </div>
    );
}