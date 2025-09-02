import styles from "./ProductCatalog.module.css";
import commonStyles from '../common.module.css';
import { useNavigate } from "react-router-dom";
import type { ProductCategoryMain } from "../../types/ProductCategoryMain";
import OneProductCategory from "./OneProductCategory";
import { useState } from "react";
const pc:ProductCategoryMain[]=[
    {
        icon:"https://cdn-icons-png.flaticon.com/512/5390/5390264.png",
        name: "Fashion"
    },
    {
        icon:"https://cdn-icons-png.flaticon.com/512/5390/5390264.png",
        name: "Electronics"
    },
    {
        icon:"https://cdn-icons-png.flaticon.com/512/5390/5390264.png",
        name: "Household"
    },
    {
        icon:"https://cdn-icons-png.flaticon.com/512/5390/5390264.png",
        name: "Furniture"
    },
    {
        icon:"https://cdn-icons-png.flaticon.com/512/5390/5390264.png",
        name: "Electronics"
    },
    {
        icon:"https://cdn-icons-png.flaticon.com/512/5390/5390264.png",
        name: "Work tools"
    }

]

export default function ProductCatalog(){
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const visibleDetails = pc.slice(0, visibleCount);
    const hasMore = visibleCount < pc.length;
    const navigate = useNavigate();

    return(
        <div className={styles.productCatalog}>
            <div className={styles.pCMainBlock}>
                <div className={styles.pcSpanBlock}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.37606 4.27148H8.88006C6.18933 4.27148 4.00806 6.45275 4.00806 9.14348V9.63948C4.00806 12.3302 6.18933 14.5115 8.88006 14.5115H9.37606C12.0668 14.5115 14.2481 12.3302 14.2481 9.63948V9.14348C14.2481 6.45275 12.0668 4.27148 9.37606 4.27148Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26.12 4.27148H19.64C18.6017 4.27148 17.76 5.11319 17.76 6.15148V12.6315C17.76 13.6698 18.6017 14.5115 19.64 14.5115H26.12C27.1583 14.5115 28 13.6698 28 12.6315V6.15148C28 5.11319 27.1583 4.27148 26.12 4.27148Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.3681 17.4883H5.88806C4.84976 17.4883 4.00806 18.33 4.00806 19.3683V25.8483C4.00806 26.8866 4.84976 27.7283 5.88806 27.7283H12.3681C13.4064 27.7283 14.2481 26.8866 14.2481 25.8483V19.3683C14.2481 18.33 13.4064 17.4883 12.3681 17.4883Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23.128 17.4883H22.632C19.9413 17.4883 17.76 19.6696 17.76 22.3603V22.8563C17.76 25.547 19.9413 27.7283 22.632 27.7283H23.128C25.8187 27.7283 28 25.547 28 22.8563V22.3603C28 19.6696 25.8187 17.4883 23.128 17.4883Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <span className={styles.categorySpan}>Product catalog</span>
                </div>
                <div className={styles.arrowsSwitch} onClick={() => setIsOpen(prev => !prev)}>
                {isOpen ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.168 10.5808L8.62403 5.26477C8.27203 4.92477 7.71203 4.92477 7.36003 5.26477L1.83203 10.5808" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                ) : (

                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.168 5.8125L8.62403 11.1285C8.27203 11.4685 7.71203 11.4685 7.36003 11.1285L1.83203 5.8125" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                )}
                </div>

            </div>
            {isOpen &&( 
                <>
                    {visibleDetails.map((f, i) => (
                        <OneProductCategory
                            key={i}
                            name={f.name}
                            icon={f.icon}
                        />
                    ))}
                    {hasMore && (
                        <button className={`${commonStyles.secondaryButton} ${styles.seeAll}`}  onClick={() => setVisibleCount(prev => prev + 5)}>See all</button>
                    )}
                </>
            )}

        </div>
    );
}