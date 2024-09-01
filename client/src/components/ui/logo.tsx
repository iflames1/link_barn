import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const LogoLink = () => {
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
        className="text-center text-lg font-semibold"
      >
        Link Barn
      </motion.p>
    </Link>
  );
};
