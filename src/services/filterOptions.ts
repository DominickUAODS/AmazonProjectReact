export interface FilterOption {
    id: string;           // property_key_id
    name: string;         // property_key
    values: string[];     // уникальные атрибуты
}

export interface ProductDetailDto {
    property_key_id: string;
    property_key: string;
    attribute: string;
}



export function getFilterOptionsFromProducts(products: { details: ProductDetailDto[] }[]) {
    const temp: Record<string, { id: string; values: Set<string> }> = {};

    products.forEach(product => {
        product.details.forEach(detail => {
            if (!temp[detail.property_key]) {
                temp[detail.property_key] = { id: detail.property_key_id, values: new Set() };
            }
            temp[detail.property_key].values.add(detail.attribute);
        });
    });

    // Превращаем Set в массив и формируем массив объектов
    const result: FilterOption[] = Object.entries(temp).map(([name, { id, values }]) => ({
        id,
        name,
        values: Array.from(values),
    }));

    return result;
}