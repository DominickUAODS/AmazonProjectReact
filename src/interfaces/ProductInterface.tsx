export default interface Product {
	id: string;
	title: string;
	image: string;
	reviews: number;
	rating: number;
	price: number;
	discount?: number;
	old_price?: number | null;
}



