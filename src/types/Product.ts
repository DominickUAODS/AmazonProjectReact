export type ProductCardSize = "big" | "small";

export interface ProductsList {
	id: string;
	name: string;
	price: number;
	discount: number | null;
	display: string;
	rating: number;
	comments: number;
	old_cost?: number;
}

export interface ProductDetail {
	property_key: string;
	attribute: string;
}

export interface ProductFeature {
	name: string;
	description: string;
}

export interface Product {
	name: string;
	code: string;
	categoryId: string;
	price: number;
	discount: number;
	number: number;
	displays: string[];
	details: ProductDetail[];
	features: ProductFeature[];
}