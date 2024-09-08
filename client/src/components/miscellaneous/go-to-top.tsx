"use client";

// import { useStateCtx } from "@/context/StateContext";
import useWindowHeight from "@/hooks/use-window-height";
import { cn } from "@/lib/utils";

import React, { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

const GotoTop = () => {
  // const { hideNav } = useStateCtx();
  const { scrollY } = useWindowHeight();

  const [hideToTop, setHideToTop] = useState(false);
  useEffect(() => {
    let prevScrollpos = window.scrollY;
    // console.log("PREV", prevScrollpos);
    window.onscroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollpos >= currentScrollPos) {
        setHideToTop(false);
      } else {
        setHideToTop(true);
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  const handleTop = () => {
    window && window.scroll({ top: 0, behavior: "smooth" });
  };

  return hideToTop ? null : (
    <div
      role="button"
      onClick={handleTop}
      className={cn(
        " fixed bottom-12 right-2    z-[9999] mx-auto  flex max-w-[1440px] select-none  items-center rounded border border-white bg-base-dark text-2xl text-white backdrop-blur-xl transition-all  duration-1000 active:scale-95 active:duration-300 dark:bg-white dark:text-black dark:shadow-[0_0_40px_0_rgba(255,255,255,0.26)] max-[400px]:bottom-16 sm:bottom-16 sm:right-5 sm:text-4xl",
        scrollY > 1000
          ? "translate-x-0 opacity-100 shadow-[0_0_40px_0_rgba(0,0,0,0.16)]"
          : "translate-x-20 opacity-0",
      )}
    >
      <FiChevronUp />
    </div>
  );
};

export default GotoTop;
