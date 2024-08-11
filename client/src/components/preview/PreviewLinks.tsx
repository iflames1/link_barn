"use client";
import { useEffect } from "react";
import { useLinkSync } from "@/utils/linkSync";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";

export default function PreviewLinks() {
  const { links, getLinks } = useLinkSync();

  useEffect(() => {
    getLinks();
  }, []);

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
        : links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              key={link.id}
              className="bg-black text-white flex justify-between items-center py-[11px] px-4 rounded-lg w-full"
            >
              <p className="flex items-center justify-start gap-2">
                <TbBrandGithubFilled className="size-4" />
                <span>{link.name}</span>
              </p>
              <FaArrowRight className="size-4" />
            </a>
          ))}
    </div>
  );
}
