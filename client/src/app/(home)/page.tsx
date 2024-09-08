import { LandingPage } from "@/components/home/landing-page";
import { HeaderDemo } from "@/components/ui/header/home-header";
import { SiteFooter } from "@/components/home/footer";

export default async function Home() {
  return (
    <div className="bg-white w-full mx-auto flex flex-col min-h-screen">
      {/* <<<<<<< HEAD */}
      {/* <main className="flex-grow pt-[var(--header-height)]"> */}
      {/* ======= */}
      {/* <HeaderDemo variant="default" /> */}
      {/* <main className="flex-grow pt-[var(--header-height)]"> */}
      {/*   {isLoaded ? ( */}
      {/*     <LandingPage /> */}
      {/*   ) : ( */}
      {/*     <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]"> */}
      {/*       <Loader className="animate-spin" size={28} /> */}
      {/*     </div> */}
      {/*   )} */}
      {/* </main> */}
      <main className="flex-grow">
        <LandingPage />
      </main>
    </div>
  );
}
