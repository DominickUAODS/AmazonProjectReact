import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BreadCrumb.module.css'

export default function BreadCrumb() {
	
	return (
            <div className={styles.breadCrumbs}>
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1521 19.7929H6.28206C5.89806 19.7929 5.58606 19.6009 5.58606 19.3669V11.8789" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.414 11.8789V19.3669C18.414 19.6009 18.102 19.7929 17.718 19.7929H13.848" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 10.5648L12 5.05078L3 10.5648" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.848 14.6758H10.152V19.7938" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div>
                    <p>/ Fashion</p><p>/</p>
                </div>
                <div>
                    <p>Women`s fashion</p><p>/</p>
                </div>
                <div>
                    <p>Casual women`s clothing</p>
                </div>
            </div>
	);
}