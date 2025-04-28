import axiosInstance from "../../../../../../lib/axios";
import { ContentRequest } from "@/model/Content";

export const createContent = async(contentData: ContentRequest) => {
    try {
        const res = await axiosInstance.post("/admin/contents", contentData)
        return res.data 
    } catch (error) {
        throw error
    }

}

export const editContent = async(contentData: ContentRequest, id: number) => {
    try {
        const res = await axiosInstance.put(`/admin/contents/${id}`, contentData); 
        return res.data;
    } catch (error) {
        throw error; 
    }
}

export const deleteContent = async(id: number) => {
    try {
        const res = await axiosInstance.delete(`/admin/contents/${id}`)
        return res.data
    } catch (error) {
        throw error; 
    }
}

export const uploadImage = async (fileUpload: File) => {
    try {
        const newData = new FormData(); 
        newData.append("image", fileUpload); 
        const res = await axiosInstance.post("/admin/contents/upload", newData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
         

        return res.data; 
    } catch (error) {
        throw error
    }
}