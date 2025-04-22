"use client"

import { Button } from "@/components/ui/button";
import { Category } from "@/model/Category"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "actions",
    cell:({row}) => {
        const category = row.original; 
        return (
            <div className="inline-flex gap-5 items-center">
                <Button variant={"secondary"} size={"sm"} asChild>
                    <Link href={`/dashboard/category.edit/${category.id}`}>
                        <Pencil className="w-4 h-4 mr-4"/> Edit  
                    </Link>
                </Button>
            </div>
        )
    }
  },
]
