export interface Meta {
    status: boolean; 
    message: string;
}

export interface ApiResponse<T> {
    meta: Meta; 
    data: T; 
    pagination?: Pagination;
}

export interface Pagination {
    total_records: number; 
    per_page: number; 
    current_page: number; 
    total_pages: number; 
}