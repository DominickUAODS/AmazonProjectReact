import { useEffect, useState } from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';
import styles from './AccountOrders.module.css'
import OrderFromAccount from './OrderFromAcc';
import { useAuth } from '../Helpers/AuthContext';
import type Order from '../../interfaces/OrderInterface';
import { useNavigate } from 'react-router-dom';
//import orders from '../../data/orders.json';


export default function AccountOrders() {
	const API_SERVER = import.meta.env.VITE_API_SERVER;
	const [orders, serOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const { authFetch, accessToken } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchWishlist() {
			setLoading(true);
			try {
				const responce = await authFetch(`${API_SERVER}/orders/by-user`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` },
				});
				//console.log(responce.json);
				if (!responce.ok) throw new Error('Failed to fetch wishlist');
				const data = await responce.json();
				//console.log(data);
				serOrders(data);

			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchWishlist();
	}, [API_SERVER, accessToken, authFetch]);

	const handleMobileClick = () =>{
        navigate(`/account-menu`);
    };

	return (
		<div className={styles.accOrdersPage}>
			<div className={styles.menu}>
				<AccountMenu />
			</div>
			<div className={styles.accOrders}>
				<div className={styles.accOrdersTitle}>
					<div className={styles.backButtonDiv} onClick={handleMobileClick}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.7501 2.87891L7.77605 11.1949C7.26605 11.7229 7.26605 12.5629 7.77605 13.0909L15.7501 21.3829" stroke="#4A7BD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
					<span className={styles.back}>Back</span>
					</div>
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