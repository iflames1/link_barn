import { TbBrandGithubFilled } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { RiLinkM } from "react-icons/ri";
import React from "react";

export const linkAttributes = {
  link: {
    text: "text-black",
    bg: "bg-white",
    icon: <RiLinkM className="size-4" />,
  },
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
};
