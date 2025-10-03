import type { ProductDetail, ProductFromApi } from "./ProductCardAdmin";
import styles from "./ProductDetails.module.css"
import commonStyles from "../../common.module.css";
//import OnePropertyKey from "../Products/OnePropertyKey";
import OnePropertyKeyAdmin from "./OnePropertyKeyAdmin";
import { useEffect, useState } from "react";

type Props = {
	product: ProductFromApi | null;
	categoryId?: string;
};

export default function ProductDetails({ product, categoryId }: Props) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	//console.log("[ProductDetails] props:", { categoryId, product });
	const [propertyKeys, setPropertyKeys] = useState<ProductDetail[]>([]);
	const [details, setDetails] = useState<ProductDetail[]>([]);
	//const [nextIndex, setNextIndex] = useState(0);

	// грузим propertyKeys категории
	// useEffect(() => {
	// 	fetch(`${API_SERVER}/category/${categoryId}`)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log("PD DATA", data)

	// 			setPropertyKeys(data.propertyKeys || []);
	// 			if (product) {
	// 				setDetails(product.details || []);
	// 				setNextIndex(product.details?.length || 0);
	// 			} else {
	// 				setDetails([]);
	// 				setNextIndex(0);
	// 			}
	// 		});
	// }, [categoryId, product])

	useEffect(() => {
		if (!categoryId) return;

		fetch(`${API_SERVER}/category/${categoryId}`)
			.then((res) => res.json())
			.then((data) => {
				const keys = data.property_keys || [];
				setPropertyKeys(keys);
				
				if (product && product.details) {
					// ✅ Режим редактирования — тянем существующие детали
					setDetails(product.details);
				} else {
					// ✅ Новый продукт — создаём заготовки под propertyKeys
					setDetails(
						keys.map((k: ProductDetail) => ({
							property_key: k.property_key,
							property_key_id: k.property_key_id,
							attribute: "",
						}))
					);
				}
			});
	}, [API_SERVER, categoryId, product]);

	// const handleAttributeChange = (index: number, value: string) => {
	// 	setDetails((prev) =>
	// 		prev.map((d, i) => (i === index ? { ...d, attribute: value } : d))
	// 	);
	// };

	// const handlePropertyKeyChange = (index: number, key: string) => {
	// 	setDetails((prev) =>
	// 		prev.map((d, i) => (i === index ? { ...d, property_key: key } : d))
	// 	);
	// };

	// const handleAddDetail = () => {
	// 	if (nextIndex < propertyKeys.length) {
	// 		setDetails((prev) => [
	// 			...prev,
	// 			{ property_key: propertyKeys[nextIndex], attribute: "", property_key_id: "" },
	// 		]);
	// 		setNextIndex((prev) => prev + 1);
	// 	}
	// };

	// изменение атрибута
	const handleAttributeChange = (index: number, value: string) => {
		setDetails((prev) =>
			prev.map((d, i) => (i === index ? { ...d, attribute: value } : d))
		);
	};

	// изменение ключа
	const handlePropertyKeyChange = (index: number, keyId: string, keyName: string) => {
		setDetails(prev =>
			prev.map((d, i) => i === index ? { ...d, property_key_id: keyId, property_key: keyName } : d)
		);
	};

	// добавить новую строку (только для нового продукта или доп. ключей)
	const handleAddDetail = () => {
		setDetails((prev) => [
			...prev,
			{ property_key: "", property_key_id: "", attribute: "" },
		]);
	};

	// удалить строку
	const handleDeleteDetail = (index: number) => {
		setDetails(prev => prev.filter((_, i) => i !== index));
	};

	//console.log(`propertyKeys: ${propertyKeys[0]?.property_key}`)
	//console.log(`details: ${details[0]?.property_key}`)

	return (
		<div className={styles.productDet}>
			<div className={styles.header}>
				<span>Product details</span>
			</div>

			<div className={styles.addProductDetail}>
				{details.map((detail, index) => (

					<OnePropertyKeyAdmin
						// key={detail.property_key}
						// propertyKey={detail.property_key}
						// attribute={detail.attribute}
						// onAttributeChange={(val) => handleAttributeChange(index, val)}
						key={index}
						propertyKeyId={detail.property_key_id || ""}
						propertyKeyName={detail.property_key || ""}
						attribute={detail.attribute || ""}
						availableKeys={propertyKeys}
						onPropertyKeyChange={(id, name) => handlePropertyKeyChange(index, id, name)}
						onAttributeChange={(val) => handleAttributeChange(index, val)}
						onDelete={() => handleDeleteDetail(index)}
					/>

				))}

				<button
					className={`${commonStyles.secondaryButton} ${styles.addDetailBtn}`}
					onClick={handleAddDetail}
				//disabled={nextIndex >= propertyKeys.length}
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