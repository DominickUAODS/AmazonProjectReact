
import styles from './EditCreateProduct.module.css'
import cmStyles from '../Products/CategoriesPage.module.css'
import type { ProductFromApi } from './ProductCardAdmin';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuEditCreateProduct from './MenuEditCreateProduct';
import AboutProduct from './AboutProduct';
import GeneralInfo from './GeneralInfo';
import ProductDetails from './ProductDetails';






export default function EditCreateProduct() {
    const { id } = useParams();
	const [product, setProduct] = useState<ProductFromApi | null>(null);
    const [activeTab, setActiveTab] = useState<"general" | "details" | "about">("general");
    const generalRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined);


    useEffect(() => {
        if (!id) {
          setProduct(null);
          return;
        }
    
        fetch(`${import.meta.env.VITE_API_SERVER}/product/${id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Ошибка загрузки продукта");
            return res.json();
          })
          .then((data) => {
            console.log("[EditCreateProduct] Продукт с сервера:", data);
            setProduct(data);
            if (data.categoryId) {
              console.log("[EditCreateProduct] Устанавливаем categoryId:", data.category_id);
              setCategoryId(data.categoryId); 
            }
          })
          .catch((err) => {
            console.error("[EditCreateProduct] Ошибка при загрузке продукта:", err);
            setProduct(null);
          });
      }, [id]);
        

        const handleTabClick = (tab: "general" | "details" | "about") => {
            setActiveTab(tab);
        
            let element: HTMLDivElement | null = null;
            if (tab === "general") element = generalRef.current;
            if (tab === "details") element = detailsRef.current;
            if (tab === "about") element = aboutRef.current;
        
            element?.scrollIntoView({ behavior: "smooth" });
        };

	return (
        <div className={cmStyles.panel}>
            <MenuEditCreateProduct activeTab={activeTab} onTabClick={handleTabClick} />
            <div className={styles.tabContent}>
                <div ref={generalRef}>
                    <GeneralInfo product={product} onCategoryChange={setCategoryId} />
                </div>
                <div ref={detailsRef}>
                    <ProductDetails product={product} categoryId={categoryId} />
                </div>
                <div ref={aboutRef}>
                    <AboutProduct product={product} />
                </div>
            </div>
    </div>
	);
}