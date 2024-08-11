import Header from "@/components/Header";
import Preview from "@/components/Preview";
import Wallet from "@/components/Wallet";

export default function Home() {
  return (
    <div className="bg-gray-light sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="rounded-xl sm:p-6 p-4">
        <Preview />
      </div>
      <Wallet />
    </div>
  );
}
