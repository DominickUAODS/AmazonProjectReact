export interface Category {
	id: string;
	image: string | null;
	icon: number | null;
	name: string;
	is_active: boolean;
	description: string;
	parent_id: string | null;
	subcategories: Category[];
	parentName?: string | null;
}


