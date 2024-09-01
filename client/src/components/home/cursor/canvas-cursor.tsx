"use client";

import useCanvasCursor from "./CanvasCursor";

const CanvasCursor = () => {
  useCanvasCursor();

  return (
    <canvas
      className="pointer-events-none fixed inset-0 hidden lg:flex"
      id="canvas"
    />
  );
};
export default CanvasCursor;
