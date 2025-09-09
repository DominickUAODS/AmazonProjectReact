import { IconOptions } from "../../types/IconOptions";
import type { ProductCategoryMain } from "../../types/ProductCategoryMain";
import styles from "./ProductCatalog.module.css";
import { useNavigate } from "react-router-dom";

export default function OneProductCategory({icon,name}:ProductCategoryMain){
    const navigate = useNavigate();
    const my_icon = IconOptions.find(opt => opt.value == icon)?.icon; 


    return(
            <div className={styles.pCMainBlock}>
                <div className={styles.pcSpanBlock}>
                    {my_icon && <span>{my_icon}</span>}
                    <span className={styles.categorySpan}>{name}</span>
                </div>
            </div>
    );
}