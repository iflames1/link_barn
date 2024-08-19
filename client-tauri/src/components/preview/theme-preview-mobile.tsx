"use client";
import { Theme } from "@/types/themes";
import { ThemePreviewLink } from "./theme-preview";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const ThemePreviewMobile = ({ theme }: { theme: Theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflowY = "hidden";
  //   } else {
  //     document.body.style.overflowY = "auto";
  //   }
  // }, [isOpen]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white absolute left-1/2 transform -translate-x-1/2 bottom-5 gap-3 z-20 text-black hover:text-white "
      >
        <Eye />
        Preview
      </Button>
      <>
        {isOpen && (
          <div
            // className={cn(
            //   "flex md:hidden absolute top-[5rem] z-10 left-0 h-full right-0 bg-black pt-14 flex-col items-center",
            //   `${theme.background.value}`,
            // )}
            className={cn(
              "flex md:hidden absolute top-[5rem] z-10 left-0 h-full right-0 bg-black pt-14 flex-col items-center transition-all duration-300",
              isOpen
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "pointer-events-none translate-y-full opacity-0",
              `${theme.background.value}`,
            )}
          >
            <div className="bg-gray-preview size-24 rounded-full mb-3"></div>
            <div className=" flex flex-col items-center gap-2">
              <p
                className={cn(
                  "self-center",
                  `${theme.text.titleColor} ${theme.text.titleFontSize} font-bold`,
                )}
              >
                Name
              </p>
              <p
                className={cn(
                  "self-center",
                  `${theme.text.descriptionColor} ${theme.text.descriptionFontSize}`,
                )}
              >
                Email
              </p>
            </div>
            <div className="mt-7 w-full max-w-[400px]">
              <ThemePreviewLink className="gap-3" links={theme.links} />
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default ThemePreviewMobile;
