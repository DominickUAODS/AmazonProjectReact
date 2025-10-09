import styles from './Checkout.module.css';
import commonStyles from '../common.module.css';
import { getCart } from '../CartModal/CartHelpers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const [products, setProducts] = useState<any[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [fName,setFname] = useState<string>("");
    const [lName,setLname] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [postcode,setPostcode] = useState<string>("");
    const [country,setCountry] = useState<string>("");
    const [city,setCity] = useState<string>("");
    const [state,setState] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | null>(null);

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
        console.log('✅ Выбран способ оплаты:', paymentMethod);
        console.log('📦 Данные заказа:', {
            firstName: fName,
            lastName: lName,
            email,
            address: { country, state, city, postcode },
            paymentMethod,
        });
        // TODO: отправка данных на сервер
    };

    const cancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user.first_name) setFname(user.first_name);
                if (user.last_name) setLname(user.last_name);
                if (user.email) setEmail(user.email);
            } catch (err) {
                console.error('Ошибка при чтении user из localStorage:', err);
            }
        }
    }, []);


    return (
        <div className={styles.checkoutPage}>
            <div className={styles.left}>
                <div className={styles.info}>
                    <span className={styles.spanRecInfo}>Recipient information</span>
                    <div className={styles.recInfoInputs}>
                        <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
                                <legend>First name</legend>
                            <input
                                type="text"
                                placeholder="Enter your first name..."
                                value={fName}
                                onChange={e => setFname(e.target.value)}
                            />
			            </fieldset>
                        <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
                                <legend>Last name</legend>
                            <input
                                type="text"
                                placeholder="Enter your last name..."
                                value={lName}
                                onChange={e => setLname(e.target.value)}
                            />
			            </fieldset>
                    </div>

                    <fieldset className={`${commonStyles.inputWrapper} ${styles.inputEmail}`}>
                                <legend>Email</legend>
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
			            </fieldset>

                </div>
                <div className={styles.info}>
                    <span className={styles.spanRecInfo}>Delivery address</span>
                    <div className={styles.recInfoInputs}>
                        <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
                                <legend>Country</legend>
                            <input
                                type="text"
                                placeholder="Enter country..."
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                            />
			            </fieldset>
                        <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
                                <legend>State</legend>
                            <input
                                type="text"
                                placeholder="Enter state..."
                                value={state}
                                onChange={e => setState(e.target.value)}
                            />
			            </fieldset>
                    </div>

                    <div className={styles.recInfoInputs}>
                        <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
                                <legend>CIty</legend>
                            <input
                                type="text"
                                placeholder="Enter city..."
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
			            </fieldset>
                        <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
                                <legend>Postcode</legend>
                            <input
                                type="text"
                                placeholder="Enter postcode..."
                                value={postcode}
                                onChange={e => setPostcode(e.target.value)}
                            />
			            </fieldset>
                    </div>
                </div>

                <div className={styles.payment}>
                    <span className={styles.spanRecInfo}>Payment method</span>
                    <div className={styles.recInfoInputs}>
                    <button
                        className={`${paymentMethod === 'cash' 
                            ? `${commonStyles.nextStepButton} ${styles.menextStep}` 
                            : commonStyles.secondaryButton}`}
                        onClick={() => setPaymentMethod('cash')}
                    >
                        Cash
                    </button>

                    <button
                        className={`${paymentMethod === 'card' 
                            ? `${commonStyles.nextStepButton} ${styles.menextStep}` 
                            : commonStyles.secondaryButton}`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        Card
                    </button>
                    </div>
                </div>
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
                    <button className={`${commonStyles.nextStepButton} ${styles.menextStep}`} onClick={placeOrder}>Place order</button>
                    <button className={commonStyles.secondaryButton} onClick={cancel}>Cancel</button>
                    <span className={styles.placeOrderTerms}>By clicking "Place order", you agree with <a>PERRY Terms and Conditions</a></span>
                </div>
            </div>
        </div>
    )
}
