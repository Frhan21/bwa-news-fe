import axiosInstance from "../../../../../../lib/axios"

export const createCategory = async (categoryData: any) => {
    try {
        const res = await axiosInstance.post("/admin/categories", categoryData);
        return res.data
    } catch (error) {
        throw error
    }
}


export const updateategory = async (categoryData: any , id: number) => {
    try {
        const res = await axiosInstance.put(`/admin/categories/${id}`, categoryData);
        return res.data
    } catch (error) {
        throw error
    }
}


export const deletCategory = async (id: number) => {
    try {
        const res = await axiosInstance.delete(`/admin/categories/${id}`);
        return res.data
    } catch (error) {
        throw error; 
    }
}