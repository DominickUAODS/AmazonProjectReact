import './Main.css';
import { ReactSVG } from 'react-svg';
import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'left' | 'right' | null;

function Main() {
  const banners = [
    '/img/banner_1.png',
    '/img/banner_2.png',
  ];

  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerImages, setBannerImages] = useState<number[]>([0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    const onScrollEnd = () => {
      if (scrollDirection !== 'right' && bannerRef.current?.scrollLeft !== 0) return;
      setBannerImages([currentIndex]);
      setScrollDirection(null);
    };
    bannerRef.current?.addEventListener('scrollend', onScrollEnd);
    return () => {
      bannerRef.current?.removeEventListener('scrollend', onScrollEnd);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (bannerImages.length === 1 || scrollDirection === null) return;
    if (scrollDirection === 'left') {
      if (!bannerRef.current) return;
      bannerRef.current.scrollBy({
        left: bannerRef.current.offsetWidth,
        behavior: 'instant',
      })
      bannerRef.current.scrollBy({
        left: -bannerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    } else {
      setTimeout(() => bannerRef.current?.scrollBy({
        left: bannerRef.current.offsetWidth,
        behavior: 'smooth',
      }), 5);
    }
  }, [bannerImages, scrollDirection])

  const scrollRight = () => {
    const nextIndex = (currentIndex + 1) % banners.length;
    setBannerImages([currentIndex, nextIndex]);
    setCurrentIndex(nextIndex);
    setScrollDirection('right');
  };

  const scrollLeft = () => {
    const prevIndex = (currentIndex - 1 + banners.length) % banners.length;
    setBannerImages([prevIndex, currentIndex]);
    setCurrentIndex(prevIndex);
    setScrollDirection('left');
  };
  
  return (
    <div className='main'>
      <div className='main-carousel'>
        <div className='main-carousel-banners' ref={bannerRef}>
          {bannerImages.map((value, index) => (
            <img key={index} src={banners[value]} alt={`banner-${value}`} />
          ))}
          </div>
        <div className='main-carousel-controls'>
          <button className='button button-icon button-tertiary main-carousel-button' onClick={scrollLeft}>
            <ReactSVG className='main-carousel-button-icon' src='/icons/arrow_left.svg' />
          </button>
          <button className='button button-icon button-tertiary main-carousel-button' onClick={scrollRight}>
            <ReactSVG className='main-carousel-button-icon' src='/icons/arrow_right.svg' />
          </button>
        </div>
      </div>
    </div>
  );
}

export { Main };
