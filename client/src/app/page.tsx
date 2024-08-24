"use client";
import { LandingPage } from "@/components/home/landing-page";
import { useEffect, useState } from "react";
import Loading from "./[username]/loading";

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
      {isLoaded ? <LandingPage /> : <Loading />}
    </div>
  );
}
