"use client";

import { Content } from "@/model/Content";
import { FC, useEffect, useState } from "react";
import { SetupInerceptor } from "../../../../../../lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../../components/submit-button";
import { Category } from "@/model/Category";
import { contentSchema } from "../lib/validation";
import { createContent, editContent, uploadImage } from "../lib/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FormContentProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Content | null;
  categoryList?: Category[];
}

const FormContent: FC<FormContentProps> = ({
  type,
  defaultValues,
  categoryList,
}) => {
  SetupInerceptor();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoriesId, setCategoriesId] = useState(
    defaultValues ? defaultValues.category_id.toString() : ""
  );
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState(
    defaultValues ? defaultValues.status : ""
  );
  const [previewImage, setPreviewImage] = useState(
    defaultValues ? defaultValues.image : ""
  );

  const statusList = [
    { value: "Published", label: "Published" },
    { value: "Draft", label: "Draft" },
  ];
  const [error, setError] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setImage(file);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategoriesId(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  useEffect(() => {
    if (categoryList) {
      setCategories(categoryList);
    }
  }, [categoryList]);

  useEffect(() => {
    if (type === "EDIT" && defaultValues) {
      setTitle(defaultValues.title);
      setDescription(defaultValues.description); 
      setExcerpt(defaultValues.excerpt);
      setCategoriesId(defaultValues.category_id.toString());
      setTags(defaultValues.tags.toString());
      setStatus(defaultValues.status);
      setPreviewImage(defaultValues.image);
    }  
  }, [type, defaultValues])

  const handleContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    setIsLoading(true);
    try {
      const validation = contentSchema.safeParse({
        title: title,
        description: description,
        excerpt: excerpt,
        category_id: categoriesId,
      });
      if (!validation.success) {
        const errMsg = validation.error.issues.map((issue) => issue.message);
        setError(errMsg);
        return;
      }

      if (type == "ADD") {
        if (!image) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Opps!",
            text: "Gambar harus di upload",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });

          return;
        }

        setIsUpload(true);
        const imageUrl = await uploadImage(image);

        await createContent({
          title: title,
          description: description,
          excerpt: excerpt,
          image: imageUrl.data.urlImage,
          category_id: Number(categoriesId),
          tags: tags,
          status: status,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Konten telah berhasil dibuat",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        setIsLoading(false);
        router.push("/dashboard/content");
      }

      let imageUrl;
      if (!image) {
        imageUrl = previewImage;
      } else {
        setIsUpload(true);
        imageUrl = await uploadImage(image);
      }

      if (defaultValues?.id) {
        await editContent(
          {
            title: title,
            description: description,
            excerpt: excerpt,
            image: imageUrl.data? imageUrl.data.urlImage : imageUrl,
            category_id: Number(categoriesId),
            tags: tags,
            status: status,
          },
          defaultValues?.id
        );

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          text: "Konten telah berhasil diupdate",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/dashboard/content");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oppss!",
          text: "Kategori id wajib diisi",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        window.location.reload(); 
      }
    } catch (error: any) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your work cannot created",
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
    } finally {
      setIsUpload(false);
    }
  };

  return (
    <>
      <form onSubmit={handleContent} className="space-y-4">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Pilih Kategori</Label>
            <Select
              name="categoryId"
              value={categoriesId}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Pilih Kategori" />
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <div className="space-y-2">
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="excerpt">Kutipan</Label>
            <Input
              placeholder="Kutipan"
              id="excerpt"
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tag</Label>
            <Input
              placeholder="Gunakan separater (,) untuk pemisah...."
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Konten</Label>
            <Textarea
              placeholder="Isi deskripsi konten mu disini..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></Textarea>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Gambar</Label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Statu Kontent" />
              </SelectTrigger>
              <SelectContent>
                {statusList.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="previewImage">Preview Gambar</Label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview Image"
                className="w-[200px] h-[200px]"
              />
            )}
          </div>
          <div className="space-y-2">
            <SubmitButton isLoading={isLoading} />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormContent;
