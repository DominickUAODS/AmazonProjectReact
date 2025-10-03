import over_styles from "./CreateEditCategoryModal.module.css";
import styles from "./DeleteCategory.module.css";
import commonStyles from '../../common.module.css';


type DeleteCategoryProps={
  mainSpan?:string;
  addSpan:string;
  show: boolean;
  onClose: () => void;
  onDelete?:()=>void;
}
export default function DeleteCategory({mainSpan, addSpan, show, onClose, onDelete}:DeleteCategoryProps) {
  if (!show) return null;

      
	return (
      <div className={over_styles.overlay}>
        <div className={`${over_styles.modal} ${styles.my_modal}`}>
          <div className={styles.areYouSure}>
            <span>Are you sure?</span>
          </div>
          <div className={styles.textDeleteCat}>
            <span>{addSpan}</span>
            {/* {isSubcategory ? (<span>You can't restore this category and its subcategories; the products will be deactivated.</span>) : (<span>You can't recover categories, subcategories; products will be deactivated.</span>) } */}
          </div>
          <div className={styles.btnGroup}>
            <button className={commonStyles.nextStepButton} onClick={onClose}>Cancel</button>
            <button className={commonStyles.destructiveButton} onClick={onDelete}>Delete</button>
          </div>

        </div>
      </div>
    );
}
