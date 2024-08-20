// "use client";
import { useEffect } from "react";
import PreviewLinks from "./preview-links";
import PreviewProfile from "./preview-profile";
import { useLinkSync } from "@/utils/linkSync";
import { getUserUUID } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";
import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";

export default async function Preview() {
  // const { getLinks, links, userProfileDetails } = useLinkSync();
  const uuid = cookies().get("uuid")?.value;

  const userProfileDetails = await getUserProfile(uuid || "");

  //
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userID = getUserUUID();
  //     if (userID) {
  //       console.log("UUID", userID);
  //       const res = await getLinks(API_BASE_URL + "/users/?user_id=" + userID);
  //       if (res) {
  //         console.log("Successfully fetched user details");
  //       } else {
  //         console.log("failed to get user");
  //       }
  //     }
  //   };
  //
  //   fetchUser();
  // }, [getLinks]);

  return (
    <div className="w-full h-full px-[18%] pt-[53px] flex flex-col items-center gap-14">
      <PreviewProfile userProfileDetails={userProfileDetails} />
      <PreviewLinks links={userProfileDetails.links} type="old" />
    </div>
  );
}
