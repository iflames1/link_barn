import { checkUserExists } from "@/lib/queries";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const validateuser = async (request: NextRequest) => {
  let response = NextResponse.next({
    request,
  });

  const cookieStore = cookies();
  const uuid = cookieStore.get("uuid")?.value;
  const valid = await checkUserExists("uuid", uuid as string);
  console.log("IT IS IIII", valid);
  // Allow access to auth callback without redirects
  // if (request.nextUrl.pathname.startsWith("/auth/callback")) {
  //   return supabaseResponse;
  // }

  if (
    uuid &&
    valid.status &&
    request.nextUrl.pathname.startsWith("/auth/login")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/user/links";
    return NextResponse.redirect(url);
  }

  const protectedRoutes = [
    "/user/links",
    "/user/profile",
    "/user/preview",
    "/user/appearance",
    "/user/themes",
  ];
  const pathname = request.nextUrl.pathname;
  if (uuid && valid.status && pathname.startsWith("/auth/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/user/links";
    return NextResponse.redirect(url);
  }

  if (!uuid || !valid.status) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return response;
};
