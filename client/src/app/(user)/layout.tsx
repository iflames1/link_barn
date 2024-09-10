import type { Metadata } from "next";
import CookieConsent from "@/components/ui/cookie-consent";

export const metadata: Metadata = {
  title: {
    default: "User",
    template: "%s - Link Barn",
  },
  description: "Manage your links and profile in Link Barn",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-instrument bg-gray-light">
      <CookieConsent />
      {children}
    </div>
  );
}
