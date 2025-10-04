// import type { ProductDetail } from "./ProductCardAdmin";
// import styles from "./ProductDetails.module.css"
// import commonStyles from "../../common.module.css";
// import OnePropertyKeyAdmin from "./OnePropertyKeyAdmin";
// import { useEffect, useState } from "react";

// type Props = {
// 	details: ProductDetail[];
// 	categoryId?: string;
// 	onChange: (details: ProductDetail[]) => void;
// };

// export default function ProductDetails({ details, categoryId, onChange }: Props) {
// 	const API_SERVER = import.meta.env.VITE_API_SERVER;
// 	//console.log("[ProductDetails] props:", { categoryId, product });
// 	const [propertyKeys, setPropertyKeys] = useState<ProductDetail[]>([]);
// 	//const [details, setDetails] = useState<ProductDetail[]>([]);
// 	//const [nextIndex, setNextIndex] = useState(0);

// 	// грузим propertyKeys категории
// 	// useEffect(() => {
// 	// 	fetch(`${API_SERVER}/category/${categoryId}`)
// 	// 		.then((res) => res.json())
// 	// 		.then((data) => {
// 	// 			console.log("PD DATA", data)

// 	// 			setPropertyKeys(data.propertyKeys || []);
// 	// 			if (product) {
// 	// 				setDetails(product.details || []);
// 	// 				setNextIndex(product.details?.length || 0);
// 	// 			} else {
// 	// 				setDetails([]);
// 	// 				setNextIndex(0);
// 	// 			}
// 	// 		});
// 	// }, [categoryId, product])

// 	useEffect(() => {
// 		if (!categoryId) return;

// 		fetch(`${API_SERVER}/category/${categoryId}`)
// 			.then((res) => res.json())
// 			.then((data) => {
// 				const keys = data.property_keys || [];
// 				setPropertyKeys(keys);

// 				if (details.length > 0) {
// 					// ✅ Режим редактирования — тянем существующие детали
// 					//setDetails(product.details);
// 					onChange(details);
// 				} else {
// 					// ✅ Новый продукт — создаём заготовки под propertyKeys
// 					const initialDetails = keys.map((k: ProductDetail) => ({
// 						property_key: k.property_key,
// 						property_key_id: k.property_key_id,
// 						attribute: "",
// 					}));
// 					//setDetails(initialDetails);
// 					onChange(initialDetails);
// 				}
// 			});

// 	}, [API_SERVER, categoryId, details, onChange]);

// 	// const handleAttributeChange = (index: number, value: string) => {
// 	// 	setDetails((prev) =>
// 	// 		prev.map((d, i) => (i === index ? { ...d, attribute: value } : d))
// 	// 	);
// 	// };

// 	// const handlePropertyKeyChange = (index: number, key: string) => {
// 	// 	setDetails((prev) =>
// 	// 		prev.map((d, i) => (i === index ? { ...d, property_key: key } : d))
// 	// 	);
// 	// };

// 	// const handleAddDetail = () => {
// 	// 	if (nextIndex < propertyKeys.length) {
// 	// 		setDetails((prev) => [
// 	// 			...prev,
// 	// 			{ property_key: propertyKeys[nextIndex], attribute: "", property_key_id: "" },
// 	// 		]);
// 	// 		setNextIndex((prev) => prev + 1);
// 	// 	}
// 	// };

// 	//const details = product.details ?? [];

// 	// Обновление ключа
// 	const handlePropertyKeyChange = (index: number, key: string, keyId?: string) => {
// 		const updated = [...details];
// 		updated[index] = { ...updated[index], property_key: key, property_key_id: keyId };
// 		//setDetails(updated);
// 		onChange(updated);
// 	};

// 	// Обновление значения
// 	const handleAttributeChange = (index: number, val: string) => {
// 		const updated = [...details];
// 		updated[index] = { ...updated[index], attribute: val };
// 		//setDetails(updated);
// 		onChange(updated);
// 	};

// 	// Добавление новой строки
// 	const handleAddDetail = () => {
// 		const updated = [...details, { property_key: "", property_key_id: "", attribute: "" }];
// 		//setDetails(updated);
// 		onChange(updated);
// 	};

// 	// Удаление строки
// 	const handleDeleteDetail = (index: number) => {
// 		const updated = details.filter((_, i) => i !== index);
// 		//setDetails(updated);
// 		onChange(updated);
// 	};

// 	//console.log(`propertyKeys: ${propertyKeys[0]?.property_key}`)
// 	//console.log(`details: ${details[0]?.property_key}`)

// 	return (
// 		<div className={styles.productDet}>
// 			<div className={styles.header}>
// 				<span>Product details</span>
// 			</div>

// 			<div className={styles.addProductDetail}>
// 				{details.map((detail, index) => (

// 					<OnePropertyKeyAdmin
// 						// key={detail.property_key}
// 						// propertyKey={detail.property_key}
// 						// attribute={detail.attribute}
// 						// onAttributeChange={(val) => handleAttributeChange(index, val)}
// 						key={index}
// 						propertyKeyId={detail.property_key_id || ""}
// 						propertyKeyName={detail.property_key || ""}
// 						attribute={detail.attribute || ""}
// 						availableKeys={propertyKeys}
// 						onPropertyKeyChange={(id, name) => handlePropertyKeyChange(index, id, name)}
// 						onAttributeChange={(val) => handleAttributeChange(index, val)}
// 						onDelete={() => handleDeleteDetail(index)}
// 					/>

