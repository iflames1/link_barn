import { getUserProfileByUsername } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export const premiumRedirect = async (req: NextRequest) => {
  const hostname = req.headers.get("host") || "";
  const premium = false;
  const url = req.nextUrl.clone();
  const isDevelopment = process.env.NODE_ENV === "development";
  const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "linkbarn.tech";

  let isSubdomain = false;
  let username: string | undefined;

  console.log(url.pathname);
  if (isDevelopment) {
    isSubdomain = hostname.includes(".localhost:");
    username = isSubdomain ? hostname.split(".")[0] : undefined;
  } else {
    isSubdomain =
      hostname.endsWith(`.${baseDomain}`) && !hostname.startsWith("www.");
    username = isSubdomain ? hostname.split(".")[0] : undefined;
  }

  // If it's not a subdomain, check if it's a username route
  if (!isSubdomain && url.pathname !== "/") {
    const pathParts = url.pathname.split("/");
    username = pathParts[1];
  }

  // If no username is found, or if we're on the home page, proceed normally
  if (!username) {
    return NextResponse.next();
  }

  const userProfile = await getUserProfileByUsername(username);
  if (!userProfile) {
    // User not found, redirect to home
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle URL changes for premium and non-premium users
  if (premium) {
    if (!isSubdomain) {
      // Redirect premium users to their subdomain
      const redirectUrl = isDevelopment
        ? `http://${username}.localhost:3000${url.pathname.replace(`/${username}`, "") || "/"}`
        : `https://${username}.${baseDomain}${url.pathname.replace(`/${username}`, "") || "/"}`;
      return NextResponse.redirect(new URL(redirectUrl));
    } else if (isSubdomain && url.pathname.startsWith(`/${username}`)) {
      console.log("reli");
      const redirectUrl = isDevelopment
        ? `http://${username}.localhost:3000${url.pathname.replace(`/${username}`, "") || "/"}`
        : `https://${username}.${baseDomain}${url.pathname.replace(`/${username}`, "") || "/"}`;
      return NextResponse.redirect(new URL(redirectUrl));
    } else {
      return NextResponse.rewrite(new URL(`/${username}`, req.url));
    }
  } else {
    console.log("not premium");

    // Rewrite the URL to use the main domain instead of subdomain
    if (isSubdomain) {
      // console.log("HERE");
      // const currValue = isDevelopment
      //   ? `https://${username}.localhost:3000`
      //   : `https://${username}.linkbarn.tech`;
      // const url = req.url;
      // console.log(url, currValue);
      // const newUrl = url.replace(
      //   currValue,
      //   `https://localhost:3000/${username}`,
      // );
      // console.log(newUrl);
      // return NextResponse.rewrite(newUrl);
      //     const host = req.headers.host;

      const host = req.headers.get("host");
      console.log(host);
      const base = isDevelopment ? "localhost:3000" : "linkbarn.tech";

      const newUrl = req.url.replace(`${username}.`, "");
      console.log(newUrl, "new");

      // @ts-ignore
      if (host.startsWith(`${username}.${base}`)) {
        console.log("loops");
        return NextResponse.rewrite(newUrl);
      }
    }

    // If the user is non-premium and is already on a route-based URL, skip the rewrite.
    if (!isSubdomain && url.pathname.startsWith(`/${username}`)) {
      console.log("Levi");
      return NextResponse.next();
    }
  }
  // else {
  //   console.log("not premium");
  //
  //   // If the user is non-premium and is already on a route-based URL, skip the redirect.
  //   if (!isSubdomain && url.pathname.startsWith(`/${username}`)) {
  //     console.log("Levi");
  //     return NextResponse.next();
  //   }
  //
  //   // Redirect non-premium users from subdomain to route-based URL
  //   if (isSubdomain) {
  //     const currentPath = url.pathname;
  //     const desiredPath = `/${username}`;
  //     if (currentPath !== desiredPath) {
  //       console.log("here");
  //       const redirectUrl = isDevelopment
  //         ? `http://localhost:3000${desiredPath}`
  //         : `https://${baseDomain}${desiredPath}`; // Use baseDomain instead of hostname
  //       return NextResponse.redirect(new URL(redirectUrl, req.url)); // Use req.url to preserve the original URL
  //     } else {
  //       return NextResponse.next();
  //     }
  //   }
  // }
};
