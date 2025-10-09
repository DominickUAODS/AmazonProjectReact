import React, { useState } from "react";
import styles from "./ImageCarousel.module.css";
import ImageCarouselModal from "./ImgCarouselModal";

interface ImageCarouselProps {
	images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isShow, setShow] = useState<boolean>(false);

	const prevSlide = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? images.length - 1 : prev - 1
		);
	};

	const nextSlide = () => {
		setCurrentIndex((prev) =>
			prev === images.length - 1 ? 0 : prev + 1
		);
	};

	return (
		<div className={styles.carousel}>
			{/* Главное изображение */}
			<div className={styles.mainImage}>
				<button className={styles.arrowLeft} onClick={prevSlide}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.7498 2.87891L7.77581 11.1949C7.26581 11.7229 7.26581 12.5629 7.77581 13.0909L15.7498 21.3829" stroke="#4A7BD9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				<img src={images[currentIndex]} onClick={() => setShow(true)}  alt={`slide-${currentIndex}`} />
				<button className={styles.arrowRight} onClick={nextSlide}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.37598 2.87891L16.35 11.1949C16.86 11.7229 16.86 12.5629 16.35 13.0909L8.37598 21.3829" stroke="#4A7BD9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>

			{/* Превьюшки */}
			<div className={styles.thumbnails}>
				{images.map((img, index) => (
					<img
						key={index}
						src={img}
						alt={`thumb-${index}`}
						className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ""
							}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>

			{isShow && (
				<ImageCarouselModal
				images={images}
				initialIndex={currentIndex}
				show={isShow}
				onClose={() => setShow(false)} // закрытие модалки
				/>
			)}
		</div>
	);
};

export default ImageCarousel;