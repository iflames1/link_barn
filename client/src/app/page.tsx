import { Suspense, useEffect, useState } from "react";
import { LandingPage } from "@/components/home/landing-page";
import { Loader } from "lucide-react";

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
    <div className="bg-white w-full h-screen mx-auto flex flex-col gap-6">
      <LandingPage />
      {/* <Suspense */}
      {/*   fallback={ */}
      {/*     <div className="flex items-center justify-center h-[100vh]"> */}
      {/*       <Loader className="animate-spin" size={28} /> */}
      {/*     </div> */}
      {/*   } */}
      {/* > */}
      {/*   <DelayedLandingPage /> */}
      {/* </Suspense> */}
    </div>
  );
}
