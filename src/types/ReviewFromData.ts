export type ProductCategoryMain={
    user_id:string;
    product_id:string;
    stars:number;
    title?:string | "";
}

export type ReviewTagKey = "0" | "1" | "2" | "3" | "4" | "5";

export interface ReviewCreateDto {
    user_id: string;        
    product_id: string;     
    stars: number;
    title: string;
    content: string; 
    published: string;      
    rewiew_tags?: number[];   
    rewiew_images?: string[];       
}