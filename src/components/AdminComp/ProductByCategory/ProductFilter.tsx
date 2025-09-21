import React, { useEffect, useRef, useState } from 'react';
import this_styles from './ProductFilter.module.css';
import styles from '../Products/Filters.module.css'
import type { Category } from '../../../types/Category';
import AllCategoriesDropDown from '../Products/AllCatgoriesDropdown';

interface ProductFilerProps {
	categoryFilter: string;
	setCategoryFilter: (value: string) => void;
	search: string;
	setSearch: (value: string) => void;
	categories: Category[];
}

  const ProductFilter: React.FC<ProductFilerProps> = ({ categoryFilter, setCategoryFilter, search, setSearch, categories }) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
    
	
	useEffect(() => {
	  const handleClickOutside = (event: MouseEvent) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
		  setIsOpen(false);
		}
	  };
	  document.addEventListener("mousedown", handleClickOutside);
	  return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
  
	return (
	  <div className={styles.filters}>
        <AllCategoriesDropDown
        isLegend={false}
        my_value={
			categories.find((cat) => cat.id === categoryFilter)?.name || "Choose category"
		  }
        onChange={(value) => setCategoryFilter(value)}
      />
		<div className={styles.inputWrapper}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13.986 14.1061C12.906 15.5221 10.416 16.2001 9.3 16.2001C5.82 16.2001 3 13.3801 3 9.9001C3 6.4201 5.82 3.6001 9.3 3.6001C12.78 3.6001 15.6 6.4201 15.6 9.9001C15.6 10.5841 15.492 11.2441 15.288 11.8621" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M21.0003 20.4L13.9863 14.106" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>

			<input
			type="text"
			placeholder="Search..."
			className={styles.input}
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	  </div>
	);
  };

export default ProductFilter;