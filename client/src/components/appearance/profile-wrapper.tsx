"use client";
import { themes } from "@/data/themes2";
import { getUser } from "@/lib/getUser";
import { UserData } from "@/types/links";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileWrapperProps {
  children: React.ReactNode;
  className?: string;
}

//let userData: UserData | undefined;

//const fetchUserData = async () => {
//  const result = await getUser();
//  userData = result?.userData;
//const userTheme =
//  themes.find((theme) => theme.name === userData?.theme) || themes[0];
//  return userTheme;
//};

//const theme = fetchUserData();

export default function ProfileWrapper({
  children,
  className,
}: ProfileWrapperProps) {
  const [theme, setTheme] = useState("theme1");
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result) {
        setTheme(result.userData.theme);
      }
    };

    fetchUserData();
  });

  const userTheme = themes.find((data) => data.name === theme) || themes[0];

  return (
    <main
      className={`max-w-80 mx-auto py-14 px-4 ${userTheme.bg} ${userTheme.text} ${className}`}
    >
      {children}
    </main>
  );
}
