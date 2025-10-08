import styles from './Checkout.module.css';
import commonStyles from '../common.module.css';
import { getCart } from '../CartModal/CartHelpers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const [products, setProducts] = useState<any[]>([]);
    const [price, setPrice] = useState<number>(0);

    const navigate = useNavigate();
    
    useEffect(() => {
        async function loadProducts() {
            const cart = getCart();
            const newProducts: any[] = await Promise.all(
                Object.keys(cart).map(async (productId) => {
                    const response = await fetch(`${import.meta.env.VITE_API_SERVER}/product/${productId}`);
                    const data = await response.json();
                    return {
                        title: data.name,
                        price: data.price,
                        quantity: cart[productId],
                    };
                })
            );
            setProducts(newProducts);
            setPrice(newProducts.reduce((total, product) => total + product.price * product.quantity, 0));
        }
        loadProducts();
    }, [])
    
    const placeOrder = () => {
        // todo send data to api
    }

    const cancel = () => {
        navigate(-1);
    }

    return (
        <div className={styles.checkoutPage}>
            <div className={styles.left}>
                <p>left</p>
            </div>
            <div className={styles.right}>
                <h2 className='text-h2'>Summary</h2>
                <hr className={styles.hrTop} />
                {products.map((product: any, i: number) => (
                    <div className={styles.productShortInfo}>
                        <span className={styles.title}>{product.title}</span>
                        <div className={styles.priceBox}>
                            <span className={styles.priceWithQuantity}>{product.quantity} x $ {Math.floor(product.price)}<sup>{String(Math.round((product.price % 1) * 100)).padStart(2, '0')}</sup></span>
                            <span className={styles.price}>$ {Math.floor(product.price * product.quantity)} <sup>{String(Math.round(((product.price * product.quantity) % 1) * 100)).padStart(2, '0')}</sup></span>
                        </div>
                    </div>
                ))}
                <hr />
                <div className={styles.totalFrame}>
                    <span className='header-3'>Total:</span>
                    <span className='header-1'>${Math.floor(price)}<sup>{String(Math.round((price % 1) * 100)).padStart(2, '0')}</sup></span>
                </div>
                <div className={styles.buttonBroup}>
                    <button className={commonStyles.nextStepButton} onClick={placeOrder}>Place order</button>
                    <button className={commonStyles.secondaryButton} onClick={cancel}>Cancel</button>
                    <span className={styles.placeOrderTerms}>By clicking "Place order", you agree with <a>PERRY Terms and Conditions</a></span>
                </div>
            </div>
        </div>
    )
}
