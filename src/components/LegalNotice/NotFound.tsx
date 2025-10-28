import styles from './NotFound.module.css'
import img from "../../../public/img/404.png"
import commonStyles from '../common.module.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
	const navigate = useNavigate();

	const openMain = () => {
		navigate('/');
	};

	return (
		<div className={styles.notfound}>
			<div className={styles.notfound0}>
				<div className={styles.notfound_photo}>
					<img src={img}></img>
					<p>This page has gone fishing...</p>
				</div>
				<button className={`${commonStyles.nextStepButton} ${styles.mainPage}`} onClick={openMain}>Return to main page</button>
			</div>
		</div>
	)
}