import type { Metadata } from "next";
// import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppWrapper } from "@/context";

export const metadata: Metadata = {
  title: "Link Barn - Profile",
  description: "Modify your profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppWrapper>{children}</AppWrapper>;
}
