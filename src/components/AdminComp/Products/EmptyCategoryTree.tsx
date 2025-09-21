import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EmtyCategoryTree.module.css'
import img from "../../../../public/img/admin_panel_img.png";

export default function EmtyCategoryTree({ spanTitle }: { spanTitle: string }) {
	return (
		<div className={styles.emtyCategoryTree}>
            <img src={img}></img>
            <span>{spanTitle}</span>
		</div>
	);
}