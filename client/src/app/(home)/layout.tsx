import { SiteFooter } from "@/components/home/footer";
import LenisProvider from "@/components/miscellaneous/LenisProvider";
import { HeaderDemo } from "@/components/ui/header/home-header";
import SmoothCursor from "@/components/ui/smooth-cursor";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderDemo variant="default" />
      {children}
      <SiteFooter />
      <SmoothCursor />
    </>
  );
}
