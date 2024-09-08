import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Progressbar } from "@/components/miscellaneous/LenisProvider";
import GotoTop from "@/components/miscellaneous/go-to-top";

export const metadata: Metadata = {
  title: {
    default: "Link Barn",
    template: "%s - Link Barn",
  },
  description:
    "Link Barn is a versatile tool for managing, organizing, and sharing your links. Effortlessly create, update, delete, and reorder your links in a user-friendly interface. Perfect for personal or professional use, Link Barn helps you keep all your valuable resources in one place.",
  twitter: {
    card: "summary_large_image",
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Progressbar>{children}</Progressbar>
        <GotoTop />
        <Toaster />
      </body>
    </html>
  );
}
