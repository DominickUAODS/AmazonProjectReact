import { IconOptions } from "../../types/IconOptions";
import type { ProductCategoryMain } from "../../types/ProductCategoryMain";
import styles from "./ProductCatalog.module.css";
import { useNavigate } from "react-router-dom";
interface OneProductCategoryProps extends ProductCategoryMain {
    id: string; 
  }

  

export default function OneProductCategory({icon,name,id}:OneProductCategoryProps){
    const navigate = useNavigate();
    const my_icon = IconOptions.find(opt => opt.value == icon)?.icon; 
    
    const handleClick = () => {
        navigate(`/products/${id}`);
      };

    return(
            <div className={styles.pCMainBlock}  onClick={handleClick} style={{ cursor: "pointer" }}>
                <div className={styles.pcSpanBlock}>
                    {my_icon && <span>{my_icon}</span>}
                    <span className={styles.categorySpan}>{name}</span>
                </div>
            </div>
    );
}