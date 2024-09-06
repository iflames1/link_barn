import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { MobileHeader } from "./mobile-header";
import { cn } from "@/lib/utils";
import { ScrollAwareHeader } from "./scroll-aware-header";

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
  /**
   * Items to be displayed on mobile
   */
  mobileItems: ({
    setIsOpen,
  }: {
    setIsOpen: (open: boolean) => void;
  }) => React.ReactNode | React.ReactNode;
  /**
   * Items to be displayed on desktop
   */
  desktopItems: React.ReactNode;
}

//======================================
export const Header = ({
  Logo,
  sticky,
  variant,
  mobileItems,
  desktopItems,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full dark:bg-zinc-950/50 backdrop-blur-xl md:px-5 z-[999] sticky-header",
        sticky && variant == "centered" && "md:sticky top-3",
        sticky && variant == "default" && "md:sticky top-3",
      )}
    >
      <ScrollAwareHeader
        className={cn("hidden md:block", headerVariants({ variant }))}
        normal={"transition-all duration-150 border"}
        isTopFalse="border border-gray rounded-xl"
        isTopTrue="border-b-gray border-l-transparent border-r-transparent border-t-transparent"
      >
        <div className="flex-row-start flex justify-between px-6 py-4 w-full gap-2">
          {Logo}
          <nav className="flex-row-end gap-3 lg:gap-8">{desktopItems}</nav>
        </div>
      </ScrollAwareHeader>
      <MobileHeader Logo={Logo}>{mobileItems}</MobileHeader>
    </header>
  );
};
