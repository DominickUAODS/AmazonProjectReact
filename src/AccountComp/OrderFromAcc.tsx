import styles from './OrderFromAcc.module.css'
import type Order from '../interfaces/OrderInterface';




export default function OrderFromAccount({
    order,
    isEven,
  }: {
    order: Order;
    isEven: boolean;
  }) {
    const [dollars, cents] = order.total.toFixed(2).split('.');
  
    return (
      <div className={`${styles.order} ${isEven ? styles.evenOrder : ''}`}>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfo0}>
            <p className={styles.orderNum}>Order #{order.id}</p>
            <p className={styles.orderStatus}>{order.status}</p>
          </div>
          <p className={styles.orderDate}>Ordered on {order.date}</p>
        </div>
        <div className={styles.orderPrice}>
          <p className={styles.numOrder}>Ordered {order.itemsCount} item</p>
          <div className={styles.orderPrice0}>
            <span className={styles.price}>
              <span className={styles.dollar}>$</span>
              <span className={styles.main}>{dollars}</span>
              <sup className={styles.cents}>{cents}</sup>
            </span>
            <button className={`${styles.secondaryButton} ${isEven ? styles.secondaryButtonEven : ''}`}>Details</button>
          </div>
        </div>
      </div>
    );
  }
  