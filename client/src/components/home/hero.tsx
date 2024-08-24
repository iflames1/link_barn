import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { BorderBeam } from "../ui/border-beam";
import Image from "next/image";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-white text-black bM flex flex-col items-center justify-center rounded-xl p-4 pb-12">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="overflow-auto max-w-[1100px] w-full relative z-20">
        <div className="w-full flex flex-col items-center justify-center py-10">
          <div className="z-10 flex my-3 items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <Link href={"/auth/login"} className="text-sm">
                  ✨ Introducing Link Barn
                </Link>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          <h1 className={"hM"}>Welcome to Link Barn</h1>
          {/* <InView */}
          {/*   variants={{ */}
          {/*     hidden: { opacity: 0, y: 100, filter: "blur(4px)" }, */}
          {/*     visible: { opacity: 1, y: 0, filter: "blur(0px)" }, */}
          {/*   }} */}
          {/*   viewOptions={{ margin: "0px 0px -80px 0px" }} */}
          {/*   transition={{ duration: 0.5, ease: "easeInOut" }} */}
          {/* > */}
          <p className="text-center pt-2 pb-8 max-w-md">
            Your one-stop destination for all your important links. Simplify
            your online presence and share what matters most.
          </p>
          {/* </InView> */}
          <Link
            href={"/user/links"}
            className="hS button text-white bg-base-dark hover:bg-opacity-90"
          >
            Get Started
          </Link>
          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <h3 className="hS">Easy to Use</h3>
              {/* <p className="items-center gap-3 hidden lg:flex"> */}
              {/*   Create links at */}
              {/*   <Cover> */}
              {/*     warp speed */}
              {/*     <BsLightningFill className="inline-flex text-orange-400" /> */}
              {/*   </Cover> */}
              {/* </p> */}
              <p>Create links at ease</p>
            </div>
            <div className="text-center">
              <h3 className="hS mb-1">Customizable</h3>
              <p>Make it match your brand</p>
            </div>
          </div>
        </div>
        <div className="relative flex h-[400px] md:h-[600px] w-full max-w-[1100px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            <Image
              src={"/hero-2.png"}
              className="w-full h-full object-cover"
              height={600}
              width={600}
              alt=""
            />
          </span>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </div>
    </div>
  );
}
