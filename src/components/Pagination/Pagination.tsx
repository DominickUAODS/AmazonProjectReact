import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('. . .');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('. . .');
      pages.push(totalPages);
    }

    return pages;
  };



  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.7501 14.8799L19.7761 23.1959C19.2661 23.7239 19.2661 24.5639 19.7761 25.0919L27.7501 33.3839" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`${styles.page} ${
              page === currentPage ? styles.active : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}

      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.376 14.8799L28.35 23.1959C28.86 23.7239 28.86 24.5639 28.35 25.0919L20.376 33.3839" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
