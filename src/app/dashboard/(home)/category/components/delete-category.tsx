"use client";

import React, { FC } from "react";
import Swal from "sweetalert2";
import { deletCategory } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteCategoryProps {
  id: number;
}

const DeleteCategory: FC<DeleteCategoryProps> = ({ id }) => {
  const handleDeleteCategory = async () => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "Kategori ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085!",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (res.isConfirmed) {
      try {
        await deletCategory(id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Kategori telah berhasil dihapus",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        window.location.reload();
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Opps!",
          text: error.message,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <Button size={"sm"} variant={"destructive"} onClick={handleDeleteCategory} className="cursor-pointer">
      <Trash className="w-4 h-4"/>
      Delete
    </Button>
  );
};

export default DeleteCategory;
