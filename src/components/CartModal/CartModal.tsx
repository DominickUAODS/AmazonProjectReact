import styles from './CartModal.module.css';
import commonStyles from '../common.module.css';
import CartModalProduct from './CartModalProduct';
import { useEffect, useState } from 'react';
import { getCart } from './CartHelpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Helpers/AuthContext';

type CartModalProps = {
    onClose: () => void;
};

export default function CartModal({onClose}: CartModalProps) {
    const [isBottom, setIsBottom] = useState<boolean>(false);
    const [isTop, setIsTop] = useState<boolean>(true);
    const [cart, setCart] = useState<Record<string, number>>({});
    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setCart(getCart());
    }, []);

    useEffect(() => {
        async function loadProducts() {
            let newCartProducts: any[];
            if (Object.keys(cart).sort().join(',') !== cartProducts.map(product => product.id).sort().join(',')) {
                newCartProducts = await Promise.all(
                    Object.keys(cart).map(async (productId) => {
                        const response = await fetch(`${import.meta.env.VITE_API_SERVER}/product/${productId}`);
                        const data = await response.json();
                        return {
                            id: data.id,
                            title: data.name,
                            image: data.displays[0],
                            price: data.price,
                            quantity: cart[productId],
                        };
                    })
                );
            } else {
                newCartProducts = cartProducts.map(product => {
                    return {
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: cart[product.id],
                    };
                });
            }
            setCartProducts(newCartProducts);
            setTotalPrice(newCartProducts.reduce((total, product) => total + product.price * product.quantity, 0));
        }
        loadProducts();
    }, [cart]);

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight === e.currentTarget.clientHeight) {
            setIsBottom(true);
            setIsTop(true);
        } else if (e.currentTarget.scrollTop === 0) {
            setIsTop(true);
            setIsBottom(false);
        } else if (e.currentTarget.scrollHeight - Math.round(e.currentTarget.scrollTop) === e.currentTarget.clientHeight) {
            setIsBottom(true);
            setIsTop(false);
        } else {
            setIsBottom(false);
            setIsTop(false);
        };
    };

    const checkout = () => {
        onClose();
        if (isAuthenticated) {
            navigate('/checkout')
        } else {
            navigate("/signUp", { state: { background: location } });
        }
    }
    
    return (
        <div className={commonStyles.modalBackdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cartModal}>
                    <div className={styles.cartModalHeader}>
                        <div className={styles.cartModalHeaderTitle}>
                            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 7.17969H8.8C12.15 7.17969 11.19 11.8897 10.71 13.9197C10.06 16.6497 10.26 19.5597 13.51 20.3497C14.16 20.5097 14.83 20.5597 15.49 20.5597H27.03C27.03 20.5597 27.35 20.5597 27.83 20.6197C31.22 21.0297 30.96 25.4697 27.55 25.4997C27.51 25.4997 27.46 25.4997 27.42 25.4997H14.47" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.0303 8.29004H33.3203C34.6503 8.29004 35.4503 9.78004 34.7103 10.89L30.0603 17.86" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.2603 32.8204C17.4919 32.8204 18.4903 31.8219 18.4903 30.5904C18.4903 29.3588 17.4919 28.3604 16.2603 28.3604C15.0287 28.3604 14.0303 29.3588 14.0303 30.5904C14.0303 31.8219 15.0287 32.8204 16.2603 32.8204Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M27.4097 32.8204C28.6413 32.8204 29.6397 31.8219 29.6397 30.5904C29.6397 29.3588 28.6413 28.3604 27.4097 28.3604C26.1781 28.3604 25.1797 29.3588 25.1797 30.5904C25.1797 31.8219 26.1781 32.8204 27.4097 32.8204Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <h2 className={commonStyles.modalTitle}>Shopping Cart</h2>
                        </div>
                        <svg onClick={onClose} width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.94 5L21.5 18.43" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M34.94 34.8699L21.5 21.4399" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.05957 5L17.4996 17.44C18.8796 18.82 18.8796 21.06 17.4996 22.44L5.05957 34.88" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <hr className={isTop ? styles.firstHr : styles.bottomShadow} />
                    <div className={styles.productsInCart} onScroll={onScroll} onLoad={onScroll}>
                        {cartProducts.map((product: any, i: number) => (
                            <CartModalProduct
                                key={i}
                                id={product.id}
                                title={product.title}
                                image={product.image}
                                cost={product.price}
                                quantity={product.quantity}
                                setCart={setCart}
                                />
                        ))}
                    </div>
                    <hr className={isBottom ? styles.secondHr : styles.topShadow} />
                    <div className={styles.checkout}>
                        <button onClick={onClose} className={commonStyles.secondaryButton}>Continue shopping</button>
                        <div className={styles.checkoutGap} />
                        <span className='header-2'>Total:</span>
                        <span className='header-2'>${Math.floor(totalPrice)}<sup>{String(Math.round((totalPrice % 1) * 100)).padStart(2, '0')}</sup></span>
                        <button className={commonStyles.nextStepButton} onClick={checkout}>Checkout</button>
                    </div>
                </div>
			</div>
		</div>
    );
}
