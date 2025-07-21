export default interface Product {
	id: number;
	title: string;
	image: string;
	reviews: number;
	rating: number;
	price: number;
	discount?: boolean;
	oldPrice?: number | null;
}



