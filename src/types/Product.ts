import type { Category } from "./Category";

export type ProductCardSize = "big" | "small";

export interface ProductsList {
	id: string;
	name: string;
	price: number;
	discount: number;
	displays: string;
	comments: number;
	old_cost?: number;
	stars: number;
	rating?: number | 0;
	display?: string;
}

export interface ProductDetail {
	property_key: string;
	attribute: string;
}

export interface ProductFeature {
	name: string;
	description: string;
}

export default interface Product {
	id: string;
	name: string;
	code: string;
	category_id: string;
	category: Category;
	price: number;
	discount?: number;
	old_price?: number;
	number: number;
	displays: string[];
	details: ProductDetail[];
	features: ProductFeature[];
	stars: number;
	comments: number;
}