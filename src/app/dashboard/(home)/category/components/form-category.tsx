"use client"
import { Category } from "@/model/Category"
import { FC, useState } from "react"
import axiosInstance, { SetupInerceptor } from "../../../../../../lib/axios"
import { useRouter } from "next/navigation"
import { categorySchema } from "../lib/validation"
import { createCategory } from "../lib/action"
import Swal from "sweetalert2"

 


interface FormCategoryProps {
    type?: "ADD" | "EDIT", 
    defaultValues?:Category | null
}

const FormCategory: FC<FormCategoryProps> = ({type, defaultValues}) => {
    SetupInerceptor(); 
    const router = useRouter(); 

    const [title, setTitle] = useState("")
    const [error, setError ] = useState<string[]>([])

    const handleCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        setError([])
        try {
            const validation  = categorySchema.safeParse({
                title: title, 
            })
            if (validation.success) {
                const errMsg = validation.error.issues.map((issue) => issue.message)
                setError(errMsg)
                return; 
            }

            await createCategory({title: title});
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been created",
                toast: true, 
                showConfirmButton: false,
                timer: 1500
              });
        } catch (error) {
            
        }
    }

}