import { NextRequest, NextResponse } from "next/server";

export function middleware(requset: NextRequest) {
    const isLoggedIn = requset.cookies.get("AccessToken")?.value;
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", requset.url));
    }

    return NextResponse.next(); 
}

export const config = {
    matcher: ["/dashboard/:path*"],
}