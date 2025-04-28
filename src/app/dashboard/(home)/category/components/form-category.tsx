"use client";


import { Category } from "@/model/Category";
import { FC, useEffect, useState } from "react";
import { SetupInerceptor } from "../../../../../../lib/axios";
import { useRouter } from "next/navigation";
import { categorySchema } from "../lib/validation";
import { createCategory, updateategory } from "../lib/action";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../../components/submit-button";

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Category | null;
}

const FormCategory: FC<FormCategoryProps> = ({ type, defaultValues }) => {
  SetupInerceptor();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [error, setError] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "EDIT" && defaultValues) {
      setTitle(defaultValues.title);
    }
  }, [defaultValues, type]);

  const handleCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    setIsLoading(true);
    try {
      const validation = categorySchema.safeParse({
        title: title,
      });
      if (!validation.success) {
        const errMsg = validation.error.issues.map((issue) => issue.message);
        setError(errMsg);
        return;
      }

      if (type == "ADD") {
        await createCategory({ title: title });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Kategori telah berhasil dibuat",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        setIsLoading(false);
        router.push("/dashboard/category");
      } else {
        if (defaultValues?.id) {
          await updateategory({ title: title }, defaultValues.id);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success",
            text: "Kategori telah berhasil diupdate",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });

          setIsLoading(false);
          router.push("/dashboard/category");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Opps!",
            text: "Id Kategori tidak ditemukan",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your work has been created",
        text: error.message,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });

      setError(
        error instanceof Error
          ? [error.message]
          : ["An unexpected error occurred"]
      );

      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleCategory} className="space-y-4">
        {error.length > 0 && (
          <div className="mx-auto my-7 bg-red-700">
            <div className="font-bold mb-4">
              <ul className="list-disc list-inside">
                {error.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="space-y-2 w-1/2">
          <Label htmlFor="title">Judul</Label>
          <Input
            placeholder="Judul... "
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <SubmitButton isLoading={isLoading} />
      </form>
    </>
  );
};

export default FormCategory;
