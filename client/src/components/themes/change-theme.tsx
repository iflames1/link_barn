"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UserData } from "@/types/links";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { toast } from "sonner";

export default function ChangeTheme({
  user,
  theme,
}: {
  user: UserData;
  theme: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    if (user && user.theme !== theme) {
      user.theme = theme;
      await saveUserDetails(user);
      console.log("user theme = ", user.theme);
    } else {
      toast.success("Updated successfully.", { richColors: true });
    }
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-2 left-2 bg-white border border-base-dark text-base-dark hover:bg-base-light">
          Use Theme
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="text-center">
          <DialogTitle className="text-xl font-semibold mb-4">
            Confirm Theme Change
          </DialogTitle>
          <DialogDescription className="mb-4">
            Are you sure you want to use this theme?
          </DialogDescription>{" "}
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-base-dark gap-4"
          >
            Confirm Change{" "}
            <LoaderCircle
              className={cn(`animate-spin`, loading ? "flex" : "hidden")}
              size={16}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
