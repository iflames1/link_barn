import { LandingPage } from "@/components/home/landing-page";
import { HeaderDemo } from "@/components/ui/header/home-header";
import { SiteFooter } from "@/components/home/footer";

export default async function Home() {
  return (
    <div className="bg-white w-full mx-auto flex flex-col min-h-screen">
      <main className="flex-grow pt-[var(--header-height)]">
        <LandingPage />
      </main>
    </div>
  );
}
