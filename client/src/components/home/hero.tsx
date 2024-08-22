import { BsLightningFill } from "react-icons/bs";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { BorderBeam } from "../ui/border-beam";

export default function Hero() {
  return (
    <div className="h-full relative w-full overflow-hidden bg-white text-black bM flex flex-col items-center justify-center rounded-xl p-4">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="overflow-auto relative z-20">
        <div className="w-full flex flex-col items-center justify-center py-10">
          <h1 className={"hM"}>Welcome to Link Barn</h1>
          <p className="text-center pt-2 pb-8 max-w-md">
            Your one-stop destination for all your important links. Simplify
            your online presence and share what matters most.
          </p>
          <Link
            href={"/user/links"}
            className="hS button text-white bg-base-dark hover:bg-opacity-90"
          >
            Get Started
          </Link>
          <div className="pt-12 grid grid-cols-2 gap-4">
            <div className="text-center">
              <h3 className="hS">Easy to Use</h3>
              <p>
                Create your link page in minutes{" "}
                <BsLightningFill className="inline-flex text-orange-400" />
              </p>
            </div>
            <div className="text-center">
              <h3 className="hS">Customizable</h3>
              <p>Make it match your brand</p>
            </div>
          </div>
        </div>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Border Beam
          </span>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </div>
    </div>
  );
}
