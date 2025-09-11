import { useEffect, useState } from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';
import styles from './AccountOrders.module.css'
import OrderFromAccount from './OrderFromAcc';
import { useAuth } from '../Helpers/AuthContext';
import type Order from '../../interfaces/OrderInterface';
//import orders from '../../data/orders.json';


export default function AccountOrders() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [orders, serOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const { authFetch, accessToken } = useAuth();

	useEffect(() => {
		async function fetchWishlist() {
			setLoading(true);
			try {
				const responce = await authFetch(`${API_SERVER}/orders/by-user`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
				});
				console.log(responce.json);
				if (!responce.ok) throw new Error('Failed to fetch wishlist');
				const data = await responce.json();
				console.log(data);
				serOrders(data);

			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchWishlist();
	}, [API_SERVER, accessToken, authFetch]);

	return (
		<div className={styles.accOrdersPage}>
			<AccountMenu />
			<div className={styles.accOrders}>
				<div className={styles.accOrdersTitle}>
					<p>My Orders</p>
				</div>

				{loading ? (
					<p>Loading...</p>
				) : (
					<div className={styles.accountOrdersSet}>
						{orders.map((order: Order, index) => (
							<OrderFromAccount
								key={order.id}
								order={order}
								isEven={(index + 1) % 2 === 0}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}