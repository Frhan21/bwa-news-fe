"use client";

import React, { FC, useEffect, useState } from "react";
import axiosInstance, { SetupInerceptor } from "../../../../../../../lib/axios";
import { Category } from "@/model/Category";
import { ApiResponse } from "@/model/ApiResponse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import FormCategory from "../../components/form-category";
import { useParams } from "next/navigation";

type Params = {
  id: number;
};

interface EditCategoryProps {
  params: Params;
}

const EditCategoryPage: FC<EditCategoryProps> = () => {
  SetupInerceptor();

  const params = useParams();
  const categoryId = params.id;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) {
        setError("Id Kategori tidak ditemukan");
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get<ApiResponse<Category>>(
          `/admin/categories/${categoryId}`
        );
        setCategory(res.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="mr-2 w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Edit Category</div>
      </div>
      <FormCategory type="EDIT" defaultValues={category} />
    </div>
  );
};

export default EditCategoryPage;
