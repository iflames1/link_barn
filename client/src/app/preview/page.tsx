import Header from "@/components/header";
import PreviewSetup from "@/components/preview/preview-setup";

export default function Home() {
  return (
    <div className="bg-gray-light sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="rounded-xl sm:p-6 p-4">
        <PreviewSetup />
      </div>
      {/* <Wallet /> */}
    </div>
  );
}
