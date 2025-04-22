"use client";

import { Button } from "@/components/ui/button"
import { deleteCookie } from "cookies-next"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const ButtonLogout = () => {
    const router = useRouter()
    const handleLogout = () => {
        deleteCookie("AccessToken")
        router.push("/login")
    }

    return (
        <div className="space-y-2">
            <form action={handleLogout}>
                <Button type="submit" variant={"destructive"} className="cursor-pointer w-full justify-start"> 
                    <LogOut className=" h-4 w-full"/> 
                    Log out
                </Button>
            </form>
        </div>
    )
}

export default ButtonLogout; 