import { z } from "zod";

export const contentSchema = z.object({
    title: z.string({required_error:"Field judul wajib diisi"}), 
    excerpt: z.string({required_error:"Field Kutipan wajib diisi"}),
    description: z.string({required_error: "Field deksripsi wajib diisi"}),
    category_id: z.string({required_error: "Kategori wajib diisi"})
})