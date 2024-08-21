"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import Link from "next/link";
import { BsLightningFill } from "react-icons/bs";

export function TestimonialLamp() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-black py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Welcome to Link Barn
      </motion.h1>
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
    </LampContainer>
  );
}
