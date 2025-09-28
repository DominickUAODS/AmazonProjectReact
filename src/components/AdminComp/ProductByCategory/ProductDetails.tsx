import type { ProductDetail, ProductFromApi } from "./ProductCardAdmin";
import styles from "./ProductDetails.module.css"
import commonStyles from "../../common.module.css";
import OnePropertyKey from "../Products/OnePropertyKey";
import OnePropertyKeyAdmin from "./OnePropertyKeyAdmin";
import { useEffect, useState } from "react";
type Props = {
    product: ProductFromApi | null;
    categoryId?: string;
  };
  
  export default function ProductDetails({ product, categoryId }: Props) {
    console.log("[ProductDetails] props:", { categoryId, product });
    const [propertyKeys, setPropertyKeys] = useState<string[]>([]);
    const [details, setDetails] = useState<ProductDetail[]>([]);
    const [nextIndex, setNextIndex] = useState(0);
    
  
    // грузим propertyKeys категории
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_SERVER}/category/${categoryId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("PD DATA", data)
            
            setPropertyKeys(data.propertyKeys || []);
            if (product) {
              setDetails(product.details || []);
              setNextIndex(product.details?.length || 0);
            } else {
              setDetails([]);
              setNextIndex(0);
            }
          });
      }, [categoryId, product])
  
    const handleAttributeChange = (index: number, value: string) => {
      setDetails((prev) =>
        prev.map((d, i) => (i === index ? { ...d, attribute: value } : d))
      );
    };
  
    const handleAddDetail = () => {
      if (nextIndex < propertyKeys.length) {
        setDetails((prev) => [
          ...prev,
          { propertyKey: propertyKeys[nextIndex], attribute: "" },
        ]);
        setNextIndex((prev) => prev + 1);
      }
    };
  
    return (
      <div className={styles.productDet}>
        <div className={styles.header}>
          <span>Product details</span>
        </div>
  
        <div className={styles.addProductDetail}>
          {details.map((detail, index) => (
            <OnePropertyKeyAdmin
              key={index}
              propertyKey={detail.propertyKey}
              attribute={detail.attribute}
              onAttributeChange={(val) => handleAttributeChange(index, val)}
            />
          ))}
  
          <button
            className={`${commonStyles.secondaryButton} ${styles.addDetailBtn}`}
            onClick={handleAddDetail}
            disabled={nextIndex >= propertyKeys.length}
          >
            <svg
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 3.95703V12.7"
                stroke="#4A7BD9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.5008 14.457H15.7578"
                stroke="#4A7BD9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 14.457H12.243C13.216 14.457 14 15.241 14 16.214V24.957"
                stroke="#4A7BD9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Add product detail</span>
          </button>
        </div>
      </div>
    );
  }
  