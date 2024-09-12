"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "../ui/border-beam";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { InView } from "../ui/core/in-view";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { falseCV } from "@stacks/transactions";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export function HeroScrollDemo() {
  return (
    <div className="w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col bM items-center justify-center overflow-y-hidden">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <ContainerScroll
        titleComponent={
          <div className="w-full flex flex-col items-center justify-center py-4">
            <div className="z-10 flex my-3 items-center justify-center">
              <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  ✨ Introducing Link Barn
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </div>
            <h1
              className={cn(
                "hM text-[54px] text-center relative z-20 text-[#151515]",
                manrope.className
              )}
            >
              All your Links in One Place
            </h1>
            {/* <h1 */}
            {/*   className={ */}
            {/*     "hM relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500" */}
            {/*   } */}
            {/* > */}
            {/*   Welcome to Link Barn */}
            {/* </h1> */}
            {/* <TypewriterEffectSmooth */}
            {/*   words={words} */}
            {/*   cursorClassName="mt-3 lg:max-h-7 lg:mt-4" */}
            {/* /> */}

            <InView
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              viewOptions={{ margin: "0px 0px 0px 0px" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p className="text-center pt-2 pb-8 max-w-md text-[#566072]">
                Your one-stop destination for all your important links. Simplify
                your online presence and share what matters most.
              </p>
            </InView>
            <Link href={"/user/links"} className="">
              <Button
                variant="outline"
                className="hS button text-white bg-base-dark hover:bg-opacity-90"
              >
                Get Started
              </Button>
            </Link>
            <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="hS">Easy to Use</h3>
                <p>Create links at ease</p>
              </div>
              <div className="text-center">
                <h3 className="hS mb-1">Customizable</h3>
                <p>Make it match your brand</p>
              </div>
            </div>
          </div>
        }
      >
        {/* <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div> */}
        <InView
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          viewOptions={{ margin: "0px 0px 0px 0px" }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.4 }}
        >
          <div
            className={cn(
              "relative flex h-[400px] md:h-[600px] w-full max-w-[1100px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            )}
          >
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              <Image
                src={"/hero-2.png"}
                // src={`/linear.webp`}
                // className="w-full h-full object-cover"
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                // height={600}
                // width={600}
                height={720}
                width={1400}
                draggable={false}
                alt=""
              />
            </span>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </InView>
        {/* <Image */}
        {/*   alt="hero" */}
        {/*   height={720} */}
        {/*   width={1400} */}
        {/*   draggable={false} */}
        {/* /> */}
      </ContainerScroll>
    </div>
  );
}
<>
  <h1 className="text-4xl font-semibold text-black dark:text-white">
    Unleash the power of <br />
    <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
      Scroll Animations
    </span>
  </h1>
</>;
