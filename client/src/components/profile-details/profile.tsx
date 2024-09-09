"use client";
import Preview from "./preview";
import Form from "./form";
import { useState } from "react";
import { UserData } from "@/types/links";

export interface ProfileProps {
  setUserProfileDetails: React.Dispatch<
    React.SetStateAction<UserData | undefined>
  >;
  userProfileDetails: UserData | undefined;
}

export default function Profile() {
  const [userProfileDetails, setUserProfileDetails] = useState<UserData>();

  const props: ProfileProps = {
    userProfileDetails,
    setUserProfileDetails,
  };

  console.log("rerender", userProfileDetails);

  return (
    <div className="lg:flex gap-6 w-full">
      <Preview userProfileDetails={props.userProfileDetails} />
      <Form {...props} />
    </div>
  );
}
