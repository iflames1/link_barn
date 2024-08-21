"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

const content = [
  {
    title: "One Link for Everything",
    description:
      "Simplify your online presence with Link Barn. Share all your important links through a single, customizable page. Whether it's your social media profiles, portfolio, or latest content, everything is just one click away for your audience.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        One Link for Everything
      </div>
    ),
  },
  {
    title: "Easy Customization",
    description:
      "Make your Link Barn page truly yours. Customize theme and layouts to match your personal brand. No coding skills required – our intuitive interface makes it simple to create a page that stands out.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Easy Customization
      </div>
    ),
  },
  {
    title: "Mobile Optimization",
    description:
      "Your Link Barn page looks great on any device. Our responsive design ensures that whether your audience is on desktop, tablet, or mobile, they'll have a seamless experience accessing your links.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--indigo-500))] flex items-center justify-center text-white">
        Mobile Optimization
      </div>
    ),
  },
];

export function Features() {
  return (
    <div className="pt-10 relative z-20">
      <h2 className="hM text-center pb-8">Features</h2>
      <StickyScroll content={content} />
    </div>
  );
}
