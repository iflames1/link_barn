import Image from "next/image";
import { UserProfileDetails } from "@/utils/linkSync";

interface PreviewProps {
  userProfileDetails: UserProfileDetails;
  className: string;
}

export default function PreviewProfile({ userProfileDetails }: PreviewProps) {
  return (
    <div className="flex flex-col items-center gap-[25px]">
      {userProfileDetails ? (
        <>
          <Image
            src={userProfileDetails?.profile_picture}
            alt={userProfileDetails?.first_name}
            width={96}
            height={96}
            className="rounded-full border-4 border-base-dark"
          />
          <div className="flex flex-col items-center gap-[13px]">
            <p className="hS text-black">
              {userProfileDetails?.first_name} {userProfileDetails?.last_name}
            </p>
          </div>
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
