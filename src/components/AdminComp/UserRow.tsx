import { useState, useRef, useEffect } from 'react';
import styles from './UserRow.module.css';
import type { UserType } from '../../types/UserType';
import type { ColumnVisibility } from './AdminPanel';
import dayjs from 'dayjs';

interface UserRowProps {
	user: UserType;
	visibleColumns: ColumnVisibility;
	selected: boolean;
	toggleSelect: () => void;
	onAction: (userId: string, action: 'toggleRole' | 'toggleStatus') => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, visibleColumns, selected, toggleSelect, onAction }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleMenuClick = (action: 'toggleRole' | 'toggleStatus') => {
		onAction(user.id, action);
		setMenuOpen(false);
	};

	const fullName = `${user.first_name} ${user.last_name}`;
	const statusText = user.isActive ? 'Active' : 'Deleted';
	const formattedDate = user.registrationDate ? dayjs(user.registrationDate).format('DD MMMM YYYY') : '—';
	const profile_photo = user.profile_photo !== "" ? user.profile_photo : "/img/default-user.svg";

	return (
		<tr className={styles.row}>
			<td><input type="checkbox" checked={selected} onChange={toggleSelect} /></td>
			<td className={styles.nameCell}>
				<img src={profile_photo} alt={fullName} className={styles.avatar} />
				<div>
					<div>{fullName}</div>
					<div className={styles.role}>{user.role}</div>
				</div>
			</td>
			{visibleColumns.status && (
				<td>
					<span className={`${styles.status} ${user.isActive ? styles.active : styles.deleted}`}>
						{statusText}
					</span>
				</td>
			)}
			{visibleColumns.registered && <td>{formattedDate}</td>}
			{visibleColumns.email && <td>{user.email}</td>}
			<td className={styles.actionsCell}>
				<button className={styles.actionsButton} onClick={() => setMenuOpen(!menuOpen)}>⋯</button>
				{menuOpen && (
					<div className={styles.menu} ref={menuRef}>
						<div className={styles.menuItem} onClick={() => handleMenuClick('toggleRole')}>
							{user.role === 'Administrator' ? 'Make customer' : 'Make administrator'}
						</div>
						<div className={styles.menuItem} onClick={() => handleMenuClick('toggleStatus')}>
							{user.isActive ? 'Delete' : 'Restore'}
						</div>
						<hr className={styles.menuDivider} />
						<div className={styles.menuItem}>View orders</div>
						<div className={styles.menuItem}>View reviews</div>
					</div>
				)}
			</td>
		</tr>
	);
};

export default UserRow;
