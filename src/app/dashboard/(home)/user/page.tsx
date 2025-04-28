"use client";

import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import axiosInstance, {SetupInerceptor } from "../../../../../lib/axios";
import { useEffect, useState } from "react";
import { User } from "@/model/User";
import { ApiResponse } from "@/model/ApiResponse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FormUser from "./components/form-user";


const Page = () => {

    SetupInerceptor(); 

    const [user, setUser] = useState<User | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get<ApiResponse<User>>("/admin/users/profile");
                // console.log(res.data.data)
                setUser(res.data.data); 
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
                    Profile Page
                </div>
            </div>
            <FormUser defaultValues={user}/> 
        </>
    )
}

export default Page;