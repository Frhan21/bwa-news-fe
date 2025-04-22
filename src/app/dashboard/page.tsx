"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter(); 

    useEffect(() => {
        const token = getCookie("AccessToken"); 
        if (!token) {
            router.push("/login");
        }
    }, [router])

    return (
        <div>
            <h1>dashboard page</h1>
        </div>
    )
}

export default Page;