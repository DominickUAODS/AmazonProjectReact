import styles from './AccountWishlist.module.css'
import AccountMenu from '../AccountMenu/AccountMenu';
import WishlistCard from './WishlistCard';
import products from '../data/product.json';




export default function AccountWishlist() {
	
  
	return (
		<div className={styles.acWishBlock}>

			<AccountMenu/>

			<div className={styles.accWishlist}>

				<div className={styles.accWishlistTitle}>
					<p>Wishlist</p>
                    <div className={styles.searchWishes} >
                        <input placeholder="Search..." type='text'>
                        </input>
                        <button className={styles.searchButton}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.986 14.1076C12.906 15.5236 10.416 16.2016 9.3 16.2016C5.82 16.2016 3 13.3816 3 9.90156C3 6.42156 5.82 3.60156 9.3 3.60156C12.78 3.60156 15.6 6.42156 15.6 9.90156C15.6 10.5856 15.492 11.2456 15.288 11.8636" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.0001 20.3995L13.9861 14.1055" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
				</div>

                <div className={styles.wishlistSet}>
                    {products.map(product => (
				        <WishlistCard key={product.id} product={product} />
			        ))}
                </div>
            </div>

		</div>
	);
}