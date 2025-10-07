import { NavLink } from "react-router-dom";
import styles from "./LegalMenuMobile.module.css";

export default function LegalMenuMobile() {
	return (
		<div className={styles.menu}>
			<div className={styles.head}>Legal Notice</div>
			<div className={styles.menuList}>
				<NavLink to="/legal/terms" className={styles.item}>
					Terms and Conditions
				</NavLink>
				<NavLink to="/legal/license" className={styles.item}>
					License Agreement
				</NavLink>
				<NavLink to="/legal/policy" className={styles.item}>
					Privacy Policy
				</NavLink>
			</div>
		</div>
	);
}
