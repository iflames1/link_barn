import Image from "next/image";
import { linkAttributes } from "../common/links-attr";
import { Fragment } from "react";
import { LinkSchema, UserData } from "@/types/links";
import { FaArrowRight } from "react-icons/fa";

interface LinkWrapperProps {
  userData: UserData | undefined;
  links?: LinkSchema[];
  children: (linkData: any) => React.ReactNode;
}

interface LayoutProps {
  userData: UserData | undefined;
  links?: LinkSchema[];
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

export function Layout1({ userData, links }: LayoutProps) {
  return (
    <div className="flex flex-col items-center gap-[25px]">
      {userData?.profile_picture ? (
        <Image
          src={userData?.profile_picture as string}
          alt={userData?.first_name as string}
          width={104}
          height={104}
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
      <div className="grid grid-cols-1 gap-3 w-full max-w-64">
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
    </div>
  );
}

export function Layout2({ userData, links }: LayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center text-center gap-4">
        {userData?.profile_picture ? (
          <Image
            src={userData?.profile_picture as string}
            alt={userData?.first_name as string}
            width={80}
            height={80}
            className="rounded-full"
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
      <div className="grid grid-cols-1 gap-4 max-w-64 w-full mx-auto">
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
    </div>
  );
}

export function Layout3({ userData, links }: LayoutProps) {
  return (
    <div className="text-center space-y-6">
      {userData?.profile_picture ? (
        <Image
          src={userData?.profile_picture as string}
          alt={userData?.first_name as string}
          width={120}
          height={120}
          className="rounded-full mx-auto"
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
    </div>
  );
}

export function Layout4({ userData, links }: LayoutProps) {
  return (
    <div>
      <div className="relative mb-16">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"
          style={{ height: "100px" }}
        />
        {userData?.profile_picture ? (
          <Image
            src={userData?.profile_picture as string}
            alt={userData?.first_name as string}
            width={100}
            height={100}
            className="rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
          />
        ) : (
          <div className="rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white bg-base-dark text-white size-[100px] min-w-[100px] min-h-[100px] flex items-center justify-center text-6xl font-bold uppercase">
            <p>{getFirstLetter(userData?.username)}</p>
          </div>
        )}
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{userData?.first_name}</h1>
        <p className="text-sm text-gray-600 mt-2 text-wrap">{userData?.bio}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              key={linkData.uuid}
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center space-x-2 p-2 border rounded ${linkData.bg} ${linkData.text}`}
            >
              {linkData.icon}
              <span>
                {linkData.platform === "link"
                  ? linkData.link_title
                  : linkData.platform}
              </span>
            </a>
          )}
        </LinkWrapper>
      </div>
    </div>
  );
}

export function Layout5({ userData, links }: LayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        {userData?.profile_picture ? (
          <Image
            src={userData?.profile_picture as string}
            alt={userData?.first_name as string}
            width={100}
            height={100}
            className="rounded-full"
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
              className={`flex flex-col items-center p-2 w-20 text-center rounded ${linkData.bg} ${linkData.text}`}
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
    </div>
  );
}

export const layouts = [
  { name: "layout1", LayoutComponent: Layout1 },
  { name: "layout2", LayoutComponent: Layout2 },
  { name: "layout3", LayoutComponent: Layout3 },
  { name: "layout4", LayoutComponent: Layout4 },
  { name: "layout5", LayoutComponent: Layout5 },
];
