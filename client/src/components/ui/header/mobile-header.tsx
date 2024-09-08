"use client";

import { Button } from "@/components/ui/button";
import { CgClose, CgMenu } from "react-icons/cg";
import * as React from "react";
import { cn } from "@/lib/utils";

export const MobileHeader = ({
  Logo,
  children,
}: {
  Logo: React.ReactNode;
  children: ({
    setIsOpen,
  }: {
    /**
     * Set the open state of the mobile header, use to close the header when a link is clicked
     */
    setIsOpen: (open: boolean) => void;
  }) => React.ReactNode | React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "md:hidden px-4 pt-2",
        isOpen && "fixed inset-0 z-40 dark:bg-zinc-950 bg-zinc-50",
      )}
    >
      <div className="flex justify-between items-center pb-2">
        {Logo}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-xl"
          variant="outline"
        >
          {isOpen ? <CgClose /> : <CgMenu />}
        </Button>
      </div>

      <dialog
        open={isOpen}
        className={
          isOpen
            ? "animate-in fade-in slide-in-from-top-5 flex flex-col gap-3 h-full w-full pt-4 px-4 bg-inherit z-[21]"
            : "hidden"
        }
      >
        {typeof children === "function" ? children({ setIsOpen }) : children}
      </dialog>
    </div>
  );
};
