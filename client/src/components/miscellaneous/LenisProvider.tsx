"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function LenisProvider({ children }: { children: React.ReactNode }) {
  {
    /* <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: false }}> */
  }
  return <ReactLenis root>{children}</ReactLenis>;
}

export default LenisProvider;

export const Progressbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#633CFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};
