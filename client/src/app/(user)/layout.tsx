import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link Barn - User",
  description: "Manage your links and profile in Link Barn",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="font-instrument bg-gray-light">{children}</div>;
}
