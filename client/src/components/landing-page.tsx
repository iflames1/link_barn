"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { BsLightningFill } from "react-icons/bs";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="h-full relative w-full overflow-hidden bg-white text-black flex flex-col items-center justify-center rounded-xl p-4">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        <h1 className={cn("md:text-4xl text-xl")}>Welcome to Link Barn</h1>
        <p className="text-center pt-2 pb-8 max-w-md">
          Your one-stop destination for all your important links. Simplify your
          online presence and share what matters most.
        </p>
        <Link
          href={"/user/links"}
          className="hS button text-white bg-base-dark hover:bg-opacity-90"
        >
          Get Started
        </Link>
        <div className="pt-12 grid grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="font-semibold">Easy to Use</h3>
            <p>
              Create your link page in minutes{" "}
              <BsLightningFill className="inline-flex text-orange-400" />
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Customizable</h3>
            <p>Make it match your brand</p>
          </div>
        </div>
      </div>
    </div>
  );
}
