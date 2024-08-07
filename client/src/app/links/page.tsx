import Header from "@/components/Header";
import Links from "@/components/links/Links";
import Wallet from "@/components/Wallet";

export default function Home() {
  return (
    <div className="min-h-screen sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <Links />
      </div>
      <Wallet />
    </div>
  );
}
