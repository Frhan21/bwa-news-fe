"use client";

import { useParams, useRouter } from "next/navigation";
import React, { FC, use, useEffect, useState } from "react";
import axiosInstance, { SetupInerceptor } from "../../../../../../../lib/axios";
import { Content } from "@/model/Content";
import { ApiResponse } from "@/model/ApiResponse";
import { Category } from "@/model/Category";
import FormContent from "../../components/form-content";

interface Params {
  id: number;
}

interface EditContentProps {
  params: Promise<Params>;
}

const EditContentPage: FC<EditContentProps> = ({ params }) => {
  SetupInerceptor();
  const router = useRouter();
  //   const params = useParams();
  //   const contentId = params.id;
  const resolvedParams = React.use(params);
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!resolvedParams.id) {
        setError("Id Konten tidak ditemukan");
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get<ApiResponse<Content>>(
          `/admin/contents/${resolvedParams.id}`
        );
        setContent(res.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse<Category[]>>(
          `/admin/categories`
        );
        setCategoryList(res.data.data);
      } catch (error: any) {
        setError(error.message || "Error Fetching Data");
      }
    };

    fetchCategory();
    fetchData();
  }, [resolvedParams.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <FormContent
        type="EDIT"
        defaultValues={content}
        categoryList={categoryList}
      />
    </div>
  );
};

export default EditContentPage;
