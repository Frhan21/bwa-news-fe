import axiosInstance from "../../../../../../lib/axios"

export const createCategory = async (categoryData: any) => {
    try {
        const res = await axiosInstance.post("/admin/categories", categoryData);
        return res.data
    } catch (error) {
        throw error
    }
}