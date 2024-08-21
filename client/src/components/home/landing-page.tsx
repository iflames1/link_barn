"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { Features } from "./features";
import Hero from "./hero";

export function LandingPage() {
  return (
    <div className="h-full relative w-full overflow-hidden bg-white text-black bM flex flex-col items-center justify-center rounded-xl p-4">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="overflow-auto relative z-20">
        <Hero />
        <Features />
      </div>
    </div>
  );
}
