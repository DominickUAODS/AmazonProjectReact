import './ScrollToTopButton.css'
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';

function ScrollToTopButton() {
    const [visible, setVisible] = useState<boolean>(false);

    const handleScroll = () => {
        const position: number = window.pageYOffset;
        setVisible(position > 1);
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            className={`button button-icon button-primary button-scrolltotop ${visible ? "visible" : ""}`}
            onClick={scrollToTop}
        >
            <ReactSVG src='/icons/arrow_up.svg' />
        </button>
    );
}

export { ScrollToTopButton };
