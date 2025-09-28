import React, { useState } from "react";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [rotated, setRotated] = useState(images);

  const maxThumbnails = 3;
  const visible = rotated.slice(0, maxThumbnails);
  const hasMore = rotated.length > maxThumbnails;

  const handleMoreClick = () => {
    // берём последние maxThumbnails и переносим их в начало
    const moved = rotated.slice(-maxThumbnails);
    const rest = rotated.slice(0, rotated.length - maxThumbnails);
    const newArr = [...moved, ...rest];
    setRotated(newArr);
    setSelectedImage(newArr[0]); // всегда показываем первый
  };

  return (
    <div className={styles.gallery}>
      {/* большое фото */}
      <div className={styles.mainImage}>
        <img src={selectedImage} alt="product" />
      </div>

      {/* миниатюры */}
      <div className={styles.thumbnails}>
        {visible.map((img, i) => {
          const isLast = i === visible.length - 1 && hasMore;
          return (
            <div key={i} className={styles.thumbWrapper}>
              <img
                src={img}
                alt="thumb"
                className={`${styles.thumbnail} ${selectedImage === img ? styles.active : ""}`}
                onClick={() => setSelectedImage(img)}
              />
              {isLast && (
                <div className={styles.more} onClick={handleMoreClick}>
                  +{rotated.length - maxThumbnails}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;

