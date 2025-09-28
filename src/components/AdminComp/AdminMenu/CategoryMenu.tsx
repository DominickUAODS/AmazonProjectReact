
import { useLocation, useNavigate } from "react-router-dom";
import prStyles from "../../MainMenu/ProductCatalog.module.css";




export default function CategoryMenu(){  
    const navigate = useNavigate(); 

    const openCategoryAdmin= () => {
		navigate('/-/admin-category');
	};

    const openCategoryUser = () => {
		navigate('/-/admin-panel');
	};

    const openCategoryProduct = () => {
		navigate('/-/admin-product');
	};

    return(
        <div className={prStyles.productCatalog}>
            <div style={{ cursor: "pointer" }} className={prStyles.pCMainBlock} onClick={openCategoryUser}>
                <div className={prStyles.pcSpanBlock}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4012 8.44805C12.9212 8.44805 14.1532 9.68005 14.1532 11.2C14.1532 12.72 12.9212 13.952 11.4012 13.952C9.88122 13.952 8.64922 12.72 8.64922 11.2C8.64922 9.68005 9.88122 8.44805 11.4012 8.44805ZM11.4012 7.24805C9.21722 7.24805 7.44922 9.01605 7.44922 11.2C7.44922 13.384 9.21722 15.152 11.4012 15.152C13.5852 15.152 15.3532 13.384 15.3532 11.2C15.3532 9.01605 13.5852 7.24805 11.4012 7.24805Z" fill="#0E2042"/>
                        <path d="M18.7443 24.7518C18.7443 21.9038 17.6243 18.5758 14.9763 17.1038C14.4403 16.8078 13.8403 16.5838 13.1763 16.4558C13.1763 16.4558 11.8163 16.0718 9.64027 16.4558C8.97627 16.5758 8.37627 16.7998 7.84027 17.1038C5.20027 18.5758 4.07227 21.9038 4.07227 24.7518" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.7196 10.0809C22.2396 10.0809 23.4716 11.3129 23.4716 12.8329C23.4716 14.3529 22.2396 15.5849 20.7196 15.5849C19.1996 15.5849 17.9676 14.3529 17.9676 12.8329C17.9676 11.3129 19.1996 10.0809 20.7196 10.0809ZM20.7196 8.88086C18.5356 8.88086 16.7676 10.6489 16.7676 12.8329C16.7676 15.0169 18.5356 16.7849 20.7196 16.7849C22.9036 16.7849 24.6716 15.0169 24.6716 12.8329C24.6716 10.6489 22.9036 8.88086 20.7196 8.88086Z" fill="#0E2042"/>
                        <path d="M18.9512 18.0886C21.1272 17.7046 22.4872 18.0886 22.4872 18.0886C23.1512 18.2166 23.7512 18.4406 24.2872 18.7366C26.4392 19.9366 27.5832 22.3606 27.9352 24.7526" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <span className={prStyles.categorySpan}>Users</span>
                </div>
            </div>

            <div style={{ cursor: "pointer" }} onClick = {openCategoryAdmin} className={prStyles.pCMainBlock}>
                <div className={prStyles.pcSpanBlock}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.37581 4.27148H8.87981C6.18908 4.27148 4.00781 6.45275 4.00781 9.14348V9.63948C4.00781 12.3302 6.18908 14.5115 8.87981 14.5115H9.37581C12.0665 14.5115 14.2478 12.3302 14.2478 9.63948V9.14348C14.2478 6.45275 12.0665 4.27148 9.37581 4.27148Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M26.1198 4.27148H19.6398C18.6015 4.27148 17.7598 5.11319 17.7598 6.15148V12.6315C17.7598 13.6698 18.6015 14.5115 19.6398 14.5115H26.1198C27.1581 14.5115 27.9998 13.6698 27.9998 12.6315V6.15148C27.9998 5.11319 27.1581 4.27148 26.1198 4.27148Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.3678 17.4883H5.88781C4.84952 17.4883 4.00781 18.33 4.00781 19.3683V25.8483C4.00781 26.8866 4.84952 27.7283 5.88781 27.7283H12.3678C13.4061 27.7283 14.2478 26.8866 14.2478 25.8483V19.3683C14.2478 18.33 13.4061 17.4883 12.3678 17.4883Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23.1278 17.4883H22.6318C19.941 17.4883 17.7598 19.6696 17.7598 22.3603V22.8563C17.7598 25.547 19.941 27.7283 22.6318 27.7283H23.1278C25.8185 27.7283 27.9998 25.547 27.9998 22.8563V22.3603C27.9998 19.6696 25.8185 17.4883 23.1278 17.4883Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                    <span className={prStyles.categorySpan}>Category</span>
                </div>
            </div>

            <div style={{ cursor: "pointer" }} className={prStyles.pCMainBlock} onClick={openCategoryProduct}>
                <div className={prStyles.pcSpanBlock}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.2086 12.6719H25.6086C27.1046 12.6719 28.2406 14.0319 27.9606 15.5039L25.8806 23.4079C25.6726 24.5439 24.6806 25.3679 23.5286 25.3679H8.47264C7.32064 25.3679 6.32864 24.5439 6.12064 23.4079L4.04064 15.5039C3.76864 14.0319 4.89663 12.6719 6.39263 12.6719H7.76064" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 12.6719H19.968" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.67188 14.2166C9.67188 10.0326 12.5039 6.64062 15.9999 6.64062C19.4959 6.64062 22.3279 10.0326 22.3279 14.2166" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


                    <span className={prStyles.categorySpan}>Products</span>
                </div>
            </div>

            <div style={{ cursor: "pointer" }} className={prStyles.pCMainBlock}>
                <div className={prStyles.pcSpanBlock}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.12 4H5.88C4.8417 4 4 4.8417 4 5.88V26.12C4 27.1583 4.8417 28 5.88 28H26.12C27.1583 28 28 27.1583 28 26.12V5.88C28 4.8417 27.1583 4 26.12 4Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.1517 6.29688V12.5929C19.1517 13.2969 18.3997 13.7369 17.7837 13.4009L16.4477 12.6649C16.1677 12.5129 15.8317 12.5129 15.5517 12.6649L14.2157 13.4009C13.5997 13.7369 12.8477 13.2969 12.8477 12.5929V6.29688" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.0489 23.8242H17.7129" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                    <span className={prStyles.categorySpan}>Orders</span>
                </div>
            </div>

            <div style={{ cursor: "pointer" }} className={prStyles.pCMainBlock}>
                <div className={prStyles.pcSpanBlock}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 11.0328C28 8.3688 25.84 6.2168 23.184 6.2168H8.816C6.152 6.2168 4 8.3768 4 11.0328V18.5528C4 21.2168 6.16 23.3688 8.816 23.3688H20.056C20.848 23.3688 21.624 23.5288 22.352 23.8488L26.648 25.7128C27.288 25.9928 28 25.5208 28 24.8248V15.7528" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.1442 18.2167C13.7922 18.4727 13.3122 18.1287 13.4482 17.7127L14.0242 15.9527C14.1042 15.7047 14.0242 15.4327 13.8082 15.2807L12.3122 14.1927C11.9602 13.9367 12.1442 13.3767 12.5762 13.3767H14.4322C14.6962 13.3767 14.9282 13.2087 15.0082 12.9607L15.5842 11.2007C15.7202 10.7847 16.3042 10.7847 16.4402 11.2007L17.0162 12.9607C17.0962 13.2087 17.3282 13.3767 17.5922 13.3767H19.4482C19.8882 13.3767 20.0642 13.9367 19.7122 14.1927L18.2162 15.2807C18.0082 15.4327 17.9202 15.7047 18.0002 15.9527L18.5762 17.7127C18.7122 18.1287 18.2322 18.4727 17.8802 18.2167L16.4722 17.0887C16.2562 16.9207 15.9602 16.9127 15.7442 17.0727L14.1762 18.2167H14.1442Z" fill="#0E2042" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                    <span className={prStyles.categorySpan}>Reviews</span>
                </div>
            </div>
          
        </div>
    );
}