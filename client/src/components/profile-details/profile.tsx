"use client";
import Preview from "../appearance/preview";
import Form from "./form";
import { useState } from "react";
import { UserData } from "@/types/links";

export default function Profile() {
  const [userProfileDetails, setUserProfileDetails] = useState<UserData>();

  console.log("rerender");

  return (
    <div className="lg:flex gap-6 w-full">
      <Preview userProfileDetails={userProfileDetails} />
      <Form
        userProfileDetails={userProfileDetails}
        setUserProfileDetails={setUserProfileDetails}
      />
    </div>
  );
}
