import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Layers3, User } from "lucide-react";
import ButtonLogout from "./(home)/components/button-logout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Admin News Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <section>
          <nav className="border-b border-gray-200 bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex-row items-center justify-between flex">
              <span className="font-bold text-primary">
                Dashboard Admin News Portal
              </span>
            </div>
          </nav>
          <section className="flex flex-row gap-5 items-start flex-nonwrap">
            <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5 bg-white">
              <div className="space-y-2">
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link
                    href={"/dashboard"}
                    className="text-primary hover:text-primary-focus"
                  >
                    Dashboard
                  </Link>
                </Button>
              </div>

              <div className="space-y-2">
                <div className="uppercase text-xs font-bold">
                  Master Data
                </div>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/category"}>
                    <Layers3 className="mr-2 w-4 h-4"/>
                    Category
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/content"}>
                    <BookOpen className="mr-2 w-4 h-4"/>
                    Contents
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/user"}>
                    <User className="mr-2 w-4 h-4"/>
                    User
                  </Link>
                </Button>
                
                <ButtonLogout/> 
              </div>
            </section>
            <section className="grow h-[87vh] mt-5 mr-5 overflow-y-auto">
              {children}
            </section>
          </section>
        </section>
      </body>
    </html>
  );
}
