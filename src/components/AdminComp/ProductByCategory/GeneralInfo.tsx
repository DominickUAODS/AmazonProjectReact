import type { ProductFromApi } from "./ProductCardAdmin";
import styles from "./GeneralInfo.module.css"
import commonStyles from "../../common.module.css";
import AllCategoriesDropDown from "../Products/AllCategoriesDropdown";
import { useEffect, useState } from "react";
import { generateCloudinarySignature, type CloudinaryParams } from "../../Helpers/Signature";

type Props = {
	product: ProductFromApi;
	onCategoryChange: (categoryId: string) => void;
	onChange: (patch: Partial<ProductFromApi>) => void;
};

export default function GeneralInfo({ product, onCategoryChange, onChange }: Props) {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
	const CLOUD_API = import.meta.env.VITE_CLOUD_API;
	const CLOUD_SECRET = import.meta.env.VITE_CLOUD_SECRET;
	//const [name, setName] = useState("");
	//const [code, setCode] = useState("");
	//const [category,] = useState("");
	//const [price, setPrice] = useState<number>(0);
	//const [discount, setDiscount] = useState<number>(0);
	//const [number, setNumber] = useState<number>(0);
	const [, setCategoryName] = useState<string>("");
	const [categoryId, setCategoryId] = useState(product.category_id || "");
	//const [, setFile] = useState<File | null>(null);
	const [, setUploading] = useState(false);
	//const [, setImage] = useState<string | undefined>(undefined);
	// const handleCategoryChange = (newValue: string) => {
	// 	setCategoryId(newValue);
	// 	onCategoryChange(newValue);
	// };

	// useEffect(() => {
	// 	if (product) {
	// 		setName(product.name ?? "");
	// 		setCode(product.code ?? "");
	// 		setPrice(product.price ?? 0);
	// 		setDiscount(product.discount ?? 0);
	// 		setNumber(product.number ?? 0);
	// 		setCategoryId(product.category_id || "");
	// 	}
	// }, [product]);

	useEffect(() => {
		if (product.category_id) {
			setCategoryId(product.category_id);
		}
	}, [product.category_id]);



	// console.log("categoryId")
	// console.log(categoryId)

	useEffect(() => {
		if (product?.category_id) {
			console.log("[GeneralInfo] Загружаем имя категории по id:", product.category_id);
			fetch(`${API_SERVER}/category/${product.category_id}`)
				.then((res) => {
					if (!res.ok) throw new Error("Category not found");
					return res.json();
				})
				.then((data) => {
					//console.log("[GeneralInfo] Пришли данные категории:", data);
					setCategoryName(data.name);
				})
				.catch((err) => {
					console.error("[GeneralInfo] Ошибка загрузки категории:", err);
					setCategoryName("Unknown category");
				});
		}
	}, [API_SERVER, product.category_id]);

	//console.log(product)
	//console.log(product?.name)

	//console.log(categoryName)

	const handleAddPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const files = Array.from(event.target.files);

			// проверяем лимит
			if ((product.displays?.length || 0) + files.length > 10) {
				console.error("Максимум можно загрузить 10 фото");
				event.target.value = "";
				return;
			}

			for (const file of files) {
				const timestamp = Math.floor(Date.now() / 1000);
				const publicId = crypto.randomUUID();

				const params: CloudinaryParams = { timestamp, public_id: publicId };
				const signature = generateCloudinarySignature(params, CLOUD_SECRET);

				const formData = new FormData();
				formData.append("file", file);
				formData.append("public_id", publicId);
				formData.append("timestamp", timestamp.toString());
				formData.append("api_key", CLOUD_API);
				formData.append("signature", signature);

				setUploading(true);

				try {
					const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
						{
							method: "POST",
							body: formData,
						}
					);

					if (!response.ok) throw new Error("Upload failed");

					const result = await response.json();

					// Добавляем фото в product.displays (учитываем редактирование)
					onChange({
						displays: [...(product.displays || []), result.secure_url],
					});
				} catch (err) {
					console.error("Ошибка загрузки:", err);
				} finally {
					setUploading(false);
				}
			}

			// очищаем input (иначе нельзя выбрать те же файлы снова)
			event.target.value = "";
		}
	};

	// утилита: вытаскиваем public_id из secure_url
	function getPublicIdFromUrl(url: string): string | null {
		try {
			const parts = url.split("/upload/");
			if (parts.length < 2) return null;

			// убираем версию (v123456) и расширение (.jpg)
			const afterUpload = parts[1].replace(/^v[0-9]+\//, "");
			return afterUpload.replace(/\.[^/.]+$/, "");
		} catch {
			return null;
		}
	}

	const handleRemovePhoto = async (index: number) => {
		if (!product?.displays) return;

		const imageUrl = product.displays[index];
		const publicId = getPublicIdFromUrl(imageUrl);

		if (!publicId) {
			console.error("Не удалось получить public_id для", imageUrl);
			return;
		}

		try {
			// 1. Удаляем локально из product.displays
			onChange({
				displays: product.displays.filter((_, i) => i !== index),
			});

			// 2. Подготавливаем подпись для Cloudinary
			const timestamp = Math.floor(Date.now() / 1000);
			const params: CloudinaryParams = { public_id: publicId, timestamp };
			const signature = generateCloudinarySignature(params, CLOUD_SECRET);

			const formData = new FormData();
			formData.append("public_id", publicId);
			formData.append("timestamp", timestamp.toString());
			formData.append("api_key", CLOUD_API);
			formData.append("signature", signature);

			// 3. Отправляем запрос на Cloudinary для удаления
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) throw new Error("Удаление из Cloudinary не удалось");

			const result = await response.json();
			console.log("✅ Результат удаления:", result);
		} catch (err) {
			console.error("Ошибка при удалении картинки:", err);
		}
	};

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
					value={product.name}
					onChange={(e) => onChange({ name: e.target.value })}
				/>
			</fieldset>


			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Code</legend>
				<input
					type="text"
					placeholder="Enter product code"
					value={product.code}
					onChange={(e) => onChange({ code: e.target.value })}
				/>
			</fieldset>


			{/* Category dropdown */}
			<AllCategoriesDropDown
				isLegend={true}
				my_value={categoryId}
				onChange={(value) => {
					setCategoryId(value);
					onCategoryChange(value);
				}}
			/>


			<div className={styles.photoBlock}>
				<div className={styles.photoInfo}>
					<div className={styles.photoSpan}>
						<span>Product display</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ "cursor": "pointer" }}>
							<path d="M11.9992 20.9632C16.9498 20.9632 20.9632 16.9498 20.9632 11.9992C20.9632 7.04848 16.9498 3.03516 11.9992 3.03516C7.04848 3.03516 3.03516 7.04848 3.03516 11.9992C3.03516 16.9498 7.04848 20.9632 11.9992 20.9632Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M14.1783 15.252L13.5723 15.708C12.6783 16.38 11.4063 15.744 11.4063 14.628V11.19C11.4063 11.028 11.2203 10.968 11.1003 11.076C10.6563 11.466 10.6983 11.556 9.82227 11.976" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M12.1927 9.05471C12.1207 9.34871 11.8747 9.58871 11.5807 9.65471C11.2567 9.72671 10.9567 9.61271 10.7647 9.39671C10.5967 9.20471 10.5187 8.94071 10.5787 8.65871C10.6447 8.35871 10.8847 8.11271 11.1787 8.04071C11.7967 7.89071 12.3367 8.43671 12.1927 9.05471Z" fill="#0E2042" />
						</svg>
					</div>
					<span className={styles.counter}>{product?.displays.length} / 10</span>
				</div>

				<div className={styles.gallery}>
					{product?.displays?.map((url, index) => (
						<div
							key={index}
							className={styles.photoWrapper}
							style={{ width: 118, height: 118, position: "relative" }}
						>
							<img
								src={url}
								alt={`product-${index}`}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
							<button
								type="button"
								onClick={() => handleRemovePhoto(index)}
								className={styles.deleteBtn}
							>
								X
							</button>
						</div>
					))}

					{/* Кнопка добавления только если фото < 10 */}
					{(product?.displays?.length || 0) < 10 && (
						<label className={styles.addPhoto}>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handleAddPhoto}
								style={{ display: "none" }}
							/>
							<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
								<path d="M24 5.9V20.9" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" />
								<path d="M42 23.9H27" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" />
								<path d="M6 23.9H21C22.7 23.9 24 25.2 24 26.9V41.9" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" />
							</svg>
						</label>
					)}
				</div>


			</div>

			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Price, $</legend>
				<input
					type="number"
					placeholder="Enter product price"
					value={product.price}
					onChange={(e) => onChange({ price: Number(e.target.value) })}
				/>
			</fieldset>

			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Discount, %</legend>
				<input
					type="number"
					placeholder="Enter product discount"
					value={product.discount}
					onChange={(e) => onChange({ discount: Number(e.target.value) })}
				/>
			</fieldset>

			<fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
				<legend>Number</legend>
				<input
					type="number"
					placeholder="Enter quantity of your product"
					value={product.number}
					onChange={(e) => onChange({ number: Number(e.target.value) })}
				/>
			</fieldset>

		</div>
	);
}
