import { useNavigate, useLocation } from 'react-router-dom';
import styles from './DetailsBProductPage.module.css'

type Detail = {
    title: string;
    text: string;
  };
  
  export default function DetailsBProductPage({ details }: { details: Detail[] }) {
    return (
      <div className={styles.pdpp}>
        <span className={styles.pdMainSpan}>Product details</span>
  
        <div className={styles.detailsBlock}>
          {details.map((detail, index) => (
            <div key={index} className={styles.oneDetailBlock}>
              <span className={styles.oneDMainSpan}>{detail.title}</span>
              <span className={styles.oneDAddedSpan}>{detail.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }