import Header from "@/components/header";
import { LandingPage } from "@/components/home/landing-page";

export default function Home() {
  return (
    <div className="bg-white w-full h-screen mx-auto flex flex-col gap-6">
      {/* <Header /> */}
      <LandingPage />
    </div>
  );
}
