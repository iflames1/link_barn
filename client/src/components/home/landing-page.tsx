import React from "react";
import Hero from "./hero";
import { FeaturesSectionDemo } from "./feats";
import { Testimonials } from "./testimonials";
import FAQs from "./faqs";

export function LandingPage() {
  return (
    <div className="h-full flex flex-col gap-16">
      <Hero />
      {/* <div> */}
      <div className="md:h-[50rem] lg:h-[40rem] w-full flex-col dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h3 className="mt-16 sm:mt-20 text-black px-4 text-center text-xl sm:text-3xl md:text-[36px] lg:text-[48px] max-w-[1240px] font-bold md:leading-[55.68px]">
          Creating Links & Sharing Made Easy
        </h3>
        <FeaturesSectionDemo />
      </div>
      <div>
        <h3 className="text-center text-black px-4 text-2xl sm:text-3xl md:text-[36px] lg:text-[48px] font-bold md:leading-[55.68px] mb-4 md:mb-12">
          What people say about Link Barn
        </h3>
        <Testimonials />
      </div>
      <div>
        <h3 className="text-center text-black  px-4 text-2xl sm:text-3xl md:text-3xl md:text-[36px] lg:text-[48px] font-bold md:leading-[55.68px] md:mb-12">
          FAQs
        </h3>
        <FAQs />
        {/* <Testimonials /> */}
      </div>
    </div>
  );
}
