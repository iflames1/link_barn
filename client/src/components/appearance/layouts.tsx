import Image from "next/image";
import { linkAttributes } from "../common/links-attr";
import { Fragment } from "react";
import { LinkSchema, UserData } from "@/types/links";
import { FaArrowRight } from "react-icons/fa";
import { getUser } from "@/lib/getUser";
import { themes } from "@/data/themes2";
import ProfileWrapper from "./profile-wrapper";
import { cn } from "@/lib/utils";

interface LinkWrapperProps {
  userData: UserData | undefined;
  links?: LinkSchema[];
  children: (linkData: any) => React.ReactNode;
}

interface LayoutProps {
  userData: UserData | undefined;
  links?: LinkSchema[];
  className?: string;
  username?: string;
  apperance?: boolean;
}

interface ProfileWrapperProps {
  children: React.ReactNode;
  className?: string;
}

//export function ProfileWrapper({ children, className }: ProfileWrapperProps) {
//  return (
//    <main className={`max-w-80 mx-auto py-14 px-4 ${className}`}>
//      {children}
//    </main>
//  );
//}
//
//

interface CircularImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function CircularImage({
  src,
  alt,
  size = 115,
  className,
}: CircularImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-full", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
}

const getFirstLetter = (username: string | undefined) => {
  if (username && username.length > 0) {
    return username[0];
  }
  return "S";
};

export function LinkWrapper({ userData, links, children }: LinkWrapperProps) {
  return (
    <>
      {links ? (
        links.length < 1 ? (
          <div>It looks like you haven&apos;t added any links yet.</div>
        ) : (
          links
            .slice()
            .sort((a, b) => a.index - b.index)
            .map((link, index) => {
              const normalizedLinkName =
                link.platform.toLowerCase() as keyof typeof linkAttributes;
              const attributes =
                linkAttributes[normalizedLinkName] || linkAttributes.link;
              return (
                <Fragment key={index}>
                  {children({ ...link, ...attributes })}
                </Fragment>
              );
            })
        )
      ) : (
        userData?.links?.map((link, index) => {
          const normalizedLinkName =
            link.platform.toLowerCase() as keyof typeof linkAttributes;
          const attributes =
            linkAttributes[normalizedLinkName] || linkAttributes.link;
          return (
            <Fragment key={index}>
              {children({ ...link, ...attributes })}
            </Fragment>
          );
        })
      )}
    </>
  );
}

export function Layout1({ userData, links, className, username }: LayoutProps) {
  //console.log(userData, "from themes");
  return (
    <ProfileWrapper
      className={cn("flex flex-col items-center gap-[25px]", className)}
      theme={userData?.theme}
      username={username}
    >
      {userData?.profile_picture ? (
        <CircularImage
          src={userData?.profile_picture as string}
          alt={userData?.first_name as string}
          className="rounded-full border-4 size-28 border-base-dark object-cover"
        />
      ) : (
        <div className="size-28 min-w-[104px] min-h-[104px] rounded-full flex items-center justify-center text-6xl font-bold uppercase bg-base-dark text-white">
          <p>{getFirstLetter(userData?.username)}</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <p className="text-xl font-bold">{userData?.first_name}</p>
        {/*<p className={cn("text-md font-semibold text-black")}>
            @{truncUsername}
          </p>*/}
      </div>
      <p className="text-center px-1 max-w-72 break-words text-wrap">
        {userData?.bio}
      </p>
      <div className="grid grid-cols-1 gap-3 w-full">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              key={linkData.uuid}
              className={`flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray capitalize ${linkData.bg} ${linkData.text}`}
            >
              <p className="flex items-center justify-start gap-2">
                {linkData.icon}
                <span>
                  {linkData.platform === "link"
                    ? linkData.link_title
                    : linkData.platform}
                </span>
              </p>
              <FaArrowRight className="size-4" />
            </a>
          )}
        </LinkWrapper>
      </div>
    </ProfileWrapper>
  );
}

export function Layout2({ userData, links, username, className }: LayoutProps) {
  return (
    <ProfileWrapper
      className={cn("flex flex-col gap-6", className)}
      theme={userData?.theme}
      username={username}
    >
      <div className="flex items-center text-center gap-4">
        {userData?.profile_picture ? (
          <CircularImage
            src={userData?.profile_picture as string}
            alt={userData?.first_name}
          />
        ) : (
          <div className="rounded-full bg-base-dark text-white size-20 min-w-20 min-h-20 flex items-center justify-center text-6xl font-bold uppercase">
            <p>{getFirstLetter(userData?.username)}</p>
          </div>
        )}
        <div className="">
          <h1 className="text-2xl font-bold">{userData?.first_name}</h1>
          <p className="text-sm text-gray-600 break-words text-wrap">
            {userData?.bio}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full mx-auto">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              key={linkData.uuid}
              className={`flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray capitalize ${linkData.bg} ${linkData.text}`}
            >
              <p className="flex items-center justify-start gap-2">
                {linkData.icon}
                <span>
                  {linkData.platform === "link"
                    ? linkData.link_title
                    : linkData.platform}
                </span>
              </p>
              <FaArrowRight className="size-4" />
            </a>
          )}
        </LinkWrapper>
      </div>
    </ProfileWrapper>
  );
}

