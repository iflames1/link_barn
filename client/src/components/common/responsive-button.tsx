"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { IconType } from "react-icons";

interface TabProps {
  path: string;
  title: string;
}

const IconMap: { [key: string]: IconType } = {
  "/user/appearance": LuLayoutDashboard,
};

export default function ResponsiveButton({ path, title }: TabProps) {
  const [showLink, setShowLink] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const Icon = IconMap[path];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowLink(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconClick = () => {
    setShowLink(true);
  };

  return (
    <div className="absolute bottom-0 right-6" ref={buttonRef}>
      <Link
        href={path}
        className="hidden sm:flex bg-white button py-[11px] px-7 border border-base-dark text-base-dark hover:bg-base-light"
      >
        <span>{title}</span>
      </Link>
      <div className="sm:hidden">
        <div className="bg-white button py-[11px] px-4 border border-base-dark text-base-dark hover:bg-base-light relative">
          <Link
            href={path}
            className={`items-center transition-transform duration-300 ease-in-out ${
              showLink ? "flex transform scale-100" : "hidden transform scale-0"
            }`}
          >
            <span>{title}</span>
          </Link>
          <Icon
            className={`size-4 cursor-pointer transition-transform duration-300 ease-in-out ${
              showLink ? "hidden transform scale-0" : "flex transform scale-100"
            }`}
            onClick={handleIconClick}
          />
        </div>
      </div>
    </div>
  );
}
