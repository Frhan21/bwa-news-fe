"use client";

import { Button } from "@/components/ui/button";
import { Content } from "@/model/Content";
import { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [contents, setContent] = useState<Content[]>([]);
  const [sliceData, setSliceData] = useState<Content[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse<Content[]>>(
          "/fe/contents?limit=8"
        );
        const slice = res.data.data.slice(0, 2);
        setContent(res.data.data);
        setSliceData(slice);
        setContent((prevContent) => prevContent.slice(2));
      } catch (error: any) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oppss!!",
          text: "Error fetching data !",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
        {sliceData.map((content) => (
          <div className="group cursor-pointer" key={content.id}>
            <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 ">
              <Link className="relative block aspect-video" href={`/details/${content.id}`}>
                <Image
                  src={content.image}
                  alt={content.title}
                  className="object-cover transition-all"
                  fill={true}
                  sizes="(max-width: 768px) 30vw, 33vw "
                  unoptimized
                />
              </Link>
            </div>
            {/* Section judul, category, dan author content */}
            <div>
              <div className="flex flex-col gap-3">
                {/* Category */}
                <Link href={`/category/${content.category_id}`}>
                  <span className="inline-block text-sx font-medium tracking-wider uppercase mt-5 text-blue-500">
                    {content.category}
                  </span>
                </Link>
                {/* Title content */}
                <h2 className="text-lg font-semibold leading-snug tracking-tight">
                  <Link href={`/details/${content.id}`}>
                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px]">
                      {content.title}
                    </span>
                  </Link>
                </h2>

                {/* Author content */}
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
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {contents.map((content) => (
          <div className="group cursor-pointer" key={content.id}>
            <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105">
              <Link className="relative block aspect-video" href={""}>
                {content.image != " " && (
                  <Image
                    src={content.image}
                    alt={content.title}
                    width={600}
                    height={400}
                    className="object-cover transition-all"
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
              <div className="flex flex-col gap-3">
                {/* Category */}
                <Link href={`/category/${content.category_id}`}>
                  <span className="inline-block text-sx font-medium tracking-wider uppercase mt-5 text-blue-500">
                    {content.category}
                  </span>
                </Link>
                {/* Title content */}
                <h2 className="text-lg font-semibold leading-snug tracking-tight">
                  <Link href={"/"}>
                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px]">
                      {content.title}
                    </span>
                  </Link>
                </h2>

                {/* Author content */}
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
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link href={"/content-all"} className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
          <span>
            See all post
          </span>
        </Link>
      </div>
    </div>
  );
}
