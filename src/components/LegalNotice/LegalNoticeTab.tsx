// import styles from './LegalNoticeTab.module.css'

// type Props = {
// 	activeTab: "terms" | "license" | "policy";
// 	onTabClick: (tab: "terms" | "license" | "policy") => void;
// };

// export default function LegalNoticeTab({ activeTab, onTabClick }: Props) {
// 	return (
// 		<div className={styles.menu}>
// 			<span>Legal notice</span>
// 			<div className={styles.menuEditCreate}>
// 				<span
// 					className={activeTab === "terms" ? styles.active : ""}
// 					onClick={() => onTabClick("terms")}
// 				>Terms and Conditions</span>

// 				<span
// 					className={activeTab === "license" ? styles.active : ""}
// 					onClick={() => onTabClick("license")}
// 				>License agreement</span>

// 				<span
// 					className={activeTab === "policy" ? styles.active : ""}
// 					onClick={() => onTabClick("policy")}
// 				>Private Police</span>
// 			</div>
// 		</div>
// 	);
// }
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./LegalNoticeTab.module.css";

export default function LegalNoticeTab() {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(false);

	// Определяем мобильный или планшетный экран
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Если мобильная версия — показываем кнопку Back
	const BackButton = () => (
		<button className={styles.backBtn} onClick={() => navigate(-1)}>
			Back
		</button>
	);

	return (
		<div className={styles.menu}>
			{isMobile && <BackButton />}
			<span>Legal notice</span>
			<div className={styles.menuEditCreate}>
				<NavLink
					to="/legal/terms"
					end
					className={({ isActive }) => (isActive ? styles.active : "")}
					onClick={() => window.scrollTo(0, 0)}
				>
					Terms and Conditions
				</NavLink>

				<NavLink
					to="/legal/license"
					end
					className={({ isActive }) => (isActive ? styles.active : "")}
					onClick={() => window.scrollTo(0, 0)}
				>
					License agreement
				</NavLink>

				<NavLink
					to="/legal/policy"
					end
					className={({ isActive }) => (isActive ? styles.active : "")}
					onClick={() => window.scrollTo(0, 0)}
				>
					Private Policy
				</NavLink>
			</div>
		</div>
	);
}
