"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context";
import LoadingProfile from "./loading-profile";
import { Suspense } from "react";
import { useUserdata } from "@/lib/useUserdata";

export default function PreviewProfile() {
  const pathname = usePathname();
  const { userData } = useUserdata();
  let truncUsername = "";

  const truncateString = (str: string): string => {
    if (str.length > 15) {
      return `${str.slice(0, 5)}...${str.slice(-5)}`;
    }
    return str;
  };
  truncUsername = truncateString(userData?.username || "");

  return (
    <div className="flex flex-col items-center gap-[25px]">
      <Suspense fallback={<LoadingProfile />}>
        {userData ? (
          <>
            {userData?.profile_picture ? (
              <Image
                src={userData?.profile_picture}
                alt={userData?.first_name}
                width={104}
                height={104}
                className={cn(
                  "rounded-full border-4 size-24 border-base-dark object-cover",
                  {
                    "size-28": pathname === "/user/preview",
                  }
                )}
              />
            ) : (
              <div
                className={cn(`bg-gray-preview size-24 rounded-full`, {
                  "size-28": pathname === "/user/preview",
                })}
              ></div>
            )}
            {userData?.username ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <p
                    className={cn("hS text-black", {
                      hM: pathname === "/user/preview",
                    })}
                  >
                    {userData?.first_name} {userData?.last_name}
                  </p>
                  <p className={cn("bM text-black")}>@{truncUsername}</p>
                  <p className="text-sm text-center text-black pt-3 px-1">
                    {userData?.bio}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-[13px]">
                <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-gray-preview size-24 rounded-full"></div>
            <div className="flex flex-col items-center gap-[13px]">
              <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
              <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
}
