import { z } from "zod";

export const categorySchema = z.object({
    title: z.string({required_error: "Title wajib diisi"})
})