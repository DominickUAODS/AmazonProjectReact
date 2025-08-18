import styles from './SettingsInfo.module.css'





export default function SettingsInfo() {
	return (
		<div className={styles.setInfoBlock}>
            <div className={styles.setInfoText}>
                <p className={styles.setInfoMain}>
                    Image requirements
                </p>
                <div className={styles.setInfoTextBlck}>
                    <p>
                        Please note that the uploaded image must meet the following requirements:
                    </p>
                    <ul>
                        <li>Maximum file size: 5 MB</li>
                        <li>Acceptable formats: JPEG, PNG</li>
                    </ul>
                    <p>
                        Images exceeding this size or in other formats will not be accepted.
                        Please ensure your files are optimized and comply with the specified parameters.
                    </p>
                </div>
            </div>
		
		</div>
	);
}