import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getUserProfileByUsername } from "./lib/queries";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // Only run updateSession() for /user and /auth paths
  if (url.pathname.startsWith("/user") || url.pathname.startsWith("/auth")) {
    return await updateSession(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

// import { NextResponse, type NextRequest } from "next/server";
//
// import { updateSession } from "@/utils/supabase/middleware";
//
// import { getUserProfileByUsername } from "./lib/queries";
//
// export async function middleware(req: NextRequest) {
//
//   const hostname = req.headers.get("host");
//
//   const premium = true;
//
//   const url = req.nextUrl.clone();
//
//   let currentHost;
//
//   const isDevelopment = process.env.NODE_ENV === "development";
//
//   let isSubdomain: boolean | undefined = false;
//
//   const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "linkbarn.tech";
//
//   if (isDevelopment) {
//
//     currentHost = hostname?.replace(`.localhost:3000`, "");
//
//     isSubdomain = hostname?.includes(".localhost");
//
//   } else {
//
//     currentHost = hostname?.replace(`.${baseDomain}`, "");
//
//     isSubdomain =
//
//       hostname?.endsWith(`.${baseDomain}`) && !hostname.startsWith("www.");
//
//   }
//
//   console.log(currentHost);
//
//   console.log(hostname);
//
//   if (!currentHost) {
//
//     console.log("No subdomain serving this shit");
//
//     return NextResponse.next();
//
//   }
//
//   const response = await getUserProfileByUsername(currentHost);
//
//   if (!response) {
//
//     console.log("Subdomain not found serving root");
//
//     return NextResponse.next();
//
//   }
//
//
//    if (premium) {
//
//     console.log(isSubdomain);
//
//     if (!isSubdomain) {
//
//       const redirectUrl = isDevelopment
//
//         ? http://${currentHost}.localhost:3000${url.pathname.replace(/${currentHost}`, "") || "/"}`
//
//         : https://${currentHost}.${baseDomain}${url.pathname.replace(/${currentHost}`, "") || "/"}`;
//
//       console.log(redirectUrl, "REDIRECT");
//
//       return NextResponse.redirect(new URL(redirectUrl));
//
//     } else {
//
//       return NextResponse.rewrite(new URL(`/${response?.username}`, req.url));
//
//     }
//
//   }
//
//   return await updateSession(req);
//
// }
//
// export const config = {
//
//   matcher: [
//
//     /*
//
//      * Match only the /user and /auth paths, excluding static files and images.
//
//      */
//
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//
//     // "/(user|auth)/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//
//   ],
//
// };
//
// Let's take it one step at a time, in this version if they access linkbarn.tech/username that means there won't be a currentHost which means t
