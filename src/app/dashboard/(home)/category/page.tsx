"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import axiosInstance, {SetupInerceptor } from "../../../../../lib/axios";
import { useEffect, useState } from "react";
import { Category } from "@/model/Category";
import { ApiResponse } from "@/model/ApiResponse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { columns } from "./components/columns-table";


const Page = () => {

    SetupInerceptor(); 

    const [categories, setCategories] = useState<Category[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories");
                console.log(res.data.data)
                setCategories(res.data.data); 
                setLoading(false)
            } catch (error:  any) {
                setError(error.message || "Error fetching data")
                setLoading(false)
            }
        }

        fetchData(); 
    }, [])

    if(loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="mr-2 w-4 h-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }
    
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">
                    Category Page
                </div>
                <Button asChild variant={"default"}>
                    <Link href={"/dashboard/category/create"} className="">
                       <Plus className="mr-2 w-4 h-4"/>
                        Tambah Kategori disini !
                    </Link>
                </Button>
            </div>
            <DataTable  columns={columns} data={categories}/> 
        </>
    )
}

export default Page;