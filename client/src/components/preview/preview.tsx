import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { linkAttributes } from "../common/links-attr";

export interface LinkSchema {
  uuid: string;
  platform: string;
  index: number;
  url: string;
  user_id: string;
  link_title: string | null;
}

export default async function Preview({
  userProfileDetails,
  links,
}: {
  userProfileDetails: any;
  links: LinkSchema[];
}) {
  let truncUsername = "";

  const truncateString = (str: string): string => {
    if (str.length > 15) {
      return `${str.slice(0, 5)}...${str.slice(-5)}`;
    }
    return str;
  };
  truncUsername = truncateString(userProfileDetails?.username || "");
  return (
    <div className="w-full h-full flex flex-col items-center gap-14 overflow-y-auto">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[50vh]">
            <Loader className="animate-spin" />
          </div>
        }
      >
        <div className="flex flex-col items-center gap-[25px]">
          {userProfileDetails ? (
            <>
              {userProfileDetails?.profile_picture ? (
                <Image
                  src={userProfileDetails?.profile_picture}
                  alt={userProfileDetails?.first_name}
                  width={104}
                  height={104}
                  className={cn(
                    "rounded-full border-4 size-28 border-base-dark object-cover",
                  )}
                />
              ) : (
                <div
                  className={cn(`bg-gray-preview size-28 rounded-full`)}
                ></div>
              )}
              {userProfileDetails?.username ? (
                <>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xl font-bold">
                      {userProfileDetails?.first_name}{" "}
                      {userProfileDetails?.last_name}
                    </p>
                    <p className={cn("text-md font-semibold text-black")}>
                      @{truncUsername}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-[13px]">
                  <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
                </div>
              )}
              <p className="text-center px-1 max-w-72">
                {userProfileDetails?.bio}
              </p>
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
        </div>
        <div className="flex flex-col items-center gap-3 w-full max-w-60">
          {links?.length < 1 ? (
            <div>You have not added any links</div>
          ) : (
            links
              ?.slice()
              .sort((a: LinkSchema, b: LinkSchema) => a.index - b.index)
              .map((link: LinkSchema, index: number) => {
                const normalizedLinkName =
                  link.platform.toLowerCase() as keyof typeof linkAttributes;
                const attributes =
                  linkAttributes[normalizedLinkName] || linkAttributes.link;
                return (
                  <a
                    href={link.url}
                    target="_blank"
                    key={index}
                    className={`flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray capitalize ${attributes.bg} ${attributes.text}`}
                  >
                    <p className="flex items-center justify-start gap-2">
                      {attributes.icon}
                      <span>
                        {link.platform === "link"
                          ? link.link_title
                          : link.platform}
                      </span>
                    </p>
                    <FaArrowRight className="size-4" />
                  </a>
                );
              })
          )}
        </div>
      </Suspense>
    </div>
  );
}
