import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductPageMainBlock.module.css'
import ProductPageFB from './ProductPageFB';
import DetailsBProductPage from './DetailsBProductPage';
import CommentsBlock from './CommentsBlock';


export default function ProductPageMainBlock() {
	
	return (
		<div className={styles.ppmb}>
            <ProductPageFB/>
            <DetailsBProductPage
                details={[
                    { title: "Fabric type", text: "49% rayon, 34% polyester, 17% nylon" },
                    { title: "Care instructions", text: "Machine wash" },
                    { title: "Color", text: "Blue" },
                    { title: "Country", text: "Made in Italy" },
                    { title: "Country", text: "Made in Italy" },
                    { title: "Country", text: "Made in Italy" },
                    { title: "Country", text: "Made in Italy" },
                ]}
            />
            <CommentsBlock/>
            

			
		</div>
	);
}