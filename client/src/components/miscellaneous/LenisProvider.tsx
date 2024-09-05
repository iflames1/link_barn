"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <ProgressBar
        height="4px"
        color="#633CFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </ReactLenis>
  );
}

export default LenisProvider;
