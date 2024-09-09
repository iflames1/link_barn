import { UserData } from "@/types/links";
import { useState } from "react";

export const useUserdata = () => {
  const [userData, setUserData] = useState<UserData>();
  return { userData, setUserData };
};
