export interface User {
    id: number ;
    name: string; 
    email: string;
    password: string; 
}


export interface UpdatePasswordRequest {
    current_password: string; 
    new_password: string; 
    confirm_password: string; 
}