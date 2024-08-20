"use client";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { cookies } from "next/headers";

export default function Home() {
  // const cookieStore = cookies();
  console.log("HELLOOO");
  return (
    <div
      className="bg-gray-light sm:p-6 w-full max-w-[1440px] mx-auto"
      suppressHydrationWarning
    >
      <Header />
      <Button>HELLOOOOO Working now? lol</Button>
      <Button asChild>
        {/* <Link href={"/login"}>Back to Login Hmm ibterestin</Link> */}
      </Button>
      {/* <div>{cookieStore.get("uuid")?.value} | Hello</div> */}
    </div>
  );
}
