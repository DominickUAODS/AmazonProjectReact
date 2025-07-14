import React from 'react';
import UserRow from './UserRow';
import styles from './UserList.module.css';
import type { UserType } from '../../types/UserType';
import type { ColumnVisibility } from './AdminPanel';

interface UserListProps {
	users: UserType[];
	visibleColumns: ColumnVisibility;
	selectedUserIds: Set<string>;
	toggleUserSelect: (id: string) => void;
	onUserAction: (userId: string, action: 'toggleRole' | 'toggleStatus') => void;
}

const UserList: React.FC<UserListProps> = ({
	users,
	visibleColumns,
	selectedUserIds,
	toggleUserSelect,
	onUserAction,
}) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th></th>
					<th>User</th>
					{visibleColumns.status && <th>Status</th>}
					{visibleColumns.registered && <th>Registration date</th>}
					{visibleColumns.email && <th>Email</th>}
					<th></th>
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
