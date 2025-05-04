"use client";
import { ApiResponse, Pagination } from "@/model/ApiResponse";
import { Content } from "@/model/Content";
import React, { use, useEffect, useState } from "react";
import axiosInstance from "../../../../../lib/axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Params = {
  id: number;
};

interface ContentByCategory {
  params: Promise<Params>;
}

const Page = ({ params }: ContentByCategory) => {
  const resolvedParams = use(params);
  const [contents, setContents] = useState<Content[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page: number = 1) => {
    try {
      const res = await axiosInstance.get<ApiResponse<Content[]>>(
        `/fe/contents?category_id=${resolvedParams.id}&limit=1&page=${page}`
      );
      setContents(res.data.data);
      setPagination(res.data.pagination ?? null);
    } catch (error: any) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oppss!!",
        text: error.message,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (pagination && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="container px-4 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug">
          Konten
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg">Lihat semua konten</p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {contents.map((content, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105">
                <Link href={`/details/${content.id}`} className="relative blcok aspect-video">
                  {content.image != "" && (
                    <Image
                      src={content.image}
                      alt={content.title}
                      className="object-cover transition-all w-screen"
                      width={600}
                      height={400}
                      unoptimized
                    />
                  )}

                  {content.image == "" && (
                    <img
                      src="https://placehold.co/600x400"
                      className="object-cover transition-all"
                      alt="data"
                    />
                  )}
                </Link>
              </div>
              <div>
                <div className="flex gap-3 ">
                  <Link
                    href={`/category/${content.category_id}`}
                    className="inline-block text-sx font-medium tracking-wider uppercase mt-5 text-blue-500"
                  >
                    {content.category}
                  </Link>
                </div>
                <h2 className="text-lg font-semibold leading-snug tracking-tight">
                  <Link href={`/details/${content.id}`}>
                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px]">
                      {content.title}
                    </span>
                  </Link>
                </h2>
                <div className="flex items-center space-x-3 text-gray-500">
                  <Link href={""}>
                    <div className="flex items-center gap-3">
                      <div className="relative h-5 w-5 flex-shrink-0">
                        <img
                          src="https://placehold.co/32x32"
                          className="h-full w-full rounded-full"
                          alt="author"
                        />
                      </div>
                      <span className="truncate text-sm">{content.user}</span>
                    </div>
                  </Link>
                  <span className="text-xs text-gray-300 ">.</span>
                  <time
                    dateTime={content.created_at}
                    className="truncate text-sm"
                  >
                    {new Date(content.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
        {pagination && (
          <div className="mt-10 flex items-center justify-center">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-50">
              <Button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft className="h-3 w-3 stroke1" />
              </Button>

              <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 focus:z-20">
                {currentPage}
              </div>

              <Button
                disabled={pagination.total_pages <= currentPage}
                onClick={handleNextPage}
                className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowRight className="h-3 w-3 stroke1" />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
