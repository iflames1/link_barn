"use client";
import React from "react";
import { Features } from "./features";
import Hero from "./hero";
import { Preview } from "./preview";
import { TestimonialLamp } from "./lamp-testimonial";

export function LandingPage() {
  return (
    <div className="h-full">
      <Hero />
      {/*<TestimonialLamp />*/}
      <Features />
      {/*preview scroll is not working as expected*/}
      {/*<Preview />*/}
    </div>
  );
}
