"use client"

import { Button } from "@/components/ui/button";
import { Category } from "@/model/Category"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Content } from "@/model/Content";
import DeleteContent from "./delete-content";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "excerpt",
    header: "Kutipan",
  },
  {
    accessorKey: "image", 
    header: "Gambar", 
    cell:({row}) => {
        const content = row.original; 
        return (
            <div className="flex items-center">
                <img src={content.image} alt={content.title} width={100} height={100}/>
            </div>
        )
    }
  },
  {
    accessorKey: "category", 
    header: "Kategory"
  },
  {
    accessorKey: "user", 
    header: "Author", 
  },
  {
    accessorKey: "status", 
    header: "Status", 
  },
  {
    accessorKey: "actions",
    cell:({row}) => {
        const content = row.original; 
        return (
            <div className="inline-flex gap-5 items-center">
                <Button variant={"secondary"} size={"sm"} asChild>
                    <Link href={`/dashboard/content/edit/${content.id}`}>
                        <Pencil className="w-4 h-4 mr-4"/> Edit  
                    </Link>
                </Button>
                <DeleteContent id={content.id}/> 
            </div>
        )
    }
  },
]
