import { cn } from "@/lib/utils";
import * as React from "react";

interface TableOfContentsListProps
  extends React.ComponentPropsWithoutRef<"ul"> {
  indent?: boolean;
}

const TableOfContentsList = React.forwardRef<
  React.ElementRef<"ul">,
  TableOfContentsListProps
>(({ className, indent, ...props }, ref) => (
  <ul className={cn("m-0 list-none", indent && "pl-4", className)} {...props} />
));
TableOfContentsList.displayName = "TableOfContentsList";

interface TableOfContentsTitleProps
  extends React.ComponentPropsWithoutRef<"li"> {}

const TableOfContentsTitle = React.forwardRef<
  React.ElementRef<"li">,
  TableOfContentsTitleProps
>(({ className, ...props }, ref) => (
  <li className={cn("mb-2 text-sm font-medium", className)} {...props} />
));
TableOfContentsTitle.displayName = "TableOfContentsTitle";

interface TableOfContentsItemProps
  extends React.ComponentPropsWithoutRef<"li"> {
  indent?: boolean;
}

const TableOfContentsItem = React.forwardRef<
  React.ElementRef<"li">,
  TableOfContentsItemProps
>(({ className, indent, ...props }, ref) => (
  <li className={cn("mt-0 pt-2", indent && "ml-4", className)} {...props} />
));
TableOfContentsItem.displayName = "TableOfContentsItem";

interface TableOfContentsLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  isActive?: boolean;
}

const TableOfContentsLink = React.forwardRef<
  React.ElementRef<"a">,
  TableOfContentsLinkProps
>(({ className, isActive, ...props }, ref) => (
  <a
    className={cn(
      "text-foreground hover:text-primary text-sm font-medium transition-colors",
      isActive ? "text-foreground font-medium" : "text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TableOfContentsLink.displayName = "TableOfContentsLink";

export {
  TableOfContentsList,
  TableOfContentsTitle,
  TableOfContentsItem,
  TableOfContentsLink,
};
