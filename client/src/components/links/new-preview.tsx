import { Loader } from "lucide-react";
import { Suspense } from "react";
import { linkAttributes } from "../common/links-attr";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LinkSchema {
  platform: string;
  url: string;
  index: number;
  link_title: string | null;
}

export const NewPreview = ({
  links,
  userProfileDetails,
}: {
  links: LinkSchema[];
  userProfileDetails: any;
}) => {
  return (
    <div>
      <div
        className={`lg:flex p-6 rounded-xl bg-white justify-center items-center sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] `}
      >
        <div className="lg:max-h-[calc(100vh-192px)] overflow-y-auto overflow-x-hidden">
          <div className="border-[1px] border-gray-dark rounded-[56px] max-w-[100vw] sm:w-[307px] h-[631px] p-[11px] relative">
            <div className="border-[1px] border-gray-dark rounded-[45px] w-full h-full px-6 pt-[53px] flex flex-col items-center gap-10 overflow-y-auto">
              <NewUserProfile userProfileDetails={userProfileDetails} />
              <NewPreviewLinks links={links} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewPreviewLinks = ({ links }: { links: LinkSchema[] }) => {
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-60 pb-14">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[50vh]">
            <Loader className="animate-spin" />
          </div>
        }
      >
        {links && links?.length < 1 ? (
          <div>Add links 🥲</div>
        ) : (
          links &&
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
      </Suspense>
    </div>
  );
};

const NewUserProfile = ({
  userProfileDetails,
}: {
  userProfileDetails: any;
}) => {
  return (
    <div className="w-full px-[18%] flex flex-col items-center gap-14">
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
                    "rounded-full border-4 size-28 border-base-dark object-cover"
                  )}
                />
              ) : (
                <div
                  className={cn(`bg-gray-preview size-28 rounded-full`)}
                ></div>
              )}
              {userProfileDetails?.first_name ||
              userProfileDetails?.last_name ? (
                <div className="flex flex-col items-center gap-[13px]">
                  <p className={cn("hS text-black")}>
                    {userProfileDetails?.first_name}{" "}
                    {userProfileDetails?.last_name}
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
                <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
              </div>
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
};
