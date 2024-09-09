import Image from "next/image";
import { linkAttributes } from "../common/links-attr";
import { Fragment } from "react";
import { LinkData, LinkSchema } from "@/types/links";

export interface UserdataLinkSchema {
  uuid: string;
  platform: "link" | "twitter" | "instagram" | "linkedin" | "github";
  index: number;
  url: "https://example.com";
  user_id: string;
  link_title: string | null;
}

interface LinkWrapperProps {
  userData: LinkData;
  links?: LinkSchema[];
  children: (linkData: any) => React.ReactNode;
}

interface LayoutProps {
  userData: LinkData;
  links?: LinkSchema[];
}

export function LinkWrapper({ userData, links, children }: LinkWrapperProps) {
  return (
    <>
      {" "}
      {links ? (
        links.length < 1 ? (
          <div>You have not added any links</div>
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
        userData.links.map((link, index) => {
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
    <div className="mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Image
          src={userData?.profile_picture as string}
          alt={userData?.first_name as string}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="">
          <h1 className="text-2xl font-bold">
            {userData?.first_name} {userData?.last_name}
          </h1>
          <p className="text-sm text-gray-600 break-words text-wrap">
            {userData?.bio}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              key={linkData.uuid}
              className={`flex items-center space-x-2 p-2 border rounded capitalize ${linkData.bg} ${linkData.text}`}
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

export function Layout2({ userData, links }: LayoutProps) {
  return (
    <div className="mx-auto p-6 text-center space-y-6">
      <Image
        src={userData.profile_picture as string}
        alt={userData.first_name as string}
        width={120}
        height={120}
        className="rounded-full mx-auto"
      />
      <div>
        <h1 className="text-2xl font-bold">
          {userData?.first_name} {userData?.last_name}
        </h1>
        <p className="text-sm text-gray-600 mt-2 text-wrap">{userData.bio}</p>
      </div>
      <div className="flex justify-center space-x-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              key={linkData.uuid}
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              title={linkData.platform}
            >
              {linkData.icon}
            </a>
          )}
        </LinkWrapper>
        {/*{userData.links.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.id}
              href={"https://example.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              title={link.title}
            >
              <Icon className="text-gray-700" />
            </a>
          );
        })}*/}
      </div>
    </div>
  );
}

export function Layout3({ userData, links }: LayoutProps) {
  return (
    <div className="mx-auto p-6">
      <div className="relative mb-16">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"
          style={{ height: "100px" }}
        />
        <Image
          src={userData.profile_picture as string}
          alt={userData.first_name as string}
          width={100}
          height={100}
          className="rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
        />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          {userData?.first_name} {userData?.last_name}
        </h1>
        <p className="text-sm text-gray-600 mt-2 text-wrap">{userData.bio}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              key={linkData.uuid}
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 p-2 border rounded hover:bg-gray-100"
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
        {/*{userData.links.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.id}
              href={"https://example.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 p-2 border rounded hover:bg-gray-100"
            >
              <Icon className="text-gray-600" />
              <span>{link.title}</span>
            </a>
          );
        })}*/}
      </div>
    </div>
  );
}

export function Layout4({ userData, links }: LayoutProps) {
  return (
    <div className="mx-auto p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={userData?.profile_picture as string}
          alt={userData?.first_name as string}
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold">
          {userData?.first_name} {userData?.last_name}
        </h1>
      </div>
      <p className="text-center text-sm text-gray-600 text-wrap">
        {userData.bio}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <LinkWrapper userData={userData} links={links}>
          {(linkData) => (
            <a
              key={linkData.uuid}
              href={linkData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-2 w-20 text-center"
            >
              <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mb-1">
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
        {/*{userData.links.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.id}
              href={"https://example.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-2 w-20 text-center"
            >
              <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mb-1">
                <Icon className="text-gray-700" />
              </div>
              <span className="text-xs">{link.title}</span>
            </a>
          );
        })}*/}
      </div>
    </div>
  );
}

export const layouts = [
  { name: "layout1", LayoutComponent: Layout1 },
  { name: "layout2", LayoutComponent: Layout2 },
  { name: "layout3", LayoutComponent: Layout3 },
  { name: "layout4", LayoutComponent: Layout4 },
];