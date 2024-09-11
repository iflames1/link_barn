"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { IoEyeOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { FaShareAlt } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

interface TabProps {
  path: string;
  title: string;
}
const ShareLink = dynamic(
  () => import("@/components/preview/share").then((mod) => mod.ShareLink),
  {
    ssr: false,
    loading: () => (
      <button className="button py-[11px] sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-light">
        <span className="hidden sm:flex">
          <Skeleton className="w-[76.5px] h-6" />
        </span>
        <FaShareAlt className="flex sm:hidden size-4" />
      </button>
    ),
  }
);

export default function ButtonTab({ path, title }: TabProps) {
  const pathname = usePathname();
  const IconMap: { [key: string]: IconType } = {
    "/user/preview": IoEyeOutline,
  };
  const Icon = IconMap[path];

  return (
    <>
      {pathname === "/user/preview" ? (
        <ShareLink />
      ) : (
        <Link
          href={path}
          className={cn(
            "button py-[11px] sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-light",
            {
              "bg-base-light":
                pathname === path && pathname !== "/user/preview",
            }
          )}
        >
          <p className="sm:inline-flex hS hidden">{title}</p>
          {Icon && <Icon className="flex sm:hidden size-4" />}
        </Link>
      )}
    </>
  );
}
