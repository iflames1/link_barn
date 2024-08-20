"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { IoEyeOutline } from "react-icons/io5";

interface TabProps {
  path: string;
  title: string;
}

export default function ButtonTab({ path, title }: TabProps) {
  const pathname = usePathname();
  const IconMap: { [key: string]: IconType } = {
    "/preview": IoEyeOutline,
  };
  const Icon = IconMap[path];

  return (
    <Link
      href={path}
      className={cn(
        "button py-[11px] sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-light",
        { "bg-base-light": pathname === path }
      )}
    >
      <p className="sm:inline-flex hS hidden">{title}</p>
      {Icon && <Icon className="flex sm:hidden size-4" />}
    </Link>
  );
}
