import React, { useEffect, useRef, useState } from 'react';
import UserRow from './UserRow';
import styles from './UserList.module.css';
import type { UserType } from '../../../types/UserType';
import type { ColumnVisibility } from './AdminPanel';


interface UserListProps {
	users: UserType[];
	visibleColumns: ColumnVisibility;
	selectedUserIds: Set<string>;
	toggleUserSelect: (id: string) => void;
	onUserAction: (userId: string, action: 'toggleRole' | 'toggleStatus') => void;
	onBulkAction: (action: 'delete' | 'restore') => void;
}

const UserList: React.FC<UserListProps> = ({
	users,
	visibleColumns,
	selectedUserIds,
	toggleUserSelect,
	onUserAction,
	onBulkAction
}) => {
	const selectedCount = selectedUserIds.size;
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

	const handleBulkClick = (action: 'delete' | 'restore') => {
		onBulkAction(action);
		setMenuOpen(false);
	};

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th></th>
					<th>User</th>
					{visibleColumns.status && <th>Status</th>}
					{visibleColumns.registered && <th>Registration date</th>}
					{visibleColumns.email && <th>Email</th>}

					<th className={styles.actionsCell}>
						{selectedCount > 1 && (
							<div className={styles.actionsWrapper}>
								<button
									className={styles.actionsButton}
									onClick={() => setMenuOpen(!menuOpen)}
								>
									<svg width="4" height="16" viewBox="0 0 4 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
										<circle cx="2" cy="2" r="1"></circle>
										<circle cx="2" cy="8" r="1"></circle>
										<circle cx="2" cy="14" r="1"></circle>
									</svg>

								</button>
								{menuOpen && (
									<div className={styles.menu} ref={menuRef}>
										<div
											className={styles.menuItem}
											onClick={() => handleBulkClick('delete')}
										>
											Delete selected
										</div>
										<div
											className={styles.menuItem}
											onClick={() => handleBulkClick('restore')}
										>
											Restore selected
										</div>
									</div>
								)}
							</div>
						)}
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<UserRow
						key={user.id}
						user={user}
						visibleColumns={visibleColumns}
						selected={selectedUserIds.has(user.id)}
						toggleSelect={() => toggleUserSelect(user.id)}
						onAction={onUserAction}
					/>
				))}
			</tbody>
		</table>
	);
};

export default UserList;
