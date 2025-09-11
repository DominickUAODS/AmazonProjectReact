import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EmtyCategoryTree.module.css'
import img from "../../../../public/img/admin_panel_img.png";

export default function EmtyCategoryTree() {
	return (
		<div className={styles.emtyCategoryTree}>
            <img src={img}></img>
            <span>Subcategory not found</span>
		</div>
	);
}