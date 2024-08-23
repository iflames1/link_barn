import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";

export function ConfettiSideCannons({
  children,
  className,
  onClick,
  isEditing,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  isEditing: boolean;
}) {
  const handleClick = () => {
    if (isEditing) {
      onClick();
      return;
    }
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
    onClick();
  };

  return (
    <div className="relative">
      <Button
        variant={"secondary"}
        className={className}
        type="button"
        onClick={handleClick}
      >
        {children}
      </Button>
    </div>
  );
}
