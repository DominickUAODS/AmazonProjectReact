import AccountMenu from '../AccountMenu/AccountMenu';
import styles from './AccountOrders.module.css'
import OrderFromAccount from './OrderFromAcc';
import orders from '../data/orders.json';




export default function AccountOrders() {
	

	return (
		<div className={styles.accOrdersPage}>
            <AccountMenu/>
            <div className={styles.accOrders}>
				<div className={styles.accOrdersTitle}>
					<p>My Orders</p>
			    </div>

				<div className={styles.accountOrdersSet}>
				{orders.map((order, index) => (
					<OrderFromAccount
					key={order.id}
					order={order}
					isEven={(index + 1) % 2 === 0}
					/>
				))}
				</div>

            </div>

			
		</div>
	);
}