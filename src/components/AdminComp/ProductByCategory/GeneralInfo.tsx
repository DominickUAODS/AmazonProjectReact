import type { ProductFromApi } from "./ProductCardAdmin";
import styles from "./GeneralInfo.module.css"
import commonStyles from "../../common.module.css";
import AllCategoriesDropDown from "../Products/AllCategoriesDropdown";
import { useEffect, useState } from "react";
type Props = {
    product: ProductFromApi | null;
    onCategoryChange: (categoryId: string) => void;
  };


export default function GeneralInfo({ product, onCategoryChange }: Props) {
    const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [category, setCategory] = useState("");
    const [price, setPrice] = useState<number>();
    const [discount, setDiscount] = useState<number>();
    const [number, setNumber] = useState<number>();
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryId, setCategoryId] = useState(product?.category_id || "");
    const handleCategoryChange = (newValue: string) => {
        setCategoryId(newValue);
        onCategoryChange(newValue);
    };


    useEffect(() => {
        if (product?.category_id) {
            console.log("[GeneralInfo] Загружаем имя категории по id:", product.category_id);
          fetch(`${import.meta.env.VITE_API_SERVER}/category/${product.category_id}`)
            .then((res) => {
              if (!res.ok) throw new Error("Category not found");
              return res.json();
            })
            .then((data) => {
                console.log("[GeneralInfo] Пришли данные категории:", data);
              setCategoryName(data.name); 
            })
            .catch((err) => {
                console.error("[GeneralInfo] Ошибка загрузки категории:", err);
              setCategoryName("Unknown category");
            });
        }
      }, [product?.category_id]);

      console.log(product)
      console.log(product?.name)

      console.log(categoryName)
      
	return (
        <div className={styles.genInfo}>
            <div className={styles.header}>
                <span>General information</span>
            </div>
           
			{/* Name */}
			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Name</legend>
				<input
					type="text"
					placeholder="Enter product name"
					value={product ? product.name : name}
					onChange={e => !product && setName(e.target.value)}
				/>
			</fieldset>


            <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Code</legend>
				<input
					type="text"
					placeholder="Enter product code"
					value={product ? product.code : code}
					onChange={e => !product && setCode(e.target.value)}
				/>
			</fieldset>
           

           {/* Category dropdown */}
			<AllCategoriesDropDown
				isLegend={true}
				my_value={product ? categoryName : category}
				onChange={handleCategoryChange}
			/>


            <div className={styles.photoBlock}>
                <div className={styles.photoInfo}>
                    <div className={styles.photoSpan}>
                        <span>Product display</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"cursor":"pointer"}}>
                            <path d="M11.9992 20.9632C16.9498 20.9632 20.9632 16.9498 20.9632 11.9992C20.9632 7.04848 16.9498 3.03516 11.9992 3.03516C7.04848 3.03516 3.03516 7.04848 3.03516 11.9992C3.03516 16.9498 7.04848 20.9632 11.9992 20.9632Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.1783 15.252L13.5723 15.708C12.6783 16.38 11.4063 15.744 11.4063 14.628V11.19C11.4063 11.028 11.2203 10.968 11.1003 11.076C10.6563 11.466 10.6983 11.556 9.82227 11.976" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.1927 9.05471C12.1207 9.34871 11.8747 9.58871 11.5807 9.65471C11.2567 9.72671 10.9567 9.61271 10.7647 9.39671C10.5967 9.20471 10.5187 8.94071 10.5787 8.65871C10.6447 8.35871 10.8847 8.11271 11.1787 8.04071C11.7967 7.89071 12.3367 8.43671 12.1927 9.05471Z" fill="#0E2042"/>
                        </svg>
                    </div>
                    <span className={styles.counter}>{product?.displays.length} / 10</span>
                </div>

                {!product ? (
                        <div className={styles.gallery}>
                            <div className={styles.addPhoto}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 5.92773V20.9157" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M41.9997 23.9277H27.0117" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 23.9277H20.988C22.656 23.9277 24 25.2717 24 26.9397V41.9277" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            
                        </div>
                    ):(
                        <div className={styles.gallery}>
                             {product?.displays?.map((url, index) => (
                                    <div
                                    key={index}
                                    className={styles.photoWrapper}
                                    style={{ width: 118, height: 118 }}
                                    >
                                    <img
                                        src={url}
                                        alt={`product-${index}`}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    </div>
                            ))}

                            <div className={styles.addPhoto}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 5.92773V20.9157" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M41.9997 23.9277H27.0117" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 23.9277H20.988C22.656 23.9277 24 25.2717 24 26.9397V41.9277" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    )}
            </div>

            <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Price, $</legend>
				<input
					type="text"
					placeholder="Enter product price"
					value={product ? product.price : price}
					onChange={e => !product && setPrice(Number(e.target.value))}
				/>
			</fieldset>

            <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Discount, %</legend>
				<input
					type="text"
					placeholder="Enter product discount"
					value={product ? product.discount : discount}
					onChange={e => !product && setDiscount(Number(e.target.value))}
				/>
			</fieldset>


            <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Number</legend>
				<input
					type="text"
					placeholder="Enter quantity of your product"
					value={product ? product.number : number}
					onChange={e => !product && setDiscount(Number(e.target.value))}
				/>
			</fieldset>
            

        </div>
    );
}
