import type { Category } from "../types/Category";

export async function fetchRootCategories(API_SERVER: string): Promise<Category[]> {
	try {
		const response = await fetch(`${API_SERVER}/category`);
		const data = await response.json();

		const flat: Category[] = data.map((cat: Category) => ({
			id: cat.id,
			image: cat.image,
			icon: cat.icon,
			name: cat.name,
			is_active: cat.is_active,
			description: cat.description,
			parent_id: cat.parent_id,
			subcategories: [],
		}));

		// Строим карту
		const map = new Map<string, Category>();
		flat.forEach((cat) => map.set(cat.id, { ...cat, subcategories: [] }));

		// Заполняем связи
		const roots: Category[] = [];
		flat.forEach((cat) => {
			if (cat.parent_id) {
				const parent = map.get(cat.parent_id);
				if (parent) {
					cat.parentName = parent.name;
					parent.subcategories.push(map.get(cat.id)!);
				}
			} else {
				roots.push(map.get(cat.id)!);
			}
		});

		return roots;
	} catch (error) {
		console.error("Ошибка загрузки категорий:", error);
		return [];
	}
}