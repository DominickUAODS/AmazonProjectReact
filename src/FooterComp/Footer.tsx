
import styles from './Footer.module.css'
import PreFooterComp from './PreFooterComp';
import UnFooterComp from './UnFooterComp';

export default function Footer() {
	return (
		<div className={styles.footer}>
            <PreFooterComp/>
            <UnFooterComp/>
		</div>
	);
}