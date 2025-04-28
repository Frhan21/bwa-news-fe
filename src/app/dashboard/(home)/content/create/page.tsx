"use client";

import { Category } from "@/model/Category";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import FormContent from "../components/form-content";

const Page = () => {
  const [category, setCatogory] = useState<Category[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse<Category[]>>(
          "/admin/categories"
        );
        setCatogory(res.data.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Tambah Kategori</div>
      </div>
      <FormContent categoryList={category} type="ADD" />
    </div>
  );
};

export default Page;
