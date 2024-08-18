"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";

export const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="gap-4 w-full max-w-[300px]"
    >
      {pending ? (
        <Loader2 size={17} className="animate-spin" color="#000" />
      ) : (
        <FcGoogle />
      )}
      Continue with Google
    </Button>
  );
};
