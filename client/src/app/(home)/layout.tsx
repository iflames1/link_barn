import LenisProvider from "@/components/miscellaneous/LenisProvider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LenisProvider>{children}</LenisProvider>;
}
