"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import axiosInstance, { SetupInerceptor } from "../../../../../lib/axios";
import { useEffect, useState } from "react";
import { Content } from "@/model/Content";
import { ApiResponse } from "@/model/ApiResponse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/column-table";

const Page = () => {
  SetupInerceptor();

  const [contents, setContents] = useState<Content[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get<ApiResponse<Content[]>>("/admin/contents")
                setContents(res.data.data); 
                setIsLoading(false); 
            } catch (error: any) {
                setError(error.message || "Error fetching data")
                setIsLoading(false);
            }
        }; 
        fetchData();
    }, []); 

    if(isLoading) {
        return <div>Loading data.....</div>
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
        <div className="my-5 text-2xl font-bold">Content Page</div>
        <Button asChild variant={"default"}>
          <Link href={"/dashboard/content/create"} className="">
            <Plus className="mr-2 w-4 h-4" />
            Tambah Konten disini !
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={contents}/> 
    </>
  );
};

export default Page;
