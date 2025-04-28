import { UpdatePasswordRequest } from "@/model/User";
import axiosInstance from "../../../../../../lib/axios";

export const updatePassword = async(updatePassword: UpdatePasswordRequest) => {
    try {
        const res = await axiosInstance.put('/admin/users/update-password', updatePassword)
        return res.data
    } catch (error) {
        throw error;
    }
}