// ProductListWithPagination.tsx
import React from "react";
import ProductListHeader from "./ProductListHeader";
import Pagination from "../../Pagination/Pagination";
import cmStyles from "../Products/CategoriesPage.module.css";
import styles from "./ProductByCategory.module.css";
import commonStyles from "../../common.module.css";
import type { OneProductProps } from "./OneProduct";
import OneProduct from "./OneProduct";
import EmptyCategoryTree from "../Products/EmptyCategoryTree";

interface ProductListWithPaginationProps {
  products: OneProductProps[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>; 
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  productsPerPage: number;
}

const ProductListWithPagination: React.FC<ProductListWithPaginationProps> = ({
  products,
  selectedIds,
  setSelectedIds,
  selectedProductId,
  setSelectedProductId,
  currentPage,
  setCurrentPage,
  productsPerPage,
}) => {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <div className={cmStyles.borderBottom}></div>
      <ProductListHeader
                products={products}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
            />
            <div className={cmStyles.borderBottom}></div>
      {products.length>0 ? (<>
            <div className={styles.productsList}>
        {currentProducts.map((product) => (
          <OneProduct
            key={product.id}
            product={product}
            selectedIds={selectedIds}
            onToggleProduct={(prod, checked) => {
              if (checked) {
                setSelectedIds((prev) => [...prev, prod.id]);
              } else {
                setSelectedIds((prev) => prev.filter((id) => id !== prod.id));
              }
            }}
            onSelectProduct={(prod) => setSelectedProductId(prod.id)}
            selectedProductId={selectedProductId || " "}
          />
        ))}

      {totalPages > 1 && (
        <div className={commonStyles.fixedPagination}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      </div>
        </>):(
        <>
        <EmptyCategoryTree spanTitle={"No products in the selected category"}/>
        </>)}
     


    </>
  );
};

export default ProductListWithPagination;
