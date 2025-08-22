import { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';
import Filters from './Filters';
import AdminHeader from './AdminHeader';
import UserList from './UserList';
import ColumnSelector from './ColumnSelector';
import userData from '../../../data.json';
import type { UserType } from '../../types/UserType';

export type ColumnVisibility = {
	status: boolean;
	registered: boolean;
	email: boolean;
};

const AdminPanel = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [roleFilter, setRoleFilter] = useState<'All' | 'Customer' | 'Administrator'>('All');
	const [search, setSearch] = useState<string>('');
	const [columns, setColumns] = useState<ColumnVisibility>({
		status: true,
		registered: true,
		email: true,
	});
	const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const converted = (userData as any[]).map((u) => ({
			...u,
			id: String(u.id),
		}));
		setUsers(converted as UserType[]);
	}, []);

	const toggleUserSelect = (id: string) => {
		setSelectedUserIds((prev) => {
			const newSet = new Set(prev);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			newSet.has(id) ? newSet.delete(id) : newSet.add(id);
			return newSet;
		});
	};

	const handleBulkAction = (action: 'delete' | 'deactivate' | 'restore') => {
		setUsers((prev) => prev.map((u) => selectedUserIds.has(u.id) ? { ...u, status: action === 'delete' || action === 'deactivate' ? 'Deleted' : 'Active', } : u));
		setSelectedUserIds(new Set());
	};

	const handleUserAction = (userId: string, action: 'toggleRole' | 'toggleStatus') => {
		setUsers((prev) =>
			prev.map((u) => {
				if (u.id !== userId) return u;
				if (action === 'toggleRole') { return { ...u, role: u.role === 'Administrator' ? 'Customer' : 'Administrator', }; }
				if (action === 'toggleStatus') { return { ...u, status: u.status === 'Deleted' ? 'Active' : 'Deleted', }; }
				return u;
			})
		);
	};

	const filtered = users.filter(
		(u) =>
			(roleFilter === 'All' || u.role === roleFilter) &&
			((u.first_name?.toLowerCase() ?? "").includes(search.toLowerCase())
				|| (u.last_name?.toLowerCase() ?? "").includes(search.toLowerCase())
				|| (u.email?.toLowerCase() ?? "").includes(search.toLowerCase()))
	);

	return (
		<div className={styles.panel}>
			<AdminHeader />
			<div className={styles.header}>
				<div className={styles.title}>Role</div>
				<Filters
					roleFilter={roleFilter}
					setRoleFilter={setRoleFilter}
					search={search}
					setSearch={setSearch}
				/>
				<ColumnSelector columns={columns} setColumns={setColumns} />
			</div>

			{selectedUserIds.size >= 2 && (
				<div className={styles.bulkMenu}>
					<button onClick={() => handleBulkAction('delete')}>Delete</button>
					<button onClick={() => handleBulkAction('deactivate')}>Deactivate</button>
					<button onClick={() => handleBulkAction('restore')}>Restore</button>
				</div>
			)}

			<UserList
				users={filtered}
				visibleColumns={columns}
				selectedUserIds={selectedUserIds}
				toggleUserSelect={toggleUserSelect}
				onUserAction={handleUserAction}
			/>
		</div>
	);
};

export default AdminPanel;
