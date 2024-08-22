"use client";
import React from "react";
import { Features } from "./features";
import Hero from "./hero";
import { Preview } from "./preview";
import { TestimonialLamp } from "./lamp-testimonial";
import { HeroScrollDemo } from "./container-scroll";
import { FeaturesSectionDemo } from "./feats";
import { BorderBeam } from "../ui/border-beam";

export function LandingPage() {
  return (
    <div className="h-full">
      <Hero />
      <FeaturesSectionDemo />
      {/*<TestimonialLamp />*/}
      {/*<Features />*/}
      {/*preview scroll is not working as expected*/}
      {/*<Preview />*/}
    </div>
  );
}
