import { cva, type VariantProps } from "class-variance-authority";
import { MobileHeader } from "./mobile-header";
import { cn } from "@/lib/utils";
import { ScrollAwareHeader } from "./scroll-aware-header";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

const headerVariants = cva("mx-auto", {
  variants: {
    variant: {
      default: "max-w-7xl",
      centered:
        "max-w-4xl rounded-full mt-2 border shadow-lg dark:border-zinc-900",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

export interface HeaderProps extends VariantProps<typeof headerVariants> {
  sticky?: boolean;
  Logo: React.ReactNode;
  mobileItems: ({
    setIsOpen,
  }: {
    setIsOpen: (open: boolean) => void;
  }) => React.ReactNode | React.ReactNode;
  desktopItems: React.ReactNode;
}

export const Header = ({
  Logo,
  sticky,
  variant,
  mobileItems,
  desktopItems,
}: HeaderProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      if (current < 10) {
        // Show header when very close to the top
        setVisible(true);
      } else if (current < prevScrollY) {
        // Scrolling up
        setVisible(true);
      } else if (current > prevScrollY && current > 10) {
        // Scrolling down and not at the top
        setVisible(false);
      }
      setPrevScrollY(current);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "w-full dark:bg-zinc-950/50 md:px-5 z-[999] sticky-header",
          sticky && variant == "centered" && "md:sticky top-3",
          sticky && variant == "default" && "md:sticky top-3",
        )}
      >
        <ScrollAwareHeader
          className={cn("hidden md:block", headerVariants({ variant }))}
          normal={"transition-all duration-150 border backdrop-blur-xl"}
          isTopFalse="border border-gray rounded-xl"
          isTopTrue="border-b-gray border-l-transparent border-r-transparent border-t-transparent"
        >
          <div className="flex-row-start flex justify-between px-6 py-4 w-full gap-2">
            {Logo}
            <nav className="flex-row-end gap-3 lg:gap-8">{desktopItems}</nav>
          </div>
        </ScrollAwareHeader>
        <MobileHeader Logo={Logo}>{mobileItems}</MobileHeader>
      </motion.header>
    </AnimatePresence>
  );
};
