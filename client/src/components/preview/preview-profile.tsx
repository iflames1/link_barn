import Image from "next/image";
import { UserProfileDetails } from "@/utils/linkSync";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface PreviewProps {
  userProfileDetails: UserProfileDetails;
}

export default function PreviewProfile({ userProfileDetails }: PreviewProps) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center gap-[25px]">
      {userProfileDetails ? (
        <>
          {userProfileDetails?.profile_picture ? (
            <Image
              src={userProfileDetails?.profile_picture}
              alt={userProfileDetails?.first_name}
              width={104}
              height={104}
              className={cn("rounded-full border-4 border-base-dark", {
                "size-24": pathname === "/profile",
              })}
            />
          ) : (
            <div
              className={cn(`bg-gray-preview size-28 rounded-full`, {
                "size-24": pathname === "/profile",
              })}
            ></div>
          )}
          {userProfileDetails?.first_name || userProfileDetails?.last_name ? (
            <div className="flex flex-col items-center gap-[13px]">
              <p
                className={cn("hM text-black", { hs: pathname === "/profile" })}
              >
                {userProfileDetails?.first_name} {userProfileDetails?.last_name}
              </p>
            </div>
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
          </div>
        </>
      )}
    </div>
  );
}
