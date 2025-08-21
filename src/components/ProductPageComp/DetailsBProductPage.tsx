import { useNavigate, useLocation } from 'react-router-dom';
import styles from './DetailsBProductPage.module.css'
import commonStyles from "../common.module.css";
import { useState, useRef, useEffect } from 'react';

type Detail = {
    title: string;
    text: string;
  };
  
  export default function DetailsBProductPage({ details }: { details: Detail[] }) {
    const [visibleCount, setVisibleCount] = useState(6);
    const visibleDetails = details.slice(0, visibleCount);
    const hasMore = visibleCount < details.length;

    return (
      <div className={styles.pdpp}>
        <span className={styles.pdMainSpan}>Product details</span>
  
        <div className={styles.detailsBlock}>
          {visibleDetails.map((detail, index) => (
            <div key={index} className={styles.oneDetailBlock}>
              <span className={styles.oneDMainSpan}>{detail.title}</span>
              <span className={styles.oneDAddedSpan}>{detail.text}</span>
            </div>
          ))}
        </div>
        {hasMore && (
                <button
                  className={`${commonStyles.secondaryButton} ${styles.seeMoreButton}`}
                  onClick={() => setVisibleCount(prev => prev + 5)}
                >
                  See more
                </button>
              )}
      </div>
    );
  }