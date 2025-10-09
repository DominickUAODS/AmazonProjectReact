import React, { useState } from "react";
import styles from "./ImgCarouselModal.module.css";
import commonStyles from '../common.module.css';
import prev_styles from "./ImageCarousel.module.css";

interface ImageCarouselProps {
  images: string[];
  initialIndex?: number;
  onClose?: () => void;
  show:boolean;
}

const ImageCarouselModal: React.FC<ImageCarouselProps> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose(); 
    }
  };

  return (
    <div className={commonStyles.modalBackdrop} onClick={handleOverlayClick}>
      <div className={styles.modal}>
      <button className={prev_styles.arrowLeft} onClick={prevSlide}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.7498 2.87891L7.77581 11.1949C7.26581 11.7229 7.26581 12.5629 7.77581 13.0909L15.7498 21.3829" stroke="#4A7BD9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
			</button>

        <img
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          className={styles.modalImage}
        />

        <button className={prev_styles.arrowRight} onClick={nextSlide}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.37598 2.87891L16.35 11.1949C16.86 11.7229 16.86 12.5629 16.35 13.0909L8.37598 21.3829" stroke="#4A7BD9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
		</button>

      </div>
    </div>
  );
};

export default ImageCarouselModal;