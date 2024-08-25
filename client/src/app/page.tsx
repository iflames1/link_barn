"use client";
import { Suspense, useEffect, useState } from "react";
import { LandingPage } from "@/components/home/landing-page";
import { Loader } from "lucide-react";
import { HeaderDemo } from "@/components/ui/header/home-header";
import { SiteFooter } from "@/components/home/footer";
import CanvasCursor from "@/components/home/cursor/canvas-cursor";

async function DelayedLandingPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <LandingPage />;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoaded(true);
    };
    loadPage();
  }, []);

  return (
    <div className="bg-white w-full mx-auto flex flex-col gap-6">
      <HeaderDemo variant="default" />
      {isLoaded ? (
        <LandingPage />
      ) : (
        <div className="flex items-center justify-center h-[100vh]">
          <Loader className="animate-spin" size={28} />
        </div>
      )}
      <CanvasCursor />
      {/* <SiteFooter /> */}
      {/* <Suspense */}
      {/*   fallback={ */}
      {/*       <div className="flex items-center justify-center h-[100vh]"> */}
      {/*             <Loader className="animate-spin" size={28} /> */}
      {/*           </div> */}
      {/*   } */}
      {/* > */}
      {/*   <DelayedLandingPage /> */}
      {/* </Suspense> */}
    </div>
  );
}