// 				))}

// 				<button
// 					className={`${commonStyles.secondaryButton} ${styles.addDetailBtn}`}
// 					onClick={handleAddDetail}
// 				//disabled={nextIndex >= propertyKeys.length}
// 				>
// 					<svg
// 						width="28"
// 						height="29"
// 						viewBox="0 0 28 29"
// 						fill="none"
// 						xmlns="http://www.w3.org/2000/svg"
// 					>
// 						<path
// 							d="M14 3.95703V12.7"
// 							stroke="#4A7BD9"
// 							strokeWidth="1.5"
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 						/>
// 						<path
// 							d="M24.5008 14.457H15.7578"
// 							stroke="#4A7BD9"
// 							strokeWidth="1.5"
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 						/>
// 						<path
// 							d="M3.5 14.457H12.243C13.216 14.457 14 15.241 14 16.214V24.957"
// 							stroke="#4A7BD9"
// 							strokeWidth="1.5"
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 						/>
// 					</svg>
// 					<span>Add product detail</span>
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

import type { ProductDetail } from "./ProductCardAdmin";
import styles from "./ProductDetails.module.css";
import commonStyles from "../../common.module.css";
import OnePropertyKeyAdmin from "./OnePropertyKeyAdmin";
import { useEffect, useState } from "react";

type Props = {
	/** Исходные детали (при редактировании) — если пустой массив или не передан, будет создан набор по property_keys категории */
	details?: ProductDetail[];
	categoryId?: string;
	/** Вызывается при любом изменении массива деталей */
	onChange: (details: ProductDetail[]) => void;
};

export default function ProductDetails({ details = [], categoryId, onChange }: Props) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [availableKeys, setAvailableKeys] = useState<ProductDetail[]>([]);
	const [localDetails, setLocalDetails] = useState<ProductDetail[]>(details);

	// 1) Если родитель передаёт новые details извне — синхронизируем локально
	useEffect(() => {
		setLocalDetails(details ?? []);
	}, [details]);

	// 2) При смене категории грузим property_keys. Если у нас нет details от родителя — инициализируем по ключам.
	useEffect(() => {
		if (!categoryId) {
			setAvailableKeys([]);
			// если категория убрана — очищаем детали (по желанию можно не очищать)
			// setLocalDetails([]);
			return;
		}

		let cancelled = false;

		fetch(`${API_SERVER}/category/${categoryId}`)
			.then((res) => {
				if (!res.ok) throw new Error(`Category fetch failed: ${res.status}`);
				return res.json();
			})
			.then((data) => {
				if (cancelled) return;
				const keys: ProductDetail[] = data.property_keys || [];
				setAvailableKeys(keys);

				// Если у нас уже есть детали (детали пришли из props) — оставляем их
				if (details && details.length > 0) {
					setLocalDetails(details);
					onChange(details);
					return;
				}

				// Иначе — инициализируем массив деталей по ключам категории
				const initial = keys.map((k) => ({
					property_key: k.property_key ?? "",
					property_key_id: k.property_key_id ?? "",
					attribute: "",
				}));
				setLocalDetails(initial);
				onChange(initial);
			})
			.catch((err) => {
				console.error("[ProductDetails] fetch category property_keys error:", err);
			});

		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [API_SERVER, categoryId]); // намеренно не кладём details/onChange в deps, чтобы не зациклить

	// helper: обновить локальный массив и прокинуть наверх
	const updateAndNotify = (updated: ProductDetail[]) => {
		setLocalDetails(updated);
		onChange(updated);
	};

	const handlePropertyKeyChange = (index: number, keyId: string, keyName: string) => {
		const updated = localDetails.map((d, i) =>
			i === index ? { ...d, property_key_id: keyId ?? "", property_key: keyName ?? "" } : d
		);
		updateAndNotify(updated);
	};

	const handleAttributeChange = (index: number, val: string) => {
		const updated = localDetails.map((d, i) => (i === index ? { ...d, attribute: val } : d));
		updateAndNotify(updated);
	};

	const handleAddDetail = () => {
		const updated = [...localDetails, { property_key: "", property_key_id: "", attribute: "" }];
		updateAndNotify(updated);
	};

	const handleDeleteDetail = (index: number) => {
		const updated = localDetails.filter((_, i) => i !== index);
		updateAndNotify(updated);
	};

	return (
		<div className={styles.productDet}>
			<div className={styles.header}>
				<span>Product details</span>
			</div>

			<div className={styles.addProductDetail}>
				{localDetails.map((detail, index) => (
					<OnePropertyKeyAdmin
						key={`${detail.property_key_id || "new"}-${index}`}
						propertyKeyId={detail.property_key_id ?? ""}
						propertyKeyName={detail.property_key ?? ""}
						attribute={detail.attribute ?? ""}
						availableKeys={availableKeys}
						onPropertyKeyChange={(id, name) => handlePropertyKeyChange(index, id, name)}
						onAttributeChange={(val) => handleAttributeChange(index, val)}
						onDelete={() => handleDeleteDetail(index)}
					/>
				))}

				<button
					className={`${commonStyles.secondaryButton} ${styles.addDetailBtn}`}
					type="button"
					onClick={handleAddDetail}
				>
					<svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14 3.95703V12.7" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M24.5008 14.457H15.7578" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M3.5 14.457H12.243C13.216 14.457 14 15.241 14 16.214V24.957" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<span>Add product detail</span>
				</button>
			</div>
		</div>
	);
}
