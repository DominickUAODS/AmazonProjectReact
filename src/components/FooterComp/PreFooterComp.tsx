import { Link } from 'react-router-dom';
import styles from './PreFooterComp.module.css'

export default function PreFooterComp() {
	return (
		<div className={styles.preFooterCont}>
			<div className={styles.footerContent}>
				<div className={styles.fcBlok1}>
					<div className={styles.blockTitle}>
						<p>
							Support
						</p>
					</div>
					<div className={styles.blockInfo}>
						<p>
							Contact us
						</p>
						<p>
							FAQ
						</p>
					</div>
				</div>
				<div className={styles.fcBlok2}>
					<div className={styles.blockTitle}>
						<Link to="/legal" className={styles.link} onClick={() => window.scrollTo(0, 0)}>Legal Notice</Link>
					</div>
					<div className={styles.blockInfo}>
						<Link to="/legal/terms" className={styles.link} onClick={() => window.scrollTo(0, 0)}>Terms and Conditions</Link>
						<Link to="/legal/license" className={styles.link} onClick={() => window.scrollTo(0, 0)}>License agreement</Link>
						<Link to="/legal/policy" className={styles.link} onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
					</div>
				</div>
				<div className={styles.fcBlok3}>
					<div className={styles.blockTitle}>
						<p>
							Social media
						</p>
					</div>
					<div className={styles.socialMediaIcons}>
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20.2719 19.2245V26.8645C20.2719 27.4885 19.7759 28.0005 19.1679 28.0005H17.7359C17.1279 28.0005 16.6319 27.4885 16.6319 26.8645V20.0485C16.6319 19.6325 16.3039 19.2885 15.8959 19.2885H14.5359C13.9279 19.2885 13.4319 18.7765 13.4319 18.1525V16.9205C13.4319 16.2965 13.9279 15.7845 14.5359 15.7845H15.8959C16.3039 15.7845 16.6319 15.4485 16.6319 15.0245V14.3685C16.6319 13.1845 16.4959 11.9925 16.9919 10.8805C17.4079 9.94451 18.1679 9.21651 19.0719 8.79251C20.1759 8.26451 21.3679 8.25651 22.5599 8.28051C23.1599 8.29651 23.6479 8.80051 23.6479 9.41651V10.3125C23.6479 10.8805 23.2399 11.3525 22.6959 11.4325C22.6079 11.4485 22.5119 11.4645 22.4239 11.4725C21.8799 11.5685 21.3039 11.7365 20.8719 12.1045C20.3199 12.5765 20.2319 13.2725 20.2079 13.9685C20.1919 14.3285 20.2159 14.6885 20.2399 15.0565C20.2639 15.4565 20.5839 15.7685 20.9759 15.7685H22.2159C22.8959 15.7685 23.4159 16.3925 23.3119 17.0885L22.9119 19.6565" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M13.7761 27.9822H9.92006C6.65606 27.9822 4.00806 25.3342 4.00806 22.0702V9.91016" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M9.91992 4H22.0799C25.3439 4 27.9919 6.648 27.9919 9.912V22.072" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11.696 20.9219L5.51196 27.9859" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M26.488 4.01562L20.48 10.8796" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M7.37595 4.01562H9.99995C10.488 4.01562 10.952 4.25563 11.232 4.65563L25.848 25.6316C26.544 26.6236 25.832 27.9836 24.616 27.9836H21.96C21.472 27.9836 21.008 27.7436 20.728 27.3436L6.15195 6.36762C5.46395 5.37562 6.17595 4.01562 7.38395 4.01562H7.37595Z" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>

						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_6537_20002)">
								<path d="M9.92041 4H22.0884C25.3604 4 28.0084 6.648 28.0084 9.92V22.088" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M22.0799 27.9982H9.91194C6.63994 27.9982 3.99194 25.3502 3.99194 22.0782V9.91016" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M16.0001 21.5368C19.0576 21.5368 21.5361 19.0583 21.5361 16.0008C21.5361 12.9434 19.0576 10.4648 16.0001 10.4648C12.9427 10.4648 10.4641 12.9434 10.4641 16.0008C10.4641 19.0583 12.9427 21.5368 16.0001 21.5368Z" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M24.5359 9.03274C24.4239 9.48874 24.0479 9.86474 23.5919 9.96074C23.0879 10.0727 22.6239 9.89674 22.3279 9.56074C22.0719 9.26474 21.9439 8.85674 22.0399 8.41674C22.1439 7.95274 22.5119 7.57674 22.9759 7.46474C23.9359 7.23274 24.7759 8.07274 24.5439 9.03274H24.5359Z" fill="#F2F4F8" />
							</g>
							<defs>
								<clipPath id="clip0_6537_20002">
									<rect y="32" width="32" height="32" rx="3.0303" transform="rotate(-90 0 32)" fill="white" />
								</clipPath>
							</defs>
						</svg>

						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_6537_20008)">
								<path d="M28 14.9609V23.2489C28 24.3049 27.128 25.1609 26.072 25.1369L22.7601 25.0649C22.5361 25.0649 22.3521 24.8729 22.3521 24.6489V19.6809" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M28 11.6405L22.072 16.2245L16.216 20.7125C16.088 20.8085 15.912 20.8085 15.784 20.7125L9.928 16.2245L4 11.9525V9.38449C4 7.36849 6.304 6.22449 7.912 7.44049L15.784 13.4165C15.912 13.5125 16.088 13.5125 16.208 13.4165L24.08 7.44049C25.688 6.22449 27.992 7.36849 27.992 9.38449V11.6405H28Z" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9.648 19.6892V24.6572C9.648 24.8812 9.464 25.0652 9.24 25.0732L5.928 25.1452C4.872 25.1692 4 24.3132 4 23.2572V15.2812" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</g>
							<defs>
								<clipPath id="clip0_6537_20008">
									<rect y="32" width="32" height="32" rx="3.0303" transform="rotate(-90 0 32)" fill="white" />
								</clipPath>
							</defs>
						</svg>

						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_6537_20013)">
								<path d="M12.616 19.3421C12.616 19.9341 13.312 20.2621 13.768 19.8861L15.032 18.8381C15.272 18.6381 15.608 18.6221 15.872 18.7981L20.144 21.6461C20.568 21.9261 21.144 21.6781 21.224 21.1741L22.84 11.4701C22.976 10.6541 22.168 10.0061 21.4 10.3181L9.57597 15.1581C8.95997 15.4141 9.00797 16.3021 9.64797 16.4861L12.304 17.2461C12.504 17.3021 12.712 17.2701 12.888 17.1581L17.048 14.3821" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M22.0799 27.9982H9.91194C6.63994 27.9982 3.99194 25.3502 3.99194 22.0782V9.91016" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9.91992 4H22.0879C25.3599 4 28.0079 6.648 28.0079 9.92V22.088" stroke="#F2F4F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</g>
							<defs>
								<clipPath id="clip0_6537_20013">
									<rect y="32" width="32" height="32" rx="3.0303" transform="rotate(-90 0 32)" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}