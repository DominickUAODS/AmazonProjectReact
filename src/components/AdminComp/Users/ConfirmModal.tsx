import commonStyles from '../../common.module.css';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
	open: boolean;
	action: 'delete' | 'restore' | null;
	count: number;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, action, count, onConfirm, onCancel }) => {
	if (!open || !action) return null;

	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={`${commonStyles.cnModal} ${styles.loModal}`} onClick={(e) => e.stopPropagation()}>

				<div className={`${commonStyles.modalInfo} ${styles.loModalInfo}`}>
					<span className={`${commonStyles.modalInfoSpan} ${styles.loInfoSpan}`}> Are you sure? </span>
				</div>

				<span className={styles.logOutSpan}>
					Your {count} selected users will be {action === 'delete' ? 'deleted' : 'restorated'}.
				</span>

				<div className={commonStyles.buttonGroup}>
					<button className={commonStyles.secondaryButton} onClick={onCancel}>Cancel</button>
					<button className={commonStyles.nextStepButton} onClick={onConfirm}>
						{action === 'delete' ? 'Delete' : 'Restore'}
					</button>
				</div>
				
			</div>
		</div>
	);
};

export default ConfirmModal;
