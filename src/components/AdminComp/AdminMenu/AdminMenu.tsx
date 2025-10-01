//import styles from "../AdminMenu.module.css";
import menuStyles from "../../MainMenu/MainMenu.module.css";
import commonStyles from '../../common.module.css';
import { useNavigate } from "react-router-dom";
import UserInMainMenu from "../../MainMenu/UserInMainMenu";
//import ProductCatalog from "../../MainMenu/ProductCatalog";
//import prStyles from "../../MainMenu/ProductCatalog.module.css";
//import MenuSettingsBlock from "../../MainMenu/MenuSettingsBlock";
import CategoryMenu from "./CategoryMenu";
import LogOut from "../../MainMenu/LogOut";


export default function AdminMenu({ background }: { background: Location }) {
	//const location = useLocation();
	const navigate = useNavigate();
	//const isMobile = window.innerWidth <= 768;

	const closeModal = () => {
		navigate(background.pathname || "/");
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div className={`${commonStyles.modalBackdrop} ${menuStyles.menuModal}`} onClick={handleBackdropClick}>
			<div className={menuStyles.menu}>
				<div className={menuStyles.menuInner}>
					<UserInMainMenu background={background} onClose={closeModal} />
					<CategoryMenu />
					<LogOut />
				</div>
			</div>
			<button className={menuStyles.openCloseMenu} onClick={closeModal}>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5.65601 3.55273L16.288 14.6407C16.968 15.3447 16.968 16.4647 16.288 17.1687L5.65601 28.2247" stroke="#4A7BD9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M15.2 3.76758L25.832 14.8556C26.512 15.5596 26.512 16.6796 25.832 17.3836L15.2 28.4396" stroke="#4A7BD9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</div>
	);
}