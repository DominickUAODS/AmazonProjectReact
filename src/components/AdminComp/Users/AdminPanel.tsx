import { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';
import Filters from './Filters';
import AdminHeader from './../AdminHeader';
import UserList from './UserList';
import ColumnSelector from './ColumnSelector';
import type { UserType } from '../../../types/UserType';
import { useAuth } from '../../Helpers/AuthContext';
import Pagination from '../../Pagination/Pagination';
import ConfirmModal from './ConfirmModal';

export type ColumnVisibility = {
	status: boolean;
	registered: boolean;
	email: boolean;
};


const AdminPanel = () => {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE);
	const SEARCH_DEBOUNCE = Number(import.meta.env.VITE_SEARCH_DEBOUNCE);
	const [users, setUsers] = useState<UserType[]>([]);
	const [roleFilter, setRoleFilter] = useState<'All' | 'Customer' | 'Administrator'>('All');
	const [search, setSearch] = useState<string>('');
	const [columns, setColumns] = useState<ColumnVisibility>({ status: true, registered: true, email: true, });
	const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [debouncedSearch, setDebouncedSearch] = useState<string>('');

	const { accessToken, authFetch } = useAuth();

	const [modalOpen, setModalOpen] = useState(false);
	const [modalAction, setModalAction] = useState<"delete" | "restore" | null>(null);


	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE);
		return () => clearTimeout(timeout);
	}, [search, SEARCH_DEBOUNCE]);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => setRoleFilter(roleFilter), SEARCH_DEBOUNCE);
	// 	return () => clearTimeout(timeout);
	// }, [roleFilter, SEARCH_DEBOUNCE]);


	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const params = new URLSearchParams();
				if (roleFilter !== 'All') params.append('role', roleFilter);
				if (debouncedSearch) params.append('search', debouncedSearch);

				const url = `${API_SERVER}/users?${params.toString()}`;
				const response = await authFetch(url, {
					headers: { Authorization: `Bearer ${accessToken}` }
				});

				const data: UserType[] = await response.json();

				setUsers(
					data.map((u) => ({
						...u,
						id: String(u.id),
						status: u.isActive ? 'Active' : 'Deleted',
					}))
				);

				setCurrentPage(1);
			} catch (err) {
				console.error(err);
			}
		};

		fetchUsers();
	}, [API_SERVER, accessToken, authFetch, debouncedSearch, roleFilter]);



	const toggleUserSelect = (id: string) => {
		setSelectedUserIds((prev) => {
			const newSet = new Set(prev);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			newSet.has(id) ? newSet.delete(id) : newSet.add(id);
			return newSet;
		});
	};

	const handleBulkAction = (action: "delete" | "restore") => {
		if (selectedUserIds.size === 0) return;
		setModalAction(action);
		setModalOpen(true);
	};


	// const handleBulkAction = (action: 'delete' | 'deactivate' | 'restore') => {
	// 	setUsers((prev) =>
	// 		prev.map((u) =>
	// 			selectedUserIds.has(u.id)
	// 				? { ...u, status: action === 'delete' || action === 'deactivate' ? 'Deleted' : 'Active' }
	// 				: u
	// 		)
	// 	);
	// 	setSelectedUserIds(new Set());
	// };

	const handleConfirmAction = async () => {
		if (!modalAction) return;

		try {

			const updatedUsers: UserType[] = [];

			for (const userId of selectedUserIds) {
				const url = `${API_SERVER}/users/${userId}/toggle-status`;

				const response = await authFetch(url, {
					method: "PATCH",
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`
					}
				});

				if (!response.ok) throw new Error(`Failed to update user ${userId}`);

				const updatedUser: UserType = await response.json();
				updatedUsers.push(updatedUser);
			}

			setUsers(prev =>
				prev.map(u => {
					const updated = updatedUsers.find(upd => upd.id === u.id);
					return updated ? { ...u, ...updated, id: String(updated.id) } : u;
				})
			);

			setSelectedUserIds(new Set());
		} catch (err) {
			console.error(err);
		} finally {
			setModalOpen(false);
			setModalAction(null);
		}
	};


	const handleUserAction = async (userId: string, action: 'toggleRole' | 'toggleStatus') => {
		// setUsers((prev) =>
		// 	prev.map((u) => {
		// 		if (u.id !== userId) return u;
		// 		if (action === 'toggleRole') return { ...u, role: u.role === 'Administrator' ? 'Customer' : 'Administrator' };
		// 		if (action === 'toggleStatus') return { ...u, status: u.isActive ? 'Active' : 'Deleted' };
		// 		return u;
		// 	})
		// );
		try {
			// Найдем пользователя в текущем списке
			const user = users.find(u => u.id === userId);
			if (!user) return;

			console.log(userId);

			let togglePath = '';
			if (action === 'toggleRole') {
				togglePath = 'toggle-role';
			}
			if (action === 'toggleStatus') {
				togglePath = 'toggle-status';
			}

			const url = `${API_SERVER}/users/${userId}/${togglePath}`;
			const response = await authFetch(url, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
			});

			if (!response.ok) throw new Error('Failed to update user');

			const updatedUser: UserType = await response.json();

			setUsers(prev =>
				prev.map(u => (u.id === userId ? { ...u, ...updatedUser, id: String(updatedUser.id) } : u))
			);

		} catch (err) {
			console.error(err);
		}
	};


	const totalPages = Math.ceil(users.length / PAGE_SIZE);
	const paginatedUsers = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	//console.log(setSearch)

	return (
		<div className={styles.panel}>
			<AdminHeader />

			<div className={styles.header}>
				<div className={styles.title}>Role</div>
				<Filters roleFilter={roleFilter} setRoleFilter={setRoleFilter} search={search} setSearch={setSearch} />
				<ColumnSelector columns={columns} setColumns={setColumns} />
			</div>

			<UserList
				users={paginatedUsers}
				visibleColumns={columns}
				selectedUserIds={selectedUserIds}
				toggleUserSelect={toggleUserSelect}
				onUserAction={handleUserAction}
				onBulkAction={handleBulkAction}
			/>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			)}

			<ConfirmModal
				open={modalOpen}
				action={modalAction}
				count={selectedUserIds.size}
				onConfirm={handleConfirmAction}
				onCancel={() => setModalOpen(false)}
			/>


		</div>
	);
};

export default AdminPanel;
