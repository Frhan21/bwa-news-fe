export interface Content {
    id: number; 
    title: string; 
    description: string;
    excerpt: string;
    image: string;
    status: string;
    tags: string[];
    category_id: number;
    user_id: number;
    created_at: string; 
    author: string;
}

export interface ContentRequest {
    id: number; 
    title: string; 
    description: string;
    excerpt: string;
    image: string;
    status: string;
    tags: string[];
    category_id: number;
    user_id: number;
}