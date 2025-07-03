
import styles from './AccountMenu.module.css'
import customerData from '../data/customers.json';




export default function AccountMenu() {
	return (
		<div className={styles.menuBlock}>
            <div className={styles.breadCrumbs}>
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1521 19.7929H6.28206C5.89806 19.7929 5.58606 19.6009 5.58606 19.3669V11.8789" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.414 11.8789V19.3669C18.414 19.6009 18.102 19.7929 17.718 19.7929H13.848" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 10.5648L12 5.05078L3 10.5648" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.848 14.6758H10.152V19.7938" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className={styles.bcText}>
                    <p>
                        / Account
                    </p>
                </div>
            </div>


            <div className={styles.AMblock}>
                <div className={styles.AMblock0}>
                    <div className={styles.accountInfo}>

                        <div className={styles.cusPhoto}>
                            <img src={customerData.customer.profilePhoto} alt={customerData.customer.name} />
                        </div>


                        <div className={styles.cusInfo}>
                            <p className={styles.cusName}>
                                {customerData.customer.name}
                            </p>
                            <p className={styles.cusRole}>
                                Customer
                            </p>
                        </div>
                    </div>


                    <div className={styles.accMenu}>
                        <div className={styles.menuChoice}>
                            <a href='/'>
                                <p>
                                    My orders
                                </p>
                            </a>
                        </div>
                        <div className={styles.menuChoice}>
                            <a href='/'>
                                <p>
                                    Wishlist
                                </p>
                            </a>
                        </div>
                        <div className={styles.menuChoice}>
                            <a href='/'>
                                <p>
                                    Account settings
                                </p>
                            </a>
                        </div>

                    </div>
                </div>

            </div>

		</div>
	);
}