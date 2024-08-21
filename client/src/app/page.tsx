"use client";
import Header from "@/components/header";

//import { cookies } from "next/headers";
import { useEffect } from "react";
import { getUserUUID } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";
import { useLinkSync } from "@/utils/linkSync";
import { LandingPage } from "@/components/landing-page";

export default function Home() {
  //const cookieStore = cookies();
  const { userProfileDetails, getLinks } = useLinkSync();
  useEffect(() => {
    const fetchUser = async () => {
      const userID = getUserUUID();
      if (userID) {
        console.log("UUID", userID);
        const res = await getLinks(API_BASE_URL + "/users/?user_id=" + userID);
        if (res) {
          console.log("Successfully fetched user details");
        } else {
          console.log("failed to get user");
        }
      }
    };
    fetchUser();
  }, [getLinks]);

  return (
    <div className="bg-gray-light sm:p-6 w-full h-screen max-w-[1440px] mx-auto flex flex-col gap-6">
      <Header />
      <LandingPage />
      {/*<div className="sm:p-0 p-4 bg-white">Yooo</div>
      <div>username {userProfileDetails?.username}</div>*/}
    </div>
  );
}
