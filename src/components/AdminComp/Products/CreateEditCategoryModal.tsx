import React, { useEffect, useState } from "react";
import styles from "./CreateEditCategoryModal.module.css";
import commonStyles from '../../common.module.css';
import { IconOptions, type IconOption } from "../../../types/IconOptions";
import type { CategoryFormData } from "./CategoriesPage";
import type { Category } from "../../../types/Category";
import { generateCloudinarySignature, type CloudinaryParams } from "../../Helpers/Signature";
import AllCategoriesDropDown from "./AllCatgoriesDropdown";
import OnePropertyKey from "./OnePropertyKey";
import type { PropertyKeyType } from "../../../types/PropertyCase";

interface CreateEditCategoryModalProps {
	show: boolean;
	onClose: () => void;
	onCreate: (data: CategoryFormData) => void;
	category?: Category | null; 
	parentId?: string | null;
}

const CreateEditCategoryModal: React.FC<CreateEditCategoryModalProps> = ({ show, onClose, onCreate,category, parentId }) => {
	const [name, setName] = useState("");
	const [status, setStatus] = useState(true);
	const [description, setDescription] = useState("");
	const [selected, setSelected] = useState<IconOption>(IconOptions[0]); 
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState<string | undefined>(undefined);
	const [fullCategory, setFullCategory] = useState<Category | null>(null);
	const [parentName, setParentName] = useState<string | null>(null);
	const [infoBlockOpen,setInfoBlockOpen] = useState<boolean>(false);
	const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
	const CLOUD_API = import.meta.env.VITE_CLOUD_API;
	const CLOUD_SECRET = import.meta.env.VITE_CLOUD_SECRET;
	const isSubcategory = !!category?.parent_id;
	const [propertyKeys, setPropertyKeys] = useState<PropertyKeyType[]>([]);




	const addPropertyKey = () => {
		setPropertyKeys(prev => [...prev, { name: "" }]);
	};

	useEffect(() => {
		const fetchCategoryDetails = async () => {
		  if (!category) {
			// создание
			setFullCategory(null);
			setName("");
			setDescription("");
			setStatus(true);
			setImage(undefined);
			setSelected(IconOptions[0]);
			setParentName(null);
			setPropertyKeys([]);
			return;
		  }
	  
		  try {
			const response = await fetch(`${import.meta.env.VITE_API_SERVER}/category/${category.id}`);
			const data: Category = await response.json();
			console.log("Create/Edit modal propKeys", data.property_keys)
			setFullCategory(data);
	  
			// parent name
			if (data.parent_id) {
			  const parentRes = await fetch(`${import.meta.env.VITE_API_SERVER}/category/${data.parent_id}`);
			  const parentData: Category = await parentRes.json();
			  setParentName(parentData.name);
			} else {
			  setParentName(null);
			}
	  
			// выставляем значения в поля
			setName(data.name || "");
			setDescription(data.description || "");
			setStatus(data.is_active ?? true);
			setImage(data.image || undefined);
			
			setPropertyKeys(
				(data.property_keys || []).map(pk => 
				  typeof pk === "string" ? { name: pk } : pk
				)
			  );
			  
	  
			const foundIcon = IconOptions.find(opt => opt.value === data.icon);
			if (foundIcon) {
			  setSelected(foundIcon);
			} else {
			  setSelected(IconOptions[0]);
			}
	  
			console.log("Category details fetched:", data);
		  } catch (err) {
			console.error("Ошибка загрузки деталей категории:", err);
		  }
		};
	  
		fetchCategoryDetails();
	  }, [category, show, category?.id]);

	
	const handleSelect = (option: IconOption) => {
	  setSelected(option);
	  setOpen(false);
	};
  

	const handleSubmit = () => {
		if (name.trim()) {
			onCreate({
				name,
				description,
				isActive: status,
				icon: selected.value,
				parentId:  category ? category?.parent_id ?? null : parentId,
				image,
			  });
			onClose();
		}
	};

	if (!show) return null;

	console.log("PK", propertyKeys)

	const getLabels = () => {
		if (category) {
		  // редактирование
		  return category.parent_id
			? { title: "Edit subcategory", button: "Save changes" }
			: { title: "Edit category", button: "Save changes" };
		} else {
		  // создание
		  return parentId
			? { title: "Create subcategory", button: "Create subcategory" }
			: { title: "Create category", button: "Create category" };
		}
	  };


	const { title: mainTitle, button: actionButton } = getLabels();

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
		  const selectedFile = event.target.files[0];
		  setFile(selectedFile);

		  const timestamp = Math.floor(Date.now() / 1000);
		  const publicId = crypto.randomUUID(); 
		
		  const params: CloudinaryParams = { timestamp, public_id: publicId };
		  const signature = generateCloudinarySignature(params, CLOUD_SECRET);
		
		  const formData = new FormData();
		  formData.append('file', selectedFile);
		  formData.append('public_id', publicId);
		  formData.append('timestamp', timestamp.toString());
		  formData.append('api_key', CLOUD_API);
		  formData.append('signature', signature);
		
		  setUploading(true);
		
		  try {
			const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
			  method: 'POST',
			  body: formData,
			});
		
			if (!response.ok) throw new Error('Upload failed');
		
			const result = await response.json();
			setImage(result.secure_url); 
			setFile(null);
			setUploading(false);
		  } catch (err) {
			console.error(err);
			setUploading(false);
		  }
		}
	  };

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.title}>{mainTitle}</div>
				<div className={styles.borderBottom}></div>
				<div className={styles.createCategoryBlock}>
					<div className={styles.mainBlockCreation}>
						
						<div className={styles.addImageButton}>
							{image ? (
								<img src={image} alt="Category" className={styles.imagePreview} />
							) : (
								<label htmlFor="categoryFile" className={styles.svgUploadLabel}>
								<svg
									width="64"
									height="64"
									viewBox="0 0 64 64"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={styles.uploadSvg}
								>
									<path d="M32 7.9043V27.8883" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M56.0016 31.9043H36.0176" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M8 31.9043H27.984C30.208 31.9043 32 33.6963 32 35.9203V55.9043" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
								<input
									id="categoryFile"
									type="file"
									onChange={handleFileChange}
									style={{ display: 'none' }}
								/>
								</label>
							)}
						</div>
						<div className={styles.nis}>
							<div className={styles.nameIcons}>
								<div className={styles.pickIcon}>
									
									<div
										onClick={() => setOpen(!open)}
										className={styles.selectButton}
									>
										{selected.icon}
									</div>
									<div className={styles.arrowSvg} onClick={() => setOpen(!open)}>
										{open ? (
											<svg
											width="16"
											height="17"
											viewBox="0 0 16 17"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											>
											<path
												d="M14.168 6.3125L8.62403 11.6285C8.27203 11.9685 7.71203 11.9685 7.36003 11.6285L1.83203 6.3125"
												stroke="#0E2042"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											</svg>
										) : (
											<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											>
											<path
												d="M14.168 10.5798L8.62403 5.26379C8.27203 4.92379 7.71203 4.92379 7.36003 5.26379L1.83203 10.5798"
												stroke="#0E2042"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											</svg>
										)}
									</div>

									{/* Дропдаун */}
									{open && (
										<div className={styles.dropdown}>
										{IconOptions.map((option) => (
											<div
											key={option.value}
											onClick={() => handleSelect(option)}
											className={`${styles.dropdownItem} ${
												selected.value === option.value ? styles.active : ""
											}`}
											>
											{option.icon}
											</div>
										))}
										</div>
									)}
								</div>


								<div className={styles.formGroup}>
									<fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
										<legend>Category name</legend>
										<input
											type="text"
											placeholder="Enter category name"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</fieldset>

								</div>
							</div>

							<div className={styles.statusGroup}>
								<span className={styles.label}>Status</span>
								<div className={styles.statusButtons}>
									<button
										type="button"
										className={`${styles.statusBtn} ${status ? styles.active : ""}`}
										onClick={() => setStatus(true)}
									>
										Active
									</button>
									<button
										type="button"
										className={`${styles.statusBtn} ${!status ? styles.active : ""}`}
										onClick={() => setStatus(false)}
									>
										Not active
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.formGroup}>
						<fieldset className={`${commonStyles.inputWrapper2} ${styles.inputDesc}`}>
							<legend>Description</legend>
							<textarea
								maxLength={300}
								placeholder="Describe your category..."
								value={description}
								
								onChange={(e) => setDescription(e.target.value)}
							/>
							<div className={styles.wordCounter}>
							{description.length}/300
							</div>
						</fieldset>
					</div>

					{category && (
						<div>
						<div className={styles.roleBlock}>
							<span className={styles.roleSpan}>Role</span>
							<div className={styles.categotyRole}>
							{isSubcategory ? 'Subcategory' : 'Parent category'}
							<div
								className={styles.roleInfo}
								onClick={() => setInfoBlockOpen(prev => !prev)} 
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M11.9992 20.9641C16.9498 20.9641 20.9632 16.9508 20.9632 12.0001C20.9632 7.04945 16.9498 3.03613 11.9992 3.03613C7.04848 3.03613 3.03516 7.04945 3.03516 12.0001C3.03516 16.9508 7.04848 20.9641 11.9992 20.9641Z" stroke="#0E2042" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M14.1783 15.252L13.5723 15.708C12.6783 16.38 11.4063 15.744 11.4063 14.628V11.19C11.4063 11.028 11.2203 10.968 11.1003 11.076C10.6563 11.466 10.6983 11.556 9.82227 11.976" stroke="#0E2042" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M12.1927 9.05374C12.1207 9.34774 11.8747 9.58774 11.5807 9.65374C11.2567 9.72574 10.9567 9.61174 10.7647 9.39574C10.5967 9.20374 10.5187 8.93974 10.5787 8.65774C10.6447 8.35774 10.8847 8.11174 11.1787 8.03974C11.7967 7.88974 12.3367 8.43574 12.1927 9.05374Z" fill="#0E2042" fillOpacity="0.5"/>
								</svg>
							</div>
							</div>
						</div>

							{infoBlockOpen && (
							<div className={styles.infoBlock}>
								<div className={styles.ibInner}>
									<div className={styles.iOneCat}>
										<span className={styles.iOneCatMainSpan}>Parent category</span>
										<span className={styles.iOneCatAddSpan}>This is the main section of goods or services on the marketplace, for example, "Electronics", "Clothing".</span>
									</div>
									<div className={styles.iOneCat}>
										<span className={styles.iOneCatMainSpan}>Subcategory</span>
										<span className={styles.iOneCatAddSpan}>This is a more specific part of the parent category, for example, "Smartphones" in the category "Electronics".</span>
									</div>

								</div>
								
							</div>
							)}
						</div>
					)}

					{(isSubcategory || parentId) ? (
					<>
						<div className={styles.formGroup}>
						<AllCategoriesDropDown
							isLegend={true}
							my_value={parentName || "Choose category"}
							onChange={(value) => setParentName(value)}
						/>
						</div>
						<div className={styles.propertyKeys}>
						<span>Property keys</span>
						</div>

						{!category ? (
							<div className={styles.addPropertyKeys}>
								<button
								className={`${commonStyles.secondaryButton} ${styles.addPKbutton}`}
								onClick={addPropertyKey}
								>
								<svg
									width="28"
									height="28"
									viewBox="0 0 28 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
									d="M14 3.45801V12.201"
									stroke="#4A7BD9"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									/>
									<path
									d="M24.5008 13.958H15.7578"
									stroke="#4A7BD9"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									/>
									<path
									d="M3.5 13.958H12.243C13.216 13.958 14 14.742 14 15.715V24.458"
									stroke="#4A7BD9"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									/>
								</svg>
								<span>Add property key</span>
								</button>

								<div className={styles.pkList}>
								{propertyKeys.map((pk, idx) => (
									<OnePropertyKey key={pk.id ?? idx} name={pk.name} />
								))}
								</div>
							</div>
							) : (
							<div className={styles.addPropertyKeys}>
								<div className={styles.pkList}>
									{propertyKeys.map((pk, idx) => (
									<OnePropertyKey  isReadOnly={true} key={pk.id ?? idx} name={pk.name} />
									))}

								
								</div>

								<button
							className={`${commonStyles.secondaryButton} ${styles.addPKbutton}`}
							onClick={addPropertyKey}
							>
							<svg
								width="28"
								height="28"
								viewBox="0 0 28 28"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
								d="M14 3.45801V12.201"
								stroke="#4A7BD9"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								/>
								<path
								d="M24.5008 13.958H15.7578"
								stroke="#4A7BD9"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								/>
								<path
								d="M3.5 13.958H12.243C13.216 13.958 14 14.742 14 15.715V24.458"
								stroke="#4A7BD9"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								/>
							</svg>
							<span>Add property key</span>
							</button>
							

							</div>
							)}

					</>
					) : null}


					<div className={styles.actions}>
						<button onClick={onClose} className={styles.secondaryButton}>
							Cancel
						</button>
						<button onClick={handleSubmit} className={styles.nextStepButton}>
							{category ? "Save changes" : "Create"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEditCategoryModal;
