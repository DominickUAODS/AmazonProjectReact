import React, { useState } from "react";
import styles from "./CreateEditCategoryModal.module.css";
import commonStyles from '../../common.module.css';

interface CreateEditCategoryModalProps {
	show: boolean;
	onClose: () => void;
	onCreate: () => void;
}

const CreateEditCategoryModal: React.FC<CreateEditCategoryModalProps> = ({ show, onClose, onCreate }) => {
	const [name, setName] = useState("");
	const [status, setStatus] = useState(true);
	const [description, setDescription] = useState("");

	const handleSubmit = () => {
		if (name.trim()) {
			onCreate();
			onClose();
		}
	};

	if (!show) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.title}>Create category</div>
				<div className={styles.borderBottom}></div>

				<div className={styles.formGroup}>
					<fieldset className={commonStyles.inputWrapper}>
						<legend>Category name</legend>
						<input
							type="text"
							placeholder="Enter category name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</fieldset>

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

				<div className={styles.formGroup}>
					<fieldset className={commonStyles.inputWrapper2}>
						<legend>Description</legend>
						<textarea
							maxLength={300}
							placeholder="Describe your category..."
							value={description}
							
							onChange={(e) => setDescription(e.target.value)}
						/>
					</fieldset>
				</div>

				<div className={styles.actions}>
					<button onClick={onClose} className={styles.secondaryButton}>
						Cancel
					</button>
					<button onClick={handleSubmit} className={styles.nextStepButton}>
						Create
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateEditCategoryModal;
