import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppWrapper } from "@/context";

export const metadata: Metadata = {
  title: "Link Barn",
  description:
    "Link Barn is a versatile tool for managing, organizing, and sharing your links. Effortlessly create, update, delete, and reorder your links in a user-friendly interface. Perfect for personal or professional use, Link Barn helps you keep all your valuable resources in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-instrument bg-gray-light `}>
        <AppWrapper>
          {children}
          <Toaster />
        </AppWrapper>
      </body>
    </html>
  );
}
