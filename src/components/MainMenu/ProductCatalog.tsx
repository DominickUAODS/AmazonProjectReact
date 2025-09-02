import styles from "./ProductCatalog.module.css";
import commonStyles from '../common.module.css';
import { useNavigate } from "react-router-dom";

export default function ProductCatalog(){
    const navigate = useNavigate();

    return(
        <div className={styles.productCatalog}>
          
        </div>
    );
}