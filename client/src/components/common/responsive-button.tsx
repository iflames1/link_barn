"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { IconType } from "react-icons";
import { RiPaintFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

interface TabProps {
  path: string;
  title: string;
  className: string;
}

const IconMap: { [key: string]: IconType } = {
  "/user/appearance": LuLayoutDashboard,
  "/user/themes": RiPaintFill,
};

export default function ResponsiveButton({ path, title, className }: TabProps) {
  const [showLink, setShowLink] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const Icon = IconMap[path];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowLink(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconClick = () => {
    setShowLink(true);
  };

  return (
    <div className={`${className}`} ref={buttonRef}>
      <Link
        href={path}
        className="hidden sm:flex bg-white button py-[11px] px-7 border border-base-dark text-base-dark hover:bg-base-light"
      >
        <span>{title}</span>
      </Link>
      <div className="sm:hidden">
        <div className="bg-white button py-[11px] px-4 border border-base-dark text-base-dark hover:bg-base-light relative overflow-hidden">
          <div className="flex items-center justify-between h-6">
            <AnimatePresence mode="wait">
              {showLink ? (
                <motion.div
                  key="title"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex-grow flex items-center justify-center"
                >
                  <Link href={path} className="flex items-center">
                    <span>{title}</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-grow flex items-center justify-center"
                >
                  <Icon
                    className="size-4 cursor-pointer"
                    onClick={handleIconClick}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
