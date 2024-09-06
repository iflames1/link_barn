"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { IoEyeOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { ShareLink } from "@/components/preview/share";

interface TabProps {
  path: string;
  title: string;
}

//const ShareLink = dynamic(
//  () => import("@/components/preview/share").then((mod) => mod.ShareLink),
//  {
//    ssr: false,
//    loading: () => (
//      <Dialog open>
//        <DialogContent>
//          <LoaderCircle className="animate-spin" />
//        </DialogContent>
//      </Dialog>
//    ),
//  }
//);

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
