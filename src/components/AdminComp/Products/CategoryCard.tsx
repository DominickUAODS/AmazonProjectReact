import React, { useEffect, useState } from 'react';
import type { Category } from '../../../types/Category';
import styles from './CategoryCard.module.css'
import DeleteCategory from './DeleteCategory';


interface CategoryCardProps {
	category: Category;
	parentCategoryName?: string;
	onEdit: (category: Category) => void;
	onDelete: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [fullCategory, setFullCategory] = useState<Category>(category);
	const [parentName, setParentName] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);
	const isSubcategory = !!category.parent_id;
	const [pendingParentId, setPendingParentId] = useState<string | null>(null);

	const handleDeleteClick = () => {
		if (isSubcategory) {
			setPendingParentId(category.parent_id ?? null);
		} else {
			setPendingParentId(null);
		}
		setShowModal(true);
	};

	useEffect(() => {
		if (!category.id) return;

		const fetchCategoryDetails = async () => {
			try {
				const response = await fetch(`${API_SERVER}/category/${category.id}`);
				const data = await response.json();

				setFullCategory(prev => ({ ...prev, ...data }));

				//console.log("Category details fetched:", data);
				if (data.parent_id) {
					const parentRes = await fetch(`${API_SERVER}/category/${data.parent_id}`);
					const parentData: Category = await parentRes.json();
					setParentName(parentData.name);
				} else {
					setParentName(null);
				}
			} catch (err) {
				console.error("Ошибка загрузки деталей категории:", err);
			}
		};

		fetchCategoryDetails();
	}, [API_SERVER, category.id]);


	return (
		<div className={styles.mainPosition}>
			<div className={styles.catInfo}>
				<div className={styles.categoryImage}>
					{fullCategory.image && <img src={fullCategory.image} alt={fullCategory.name} />}
				</div>

				<div className={styles.categoryName}>
					<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.6703 20.7199L6.08026 26.1399C4.73026 26.8999 4.61026 28.8699 5.92026 29.6899C6.25026 29.8999 6.64026 30.0199 7.08026 30.0199H26.1603H32.9003C33.3403 30.0199 33.7303 29.8999 34.0603 29.6899C35.3703 28.8699 35.2503 26.8999 33.9003 26.1399L32.4803 25.3399C28.4603 23.0799 24.3803 21.3699 20.4703 19.1299C19.8103 18.7499 18.7403 18.0399 18.6203 17.8499C17.5203 16.1899 20.9803 16.5099 22.3703 14.9999C24.4403 12.7599 22.1803 10.0599 20.3003 9.98995C18.5203 9.91995 17.1703 11.2499 17.2103 12.8899" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<span>
						{fullCategory.name}
					</span>
				</div>

				<div className={styles.borderBottom}></div>

				<div className={styles.categoryDescription}>
					<span>
						{fullCategory.description}
					</span>
				</div>

				<div className={styles.borderBottom}></div>

				<div className={styles.statusRole}>
					<div className={styles.statusSpans}>
						<span className={styles.statusRoleSubSpan1}>
							Status
						</span>
						<span className={styles.statusRoleSubSpan2}>
							{fullCategory.is_active ? 'Active' : 'Inactive'}
						</span>
					</div>
					<div className={styles.statusSpans}>
						<span className={styles.statusRoleSubSpan1}>
							Role
						</span>
						<span className={styles.statusRoleSubSpan2}>
							{isSubcategory ? 'Subcategory' : 'Parent category'}
						</span>
					</div>
					{isSubcategory && parentName && (
						<div className={styles.statusSpans}>
							<span className={styles.statusRoleSubSpan1}>
								Parent
							</span>
							<span className={styles.statusRoleSubSpan2}>
								{parentName}
							</span>
						</div>
					)}
				</div>
			</div>

			<div className={styles.btnGroup}>
				<button onClick={() => onEdit(category)} className={styles.editBtn}>
					<svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.0692 24.4999H9.42219C6.55919 24.4999 4.24219 22.1829 4.24219 19.3199V8.67285" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M9.42969 3.5H20.0767C22.9397 3.5 25.2567 5.817 25.2567 8.68V19.327" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M16.7805 14.6377L11.4815 19.9437L8.81445 17.2697L14.1135 11.9707" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M7.93945 20.8115L11.4815 19.9435L8.80745 17.2695L7.93945 20.8115Z" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M15.4785 10.668L18.1035 13.293" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M16.8223 9.36621L19.3913 11.9282" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M18.1797 7.90325L18.6417 7.43425C18.9707 7.10525 19.5027 7.10525 19.8317 7.43425L21.3087 8.91825C21.6377 9.24725 21.6377 9.77925 21.3087 10.1082L20.8467 10.5703" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<span className={styles.spanInfo}>Edit</span>
				</button>
				<button onClick={handleDeleteClick} className={styles.deleteBtn}>
					<svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M22.9405 8.60938L21.0505 23.5194C20.9105 24.5694 20.0005 25.3394 18.9505 25.3394H10.5505C9.50055 25.3394 8.59055 24.5694 8.45055 23.5194L6.56055 8.60938" stroke="#EA4848" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M22.9405 4.96973H6.56055" stroke="#EA4848" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M11.5996 4.96984V4.68984C11.5996 3.56984 12.5096 2.58984 13.6996 2.58984H15.8696C16.9896 2.58984 17.9696 3.49984 17.9696 4.68984V4.96984" stroke="#EA4848" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<span className={styles.spanInfo}>Delete</span>
				</button>
			</div>
			<DeleteCategory
			show={showModal}
			onClose={() => setShowModal(false)}
			addSpan={isSubcategory ? "You can't restore this category and its subcategories; the products will be deactivated." : "You can't recover categories, subcategories; products will be deactivated."}
			onDelete={handleDeleteClick}
			/>
		</div>
	);
};



export default CategoryCard;
