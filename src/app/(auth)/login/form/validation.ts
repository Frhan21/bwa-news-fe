import { z } from "zod";

export const formSchema = z.object({
    email: z.string({required_error: "Email must be filled"}).email("Invalid email address"),
    password: z.string({required_error: "Password must be fill"}).min(8, "Password must be at least 6 characters long"),
})