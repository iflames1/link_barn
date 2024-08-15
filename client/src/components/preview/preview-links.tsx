"use client";
import { useEffect } from "react";
import { useLinkSync } from "@/utils/linkSync";
import { FaArrowRight } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { RiLinkM } from "react-icons/ri";

const linkAttributes = {
  github: {
    text: "text-white",
    bg: "bg-black",
    icon: <TbBrandGithubFilled className="size-4" />,
  },
  twitter: {
    text: "text-white",
    bg: "bg-[#43B7E9]",
    icon: <FaXTwitter className="size-4" />,
  },
  youtube: {
    text: "text-white",
    bg: "bg-[#EE3939]",
    icon: <IoLogoYoutube className="size-4" />,
  },
  facebook: {
    text: "text-white",
    bg: "bg-[#2442AC]",
    icon: <FaFacebook className="size-4" />,
  },
  linkedin: {
    text: "text-white",
    bg: "bg-[#2D68FF]",
    icon: <FaLinkedin className="size-4" />,
  },
  link: {
    text: "text-black",
    bg: "bg-white",
    icon: <RiLinkM className="size-4" />,
  },
};

export default function PreviewLinks() {
  const { links, getLinks } = useLinkSync();

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return (
    <div className="flex flex-col items-center gap-5 w-full pb-11">
      {links.length === 0
        ? Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-preview w-full h-11 rounded-lg"
              ></div>
            ))
        : links.map((link) => {
            const normalizedLinkName =
              link.name.toLowerCase() as keyof typeof linkAttributes;
            const attributes =
              linkAttributes[normalizedLinkName] || linkAttributes.link;

            return (
              <a
                href={link.url}
                target="_blank"
                key={link.id}
                className={`flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray ${attributes.bg} ${attributes.text}`}
              >
                <p className="flex items-center justify-start gap-2">
                  {attributes.icon}
                  <span>{link.name}</span>
                </p>
                <FaArrowRight className="size-4" />
              </a>
            );
          })}
    </div>
  );
}
