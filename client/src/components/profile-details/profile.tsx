"use client";
import Preview from "../appearance/preview";
import Form from "./form";
import { useState } from "react";
import { UserData } from "@/types/links";

export default function Profile({ userProfile }: { userProfile: UserData }) {
  const [userProfileDetails, setUserProfileDetails] =
    useState<UserData>(userProfile);

  console.log("rerender", userProfileDetails);

  return (
    <div className="lg:flex gap-6 w-full">
      <Preview userProfileDetails={userProfileDetails} />
      <Form
        userProfileDetails={userProfileDetails}
        // @ts-ignore
        setUserProfileDetails={setUserProfileDetails}
      />
    </div>
  );
}
