"use client";

import { Category } from "@/model/Category";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import {
  MenuButton,
  MenuItem,
  MenuItems,
  Menu as MenuList,
} from "@headlessui/react";
import { ChevronDownIcon, X, Menu } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse<Category[]>>(
          "/fe/categories"
        );
        setCategories(res.data.data);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oopps!",
          text: error.message,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
      <nav>
        <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
          <div className="order-1 hidden w-full flex-col items-center justify-center md:order-none md:flex md:w-auto md:flex-row md:justify-start">
            <Link href={"/"} className="w-28">
              <Image
                alt="logo"
                src={"/img/news-logo.png"}
                width={132}
                height={52}
              />
            </Link>
            <Link
              href={"/"}
              className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500"
            >
              Home
            </Link>
            <MenuList as={"div"} className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-ceneter gap-x-1.5 bg-white px-3 py-2 text-sm font-medium ring-inset text-gray-900 ring-gray-300 hover:bg-gray-50">
                  <span className="font-medium hover:text-blue-500 cursor-pointer">
                    Kategori
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-100 transition"
              >
                <div className="py-1">
                  {categories.map((category) => (
                    <MenuItem key={category.id}>
                      <Link
                        href={`/category/${category.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 font-medium hover:text-blue-400"
                      >
                        {category.title}
                      </Link>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </MenuList>
          </div>

          {/* Section Mobile View */}
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link href={"/"} className="w-20 md:hidden">
              <Image
                alt="logo"
                src={"/img/news-logo.png"}
                width={132}
                height={52}
              />
            </Link>
            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 hover:text-blue-500 focus:outline-none md:hidden focus:bg-transparent"
            >
              {menuOpen && <X color="gray" />}

              {!menuOpen && <Menu aria-hidden="true" color="gray" />}
            </Button>
          </div>
          {menuOpen && (
            <div className=" mt-4 flex w-full flex-col items-start justify-start md:hidden">
              <Link
                href={"/"}
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500"
              >
                Home
              </Link>
              <MenuList as={"div"} className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center  bg-white px-3 py-2 text-sm font-medium ring-inset text-gray-900 ring-gray-300 hover:bg-gray-50">
                    Kategori
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-100 transition"
                >
                  <div className="py-1">
                    {categories.map((category) => (
                      <MenuItem key={category.id}>
                        <Link
                          href={""}
                          className="block px-4 py-2 text-sm text-gray-700 font-medium hover:text-blue-400"
                        >
                          {category.title}
                        </Link>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </MenuList>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
