//import { useRef, useState } from 'react';
import { useEffect, useState } from 'react';
import styles from './LegalNoticeInfo.module.css'
import LegalNoticeTab from './LegalNoticeTab';
//import Terms from './Terms';
//import License from './License';
//import Policy from './Policy';
import { useNavigate } from 'react-router-dom';

// export default function LegalNoticeInfo() {
// 	const termsRef = useRef<HTMLDivElement>(null);
// 	const licenseRef = useRef<HTMLDivElement>(null);
// 	const policyRef = useRef<HTMLDivElement>(null);
// 	const [activeTab, setActiveTab] = useState<"terms" | "license" | "policy">("terms");

// 	const handleTabClick = (tab: "terms" | "license" | "policy") => {
// 		setActiveTab(tab);

// 		let element: HTMLDivElement | null = null;
// 		if (tab === "terms") element = termsRef.current;
// 		if (tab === "license") element = licenseRef.current;
// 		if (tab === "policy") element = policyRef.current;

// 		element?.scrollIntoView({ behavior: "smooth" });
// 	};

// 	return (
// 		<div className={styles.panel}>
// 			<LegalNoticeTab activeTab={activeTab} onTabClick={handleTabClick} />

// 			<div className={styles.tabContent}>
// 				<div ref={termsRef}>
// 					<Terms />
// 				</div>
// 				<div ref={licenseRef}>
// 					<License />
// 				</div>
// 				<div ref={policyRef}>
// 					<Policy />
// 				</div>
// 			</div>
// 		</div>
// 	)


// }

export default function LegalNoticeInfo({ children }: { children: React.ReactNode }) {
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (isMobile) {
		// На мобильном – показываем Back и контент без боковой панели
		return (
			<div className={styles.mobilePage}>
				<button className={styles.backBtn} onClick={() => navigate("/legal")}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.7501 2.87988L7.77605 11.1959C7.26605 11.7239 7.26605 12.5639 7.77605 13.0919L15.7501 21.3839"
							stroke="#4A7BD9"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Back
				</button>
				<div className={styles.mobileContent}>{children}</div>
			</div>
		);
	}

	return (
		<div className={styles.panel}>
			<LegalNoticeTab />
			<div className={styles.tabContent}>{children}</div>
		</div>
	);
}