export function Layout3({ userData, links, username, className }: LayoutProps) {
  return (
    <ProfileWrapper
      className={cn("text-center space-y-6", className)}
      theme={userData?.theme}
      username={username}
    >
      {userData?.profile_picture ? (
        <CircularImage
          src={userData?.profile_picture as string}
          alt={userData?.first_name}
          className="mx-auto"
        />
      ) : (
        <div className="size-[120px] min-w-[120px] min-h-[120px] rounded-full mx-auto flex items-center justify-center text-6xl font-bold uppercase bg-base-dark text-white">
          <p>{getFirstLetter(userData?.username)}</p>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold">{userData?.first_name}</h1>
        <p className="text-sm text-gray-600 mt-2 text-wrap">{userData?.bio}</p>
      </div>
      <div className="flex justify-center space-x-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              key={linkData.uuid}
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 ${linkData.bg} ${linkData.text}`}
              title={linkData.platform}
            >
              {linkData.icon}
            </a>
          )}
        </LinkWrapper>
      </div>
    </ProfileWrapper>
  );
}

export function Layout4({ userData, links, username, className }: LayoutProps) {
  return (
    <ProfileWrapper
      theme={userData?.theme}
      username={username}
      className={cn("pt-20", className)}
    >
      <div className="relative mb-28">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg flex items-end justify-center pb-3"
          style={{ height: "100px" }}
        >
          <h1 className="text-2xl text-white font-bold">
            {userData?.first_name}
          </h1>
        </div>
        {userData?.profile_picture ? (
          <CircularImage
            src={userData.profile_picture}
            alt={userData?.first_name || ""}
            className="rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white w-[100px] h-[100px]"
          />
        ) : (
          <div className="rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white bg-base-dark text-white w-[100px] h-[100px] flex items-center justify-center text-6xl font-bold uppercase">
            <p>{getFirstLetter(userData?.username)}</p>
          </div>
        )}
      </div>
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 mt-2 text-wrap">{userData?.bio}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              key={linkData.uuid}
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-2 w-20 text-center rounded capitalize ${linkData.bg} ${linkData.text}`}
            >
              <div className="p-2 bg-gray-200 hover:bg-gray-300 mb-1">
                {linkData.icon}
              </div>
              <span className="text-xs">
                {linkData.platform === "link"
                  ? linkData.link_title
                  : linkData.platform}
              </span>
            </a>
          )}
        </LinkWrapper>
      </div>
    </ProfileWrapper>
  );
}

export function Layout5({ userData, links, username, className }: LayoutProps) {
  return (
    <ProfileWrapper
      className={cn("space-y-6", className)}
      theme={userData?.theme}
      username={username}
    >
      <div className="flex flex-col items-center space-y-4">
        {userData?.profile_picture ? (
          <CircularImage
            src={userData?.profile_picture as string}
            alt={userData?.first_name}
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-base-dark text-white text-6xl font-bold flex justify-center items-center uppercase">
            <p>{getFirstLetter(userData?.username)}</p>
          </div>
        )}
        <h1 className="text-2xl font-bold">{userData?.first_name}</h1>
      </div>
      <p className="text-center text-sm text-gray-600 text-wrap">
        {userData?.bio}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              key={linkData.uuid}
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-2 w-20 text-center rounded capitalize ${linkData.bg} ${linkData.text}`}
            >
              <div className="p-2 bg-gray-200 hover:bg-gray-300 mb-1">
                {linkData.icon}
              </div>
              <span className="text-xs">
                {linkData.platform === "link"
                  ? linkData.link_title
                  : linkData.platform}
              </span>
            </a>
          )}
        </LinkWrapper>
      </div>
    </ProfileWrapper>
  );
}
export function Layout6({ userData, links, className, username }: LayoutProps) {
  //console.log(userData, "from themes");
  return (
    <ProfileWrapper
      className={cn("flex flex-col items-center gap-[25px]", className)}
      theme={userData?.theme}
      username={username}
    >
      {/* {userData?.profile_picture ? ( */}
      {/*   <Image */}
      {/*     src={userData?.profile_picture as string} */}
      {/*     alt={userData?.first_name as string} */}
      {/*     width={104} */}
      {/*     height={104} */}
      {/*     className="rounded-full border-4 size-28 border-base-dark object-cover" */}
      {/*   /> */}
      {/* ) : ( */}
      {/*   <div className="size-28 min-w-[104px] min-h-[104px] rounded-full flex items-center justify-center text-6xl font-bold uppercase bg-base-dark text-white"> */}
      {/*     <p>{getFirstLetter(userData?.username)}</p> */}
      {/*   </div> */}
      {/* )} */}
      {/**/}
      {/* <div className="flex flex-col items-center gap-2"> */}
      {/*   <p className="text-xl font-bold">{userData?.first_name}</p> */}
      {/* </div> */}
      {/* <p className="text-center px-1 max-w-72 break-words text-wrap"> */}
      {/*   {userData?.bio} */}
      {/* </p> */}

      <div className="grid grid-cols-1 gap-3 w-full">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              key={linkData.uuid}
              className={`flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray capitalize ${linkData.bg} ${linkData.text}`}
            >
              <p className="flex items-center justify-start gap-2">
                {linkData.icon}
                <span>
                  {linkData.platform === "link"
                    ? linkData.link_title
                    : linkData.platform}
                </span>
              </p>
              <FaArrowRight className="size-4" />
            </a>
          )}
        </LinkWrapper>
      </div>
    </ProfileWrapper>
  );
}

export const layouts = [
  { name: "layout1", LayoutComponent: Layout1 },
  { name: "layout2", LayoutComponent: Layout2 },
  { name: "layout3", LayoutComponent: Layout3 },
  { name: "layout4", LayoutComponent: Layout4 },
  { name: "layout5", LayoutComponent: Layout5 },
  // { name: "layout6", LayoutComponent: Layout6 },
];
