"use client";
import { themes } from "@/data/themes2";
import { getUser } from "@/lib/getUser";
import { checkUserExists } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { UserData } from "@/types/links";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { JoinLinkBarn } from "../ui/logo";

interface ProfileWrapperProps {
  children: React.ReactNode;
  className?: string;
  theme?: string;
  username?: string;
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
  theme,
  username,
}: ProfileWrapperProps) {
  // const [theme, setTheme] = useState("theme1");
  // const [UUID, setUUID] = useState<string | undefined>(undefined);
  // const pathname = usePathname();
  // console.log(pathname);
  //
  // useEffect(() => {
  //   const checkUser = async () => {
  //     if (!pathname.startsWith("/user")) {
  //       const username = pathname.split("/").pop();
  //       if (username) {
  //         const userExists = await checkUserExists("username", username);
  //         if (userExists.status) {
  //           setUUID(userExists.message);
  //         }
  //       }
  //     }
  //   };
  //
  //   const fetchUserData = async () => {
  //     const result = await getUser(UUID);
  //     if (result) {
  //       setTheme(result.userData.theme);
  //     }
  //   };
  //
  //   checkUser();
  //   fetchUserData();
  // }, [pathname, UUID]);

  const userTheme = themes.find((data) => data.name === theme) || themes[0];

  return (
    <main
      className={cn(
        `${userTheme.bg} w-full h-full`,
        username &&
          "min-h-dvh min-w-screen flex flex-col items-center justify-between"
      )}
    >
      <div
        className={`sm:max-w-80 mx-auto py-14 px-4 w-screen ${userTheme.text} ${className}`}
      >
        {children}
      </div>
      {username && (
        <div className={`pb-4 ${userTheme.text}`}>
          <JoinLinkBarn username={username} />
        </div>
      )}
    </main>
  );
}
