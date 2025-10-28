import styles from './CartModalProduct.module.css';
import { addToCart, removeFromCart } from './CartHelpers';

type CartModalProductProps = {
    id: string;
    title: string;
    image: string;
    cost: number;
    quantity: number;
    setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export default function CartModalProduct(product: CartModalProductProps) {
    return (
        <div className={styles.cartProductFrame}>
            <img src={product.image} alt='image' className={styles.cartProductImage} />
            <p className='text-4'>{product.title}</p>
            <div className={styles.cartProductQuantity}>
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.6998 12.3003L28.9998 33.6003C28.7998 35.1003 27.4998 36.2003 25.9998 36.2003H13.9998C12.4998 36.2003 11.1998 35.1003 10.9998 33.6003L8.2998 12.3003" stroke="#0E2042" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M31.6998 7.1001H8.2998" stroke="#0E2042" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.5 7.1002V6.7002C15.5 5.1002 16.8 3.7002 18.5 3.7002H21.6C23.2 3.7002 24.6 5.0002 24.6 6.7002V7.1002" stroke="#0E2042" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.cartProductQuantityChange}>
                    <svg onClick={() => product.setCart(removeFromCart(product.id))} width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 19.9399H35" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {product.quantity}
                    <svg onClick={() => product.setCart(addToCart(product.id))} width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4.93994V17.4299" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M34.9998 19.9399H22.5098" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 19.9399H17.49C18.88 19.9399 20 21.0599 20 22.4499V34.9399" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={styles.cartProductCalculatedCost}>
                    <div>
                        <span className='text-3'>${Math.floor(product.cost * product.quantity)}</span>
                        <sup className='text-3'>{String(Math.round(((product.cost * product.quantity) % 1) * 100)).padStart(2, '0')}</sup>
                    </div>
                    <div className={styles.cartProductCalculatedUnitCost}>
                        <span className='text-5'>{product.quantity} x ${Math.floor(product.cost)}</span>
                        <sup className='text-5'>{String(Math.round(((product.cost) % 1) * 100)).padStart(2, '0')}</sup>
                    </div>
                </div>
            </div>
        </div>
    );
}
