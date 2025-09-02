type ProductCardSize = "big" | "small";

export type Product = {
  id: string;
  name: string;
  price: number;
  discount: number | null;
  display: string;
  rating: number;
  comments: number;
  old_cost?: number;
}
