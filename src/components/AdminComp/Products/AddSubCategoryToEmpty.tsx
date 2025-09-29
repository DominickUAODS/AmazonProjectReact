
import styles from './EmptyCategoryTree.module.css'
import this_styles from './AddSubCategoryToEmpty.module.css'
import type { Category } from '../../../types/Category';

type AddSubCategoryToEmtyProps ={
    parent:Category | null;
    addSub:(parent:Category)=> void;
}
export default function AddSubCategoryToEmpty({addSub, parent}:AddSubCategoryToEmtyProps) {
	return (
		<div className={styles.emtyCategoryTree}>
            <div className={this_styles.addSubBlock} style={{"cursor":"pointer"}} onClick={() => parent && addSub(parent)}
            >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 7.90381V27.8878" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M55.9996 31.9038H36.0156" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 31.9038H27.984C30.208 31.9038 32 33.6958 32 35.9198V55.9038" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Create subcategory</span>


            </div>           
		</div>
	);
}