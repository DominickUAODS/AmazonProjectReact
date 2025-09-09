import type { ProductCategoryMain } from "../../types/ProductCategoryMain";
import styles from "./ProductCatalog.module.css";
import { useNavigate } from "react-router-dom";

export default function OneProductCategory({icon,name}:ProductCategoryMain){
    const navigate = useNavigate();

    return(
            <div className={styles.pCMainBlock}>
                <div className={styles.pcSpanBlock}>
                    <img src={icon}></img>
                    <span className={styles.categorySpan}>{name}</span>
                </div>
            </div>
    );
}