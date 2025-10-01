import over_styles from "./CreateEditCategoryModal.module.css";
import styles from "./DeleteCategory.module.css";
import commonStyles from '../../common.module.css';

type DeleteCategoryProps = {
	parentId?: string | null;
	show: boolean;
	onClose: () => void;
	onConfirmDelete: () => void;
}

export default function DeleteCategory({ parentId, show, onClose, onConfirmDelete }: DeleteCategoryProps) {
	if (!show) return null;
	const isSubcategory = !!parentId;
	console.log(parentId)
	return (
		<div className={over_styles.overlay}>
			<div className={`${over_styles.modal} ${styles.my_modal}`}>
				<div className={styles.areYouSure}>
					<span>Are you sure?</span>
				</div>
				<div className={styles.textDeleteCat}>
					{isSubcategory ? (<span>You can't restore this category and its subcategories; the products will be deactivated.</span>) : (<span>You can't recover categories, subcategories; products will be deactivated.</span>)}
				</div>
				<div className={styles.btnGroup}>
					<button className={commonStyles.nextStepButton} onClick={onClose}>Cancel</button>
					<button className={commonStyles.destructiveButton} onClick={onConfirmDelete}>Delete</button>
				</div>

			</div>
		</div>
	);
}
