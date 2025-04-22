export interface Meta {
    status: boolean; 
    message: string;
}

export interface ApiResponse<T> {
    meta: Meta; 
    data: T; 
}

