"use client";

import { FC } from "react";
import Swal from "sweetalert2";
import { deleteContent } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteContentProps {
  id: number;
}

const DeleteContent: FC<DeleteContentProps> = ({ id }) => {
  const handleDeleteContent = async () => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "Konten ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085!",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (res.isConfirmed) {
      try {
        await deleteContent(id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Konten telah berhasil dihapus",
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
    <Button
      size={"sm"}
      variant={"destructive"}
      onClick={handleDeleteContent}
      className="cursor-pointer"
    >
      <Trash className="w-4 h-4" />
      Delete
    </Button>
  );
};

export default DeleteContent;
