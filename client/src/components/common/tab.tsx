"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { FiLink } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

interface TabProps {
  path: string;
  title: string;
}

export default function Tab({ path, title }: TabProps) {
  const pathname = usePathname();
  const IconMap: { [key: string]: IconType } = {
    "/user/links": FiLink,
    "/user/profile": CgProfile,
  };
  const Icon = IconMap[path];

  return (
    <Link
      href={path}
      className={cn(
        "hS py-3 px-7 sm:flex items-center gap-2 hover:text-base-dark",
        {
          "text-base-dark bg-base-light rounded-lg": pathname === path,
        }
      )}
    >
      {Icon && <Icon className="size-4" />}
      <p className="sm:inline-flex hidden">{title}</p>
    </Link>
  );
}
