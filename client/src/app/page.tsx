import Header from "@/components/header";
import { LandingPage } from "@/components/home/landing-page";

export default function Home() {
  return (
    <div className="bg-gray-light sm:p-6 w-full h-screen max-w-[1440px] mx-auto flex flex-col gap-6">
      {/* <Header /> */}
      <LandingPage />
    </div>
  );
}
