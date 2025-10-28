import React, { useEffect, useRef } from "react";
import "./FilterPanel.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import Slider from 'bootstrap-slider';
import type { FilterOption } from "../../services/filterOptions";

export interface FiltersPanelProps {
	filterOptions: FilterOption[];
	openFilters: Record<string, boolean>;
	filters: Record<string, string[]>;
	priceRange: [number, number];
	selectedRating: number | null;
	setOpenFilters: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
	setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
	setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>;
	handleFilterChange: (key: string, selected: string[]) => void;
	filterTags: string[];
	selectTagOpen: boolean;
	setSelectTagOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
	handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FiltersPanel({
	filterOptions,
	openFilters,
	filters,
	priceRange,
	selectedRating,
	setOpenFilters,
	setPriceRange,
	setSelectedRating,
	handleFilterChange,
	//filterTags,
	//selectTagOpen,
	//setSelectTagOpen,
	setFilters,
	//handleMinChange,
	//handleMaxChange,
}: FiltersPanelProps) {
	const sliderRef = useRef<HTMLInputElement | null>(null);


	useEffect(() => {
		if (!sliderRef.current) return;

		const slider = new Slider(sliderRef.current as HTMLElement, {
			min: priceRange[0],
			max: priceRange[1],
			value: priceRange,
			tooltip: "hide",
			range: true,
		});

		slider.on("slide", (val: number | [number, number]) => {
			if (Array.isArray(val)) {
				setPriceRange(val);
			}
		});

		return () => slider.destroy();
	}, [priceRange, setPriceRange]);

	return (
		<div className='product-list-filters-container'>
			<div className="custom-select-wrapper-mobile">
				<>
					<div className="my-select-list">
						<div className="tags-in-list mobile-tags">
							{Object.entries(filters).flatMap(([key, values]) =>
								values.map((val, index) => (
									<div key={`${key}-${val}-${index}`} className="custom-select-item">
										<span>{val}</span>
										<button
											className="remove-btn"
											onClick={(e) => {
												e.stopPropagation();
												handleFilterChange(
													key,
													filters[key].filter(v => v !== val)
												);
											}}
										>
											✕
										</button>
									</div>
								))
							)}
						</div>
						{Object.values(filters).some((arr) => arr.length > 0) && (
							<button
								className="clear-all-btn"
								onClick={(e) => {
									e.stopPropagation();
									const cleared = Object.fromEntries(
										Object.keys(filters).map((k) => [k, []])
									);
									setFilters(cleared);
								}}
							>
								Clear all
							</button>
						)}
					</div>
				</>

			</div>
			{filterOptions.map((opt, idx) => {
				const isOpen = openFilters[opt.name] || false;

				return (
					<div key={idx} className='input-container bg-objects'>
						<div
							className='name-drop'
							onClick={() => setOpenFilters(prev => ({ ...prev, [opt.name]: !prev[opt.name] }))}
						>
							<span className='option-name'>{opt.name}</span>
							<svg
								width="24" height="24" viewBox="0 0 24 24" fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className={`arrow ${isOpen ? 'open' : ''}`}
							>
								<path d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702"
									stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>

						{isOpen && (
							<>
								<div className='input-search-wrapper'>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M13.986 14.1056C12.906 15.5216 10.416 16.1996 9.3 16.1996C5.82 16.1996 3 13.3796 3 9.89961C3 6.41961 5.82 3.59961 9.3 3.59961C12.78 3.59961 15.6 6.41961 15.6 9.89961C15.6 10.5836 15.492 11.2436 15.288 11.8616" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M21 20.4004L13.986 14.1064" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>

									<input type='text' placeholder='Search...' />
								</div>

								<div className="option-values">
									{opt.values.map((val, i) => {
										const isSelected = filters[opt.name]?.includes(val);
										return (
											<label key={i} className={`option-value ${isSelected ? 'selected' : ''}`}>
												<input
													type="checkbox"
													checked={isSelected}
													onChange={() => {
														const newSelected = isSelected
															? filters[opt.name].filter(v => v !== val)
															: [...(filters[opt.name] || []), val];
														handleFilterChange(opt.name, newSelected);
													}}
												/>
												<span className="option-text">{val}</span>
											</label>
										);
									})}
								</div>
							</>
						)}
					</div>
				);
			})}
			<div className="input-container bg-objects">
				<div className="name-drop" onClick={() => setOpenFilters(prev => ({ ...prev, Price: !prev.Price }))}>
					<span className="option-name">Price</span>
					<svg
						width="24" height="24" viewBox="0 0 24 24" fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={`arrow ${openFilters["Price"] ? "open" : ""}`}
					>
						<path d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702"
							stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>

				{openFilters["Price"] && (
					<div className="price-filter">
						<div className="price-inputs-button">
							<div className="price-inputs">
								<input
									type="number"
									value={priceRange[0]}
									className='input-min-max'
									onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
								/>
								<svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1 1H17" stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" />
								</svg>

								<input
									type="number"
									value={priceRange[1]}
									className='input-min-max'
									onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
								/>
								<button
									className={"button save-btn"}
									onClick={() => console.log("Saved price range:", priceRange)}
								>
									Save
								</button>
							</div>

						</div>


						<input
							ref={sliderRef}
							type="text"
							className="slider"
							data-slider-min={priceRange[0]}
							data-slider-max={priceRange[1]}
							data-slider-value={JSON.stringify(priceRange)}
						/>
					</div>
				)}
			</div>
			<div className="input-container bg-objects">
				<div
					className="name-drop"
					onClick={() => setOpenFilters(prev => ({ ...prev, Rating: !prev.Rating }))}
				>
					<span className="option-name">Customer reviews</span>
					<svg
						width="24" height="24" viewBox="0 0 24 24" fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={`arrow ${openFilters["Rating"] ? "open" : ""}`}
					>
						<path d="M21.252 15.8702L12.936 7.89617C12.408 7.38617 11.568 7.38617 11.04 7.89617L2.74805 15.8702"
							stroke="#0E2042" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>

				{openFilters["Rating"] && (
					<div className="rating-filter">
						{[5, 4, 3, 2, 1].map(stars => (
							<label key={stars} className="rating-option">
								<input
									type="checkbox"
									checked={selectedRating === stars}
									onChange={() => setSelectedRating(selectedRating === stars ? null : stars)}
								/>
								{Array.from({ length: 5 }, (_, i) => (
									<span key={i} className="svg-star">
										{i < stars ? (
											// ЗАКРАШЕННАЯ звезда
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M7.69799 20.4053C6.87599 20.9993 5.77799 20.2013 6.08999 19.2353L7.41599 15.1433C7.60199 14.5673 7.39799 13.9373 6.90599 13.5833L3.42599 11.0573C2.60399 10.4633 3.02999 9.16727 4.03799 9.16727H8.33999C8.94599 9.16727 9.47999 8.77727 9.66599 8.20127L10.992 4.10927C11.304 3.14327 12.666 3.14327 12.984 4.10927L14.31 8.20127C14.496 8.77727 15.036 9.16727 15.636 9.16727H19.938C20.952 9.16727 21.372 10.4633 20.55 11.0573L17.07 13.5833C16.578 13.9373 16.374 14.5673 16.56 15.1433L17.886 19.2353C18.198 20.2013 17.094 20.9993 16.278 20.4053L13.02 17.7953C12.528 17.3993 11.832 17.3873 11.322 17.7533L7.67999 20.4053H7.69799Z"
													fill="#0E2042" stroke="#0E2042" strokeWidth="1.5"
													strokeLinecap="round" strokeLinejoin="round"
												/>
											</svg>
										) : (
											// ПУСТАЯ звезда
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M11.55 17.6093L7.70397 20.4053C6.88197 20.9993 5.78397 20.2013 6.09597 19.2353L7.42197 15.1433C7.60797 14.5673 7.40397 13.9373 6.91197 13.5833L3.43197 11.0573C2.60997 10.4633 3.03597 9.16727 4.04397 9.16727H8.34597C8.95197 9.16727 9.48597 8.77727 9.67197 8.20127L10.998 4.10927C11.31 3.14327 12.672 3.14327 12.99 4.10927L14.316 8.20127C14.502 8.77727 15.042 9.16727 15.642 9.16727H19.944C20.958 9.16727 21.378 10.4633 20.556 11.0573L17.076 13.5833C16.584 13.9373 16.38 14.5673 16.566 15.1433L17.892 19.2353C18.204 20.2013 17.1 20.9993 16.284 20.4053"
													stroke="#0E2042" strokeWidth="1.5"
													strokeLinecap="round" strokeLinejoin="round"
												/>
											</svg>
										)}
									</span>
								))}
							</label>
						))}
					</div>
				)}
			</div>

		</div>
	);
}