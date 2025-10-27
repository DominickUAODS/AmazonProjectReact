import styles from './ProductListHeader.module.css'
import React from "react";
import type { OneProductProps } from "./OneProduct";
import { useNavigate } from 'react-router-dom';

interface ProductListHeaderProps {
  products: OneProductProps[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({ products, selectedIds, setSelectedIds }) => {
  const allChecked = selectedIds.length === products.length && products.length > 0;
  const navigate = useNavigate();

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCreate = () => {
		navigate(`/-/product-settings`);
	};

  return (
    <div className={styles.plHeader}>
      <div className={styles.productCheck}>
        <div className={styles.checkNamewoSvg}>
            <input
            type="checkbox"
            className={styles.checkbox}
            checked={allChecked}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            />
            <span className={styles.prName}>Product name</span>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1128 16.3809L12.5168 20.7909C12.2228 21.0729 11.7608 21.0729 11.4668 20.7909L6.88281 16.3869" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.1128 7.61955L12.5168 3.20955C12.2228 2.92755 11.7608 2.92755 11.4668 3.20955L6.88281 7.61355" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={styles.ratingPrice}>
        <span className={styles.prRat}>Rating</span>
        <span className={styles.prPrice}>Price</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"cursor":"pointer"}} onClick={handleCreate}>
            <path d="M12 2.96484V10.4588" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.9999 11.9648H13.5059" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 11.9648H10.494C11.328 11.9648 12 12.6368 12 13.4708V20.9648" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>


      </div>
    </div>
  );
};

export default ProductListHeader;