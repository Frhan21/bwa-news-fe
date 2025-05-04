"use client";

import React, { use, useEffect, useState } from "react";
import axiosInstance from "../../../../../lib/axios";
import Swal from "sweetalert2";
import { ApiResponse } from "@/model/ApiResponse";
import { Content } from "@/model/Content";
import Link from "next/link";
import Image from "next/image";

type Params = {
  id: number;
};

interface ContentDetailsProp {
  params: Promise<Params>;
}

const Page = ({ params }: ContentDetailsProp) => {
  const resolvedParams = use(params);
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse<Content>>(
          `/fe/contents/${resolvedParams.id}`
        );
        setContent(res.data.data);
      } catch (error: any) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oppss!!",
          text: error.message ?? "Error fetching data !",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
    fetchData();
  }, [resolvedParams.id]);
  return (
    <div>
      <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0">
        <div className="mx-auto max-w-screen-md">
          <div className="flex justify-center">
            <div className="flex gap-3">
              <Link href={`/category/${content?.category_id}`}>
                <span className="inline-block text-sx font-medium tracking-wider uppercase mt-5 text-blue-500">
                  {content?.category}
                </span>
              </Link>
            </div>
          </div>
          <h2 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug">
            {content?.title}
          </h2>
        </div>
        <div className="mt-3 flex justify-center space-x-3 text-gray-500">
          <div className="flex items-center gap-3">
            <p className="text-gray-800">{content?.user}</p>
            <div className="flex items-center space-x-2 text-sm">
              <time dateTime={content?.created_at} className="truncate text-sm">
                {content?.created_at
                  ? new Date(content.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </time>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0 mx-auto aspect-ratio max-w-screen-lg overflow-hidden lg:rounded-lg">
        {content?.image != "" && (
          <Image
            src={content?.image || "https://placehold.co/600x400"}
            alt={content?.title || "Default alt text"}
            className="object-cover transition-all"
            sizes="100vw"
            fill={true}
            unoptimized
          />
        )}
      </div>
      <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 !pt-0">
        <article className="mx-auto max-w-screen-md">
          <div className="prose mx-auto my-3 text-justify">
            {content?.description}
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href={`/content-all`}
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600"
            >
              Lihat semua konten
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Page;
