"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const LogoLink = ({ footer = false }: { footer?: boolean }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link href={"/"} className="flex items-center gap-2">
      <motion.div
        initial={{ x: 50 }}
        animate={{ x: showText ? 0 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={"/unik.png"}
          alt=""
          width={30}
          height={30}
          className="rounded-lg"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className={cn("text-center text-lg font-semibold", footer && "text-xl")}
      >
        Link Barn
      </motion.p>
    </Link>
  );
};

export const JoinLinkBarn = ({
  username,
}: {
  username: string | undefined;
}) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      href={"/"}
      className={`flex items-center gap-2 py-3 px-4 w-fit rounded-full bg-white bg-opacity-20
    backdrop-filter backdrop-blur-lg
    hover:bg-opacity-30
    transition-all duration-300`}
    >
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: showText ? 0 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={"/unik.png"}
          alt=""
          width={18}
          height={18}
          className="rounded"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold"
      >
        Join {username} on LinkBarn
      </motion.p>
    </Link>
  );
};
