import Form from "./form";
import { useState } from "react";
import { UserData } from "@/types/links";
import Preview from "../profile-details/preview";

export default function Links() {
  const [userProfileDetails, setUserProfileDetails] = useState<UserData>();

  return (
    <div className="lg:flex gap-6 w-full">
      <Preview userProfileDetails={userProfileDetails} />
      <Form setUserProfileDetails={setUserProfileDetails} />
    </div>
  );
}
