
import styles from './OneProduct.module.css'


export interface OneProductProps {
    id: string;           
    name: string;
    price: number;
    discount?: number;    
    displays: string;      
    rating?: number;      
    comments?: number;    
}

interface OneProductItemProps {
    product: OneProductProps;
    selectedIds: string[];
    onToggleProduct: (product: OneProductProps, checked: boolean) => void;
    onSelectProduct?: (product: OneProductProps) => void;
    selectedProductId?: string;
}

const OneProduct: React.FC<OneProductItemProps> = ({
    product,
    selectedIds,
    onToggleProduct,
    onSelectProduct,
    selectedProductId
}) => {
    const isChecked = selectedIds.includes(product.id);
    const shouldHighlight = selectedProductId === product.id;

    const handleCheckboxChange = (checked: boolean) => {
        onToggleProduct(product, checked);
    };
    const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

    const [dollars, cents] = discountedPrice.toFixed(2).split('.');



    return (
        <div
            className={styles.oneProduct}
            style={{
                backgroundColor: shouldHighlight ? "rgba(224, 235, 255, 1)" : "transparent",
                cursor: "pointer",
            }}
            onClick={() => onSelectProduct?.(product)}
        >
            <div className={styles.photoNameProductCheck}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                    onClick={(e) => e.stopPropagation()} 
                />
                <div className={styles.photoNameProduct}>
                    {product.displays? (   <img
                        src={product.displays}
                        alt={product.name}
                        className={styles.productImage}
                    />):(<div  className={styles.productNoImage}></div>)}
                 
                    <span className={styles.prName}>{product.name}</span>
                </div>
            </div>
            <div className={styles.ratingPrice}>
                <div className={styles.rating}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.19811 20.4072C7.37611 21.0012 6.27811 20.2032 6.59011 19.2372L7.91611 15.1452C8.10211 14.5692 7.89811 13.9392 7.40611 13.5852L3.92611 11.0592C3.10411 10.4652 3.53011 9.16922 4.53811 9.16922H8.84011C9.44611 9.16922 9.98011 8.77922 10.1661 8.20322L11.4921 4.11122C11.8041 3.14522 13.1661 3.14522 13.4841 4.11122L14.8101 8.20322C14.9961 8.77922 15.5361 9.16922 16.1361 9.16922H20.4381C21.4521 9.16922 21.8721 10.4652 21.0501 11.0592L17.5701 13.5852C17.0781 13.9392 16.8741 14.5692 17.0601 15.1452L18.3861 19.2372C18.6981 20.2032 17.5941 21.0012 16.7781 20.4072L13.5201 17.7972C13.0281 17.4012 12.3321 17.3892 11.8221 17.7552L8.18011 20.4072H8.19811Z" fill="#0E2042" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
                    {product.rating !== undefined && <p>{product.rating}</p>}
                </div>

                <div className={styles.priceBlock}>
                    {product.discount ? (
                        <div className={styles.discountBlock}>
                            <span className={styles.newPrice}>
                                <span className={styles.dollar}>$</span>
                                <span className={styles.main}>{dollars}</span>
                                <sup className={styles.cents}>{cents}</sup>
                            </span>
                            <span className={styles.oldPrice}>${product.price.toFixed(2)}</span>
                        </div>
                    ) : (
                        <div className={styles.nodiscountBlock}>
                            <span className={styles.newPrice}>
                                <span className={styles.dollar}>$</span>
                                <span className={styles.main}>{dollars}</span>
                                <sup className={styles.cents}>{cents}</sup>
                            </span>
                            <span className={styles.oldPrice2}></span>
                        </div>

                    )}
                </div>

            </div>
            
        </div>
    );
};

export default OneProduct;