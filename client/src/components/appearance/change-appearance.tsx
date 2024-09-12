"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { UserData } from "@/types/links";
import { toast } from "sonner";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { cn } from "@/lib/utils";
import { CgSmileSad } from "react-icons/cg";
import { PremiumOption } from "../premium-option";
import { LoaderCircle } from "lucide-react";
import { checkTransactionStatus } from "@/lib/checkTransactionStatus";

interface UseAppearanceButtonProps {
  appearance: string;
  user: UserData;
}

export default function UseAppearanceButton({
  appearance,
  user,
}: UseAppearanceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<string>("");

  useEffect(() => {
    const checkStatus = async () => {
      if (user) {
        const status = await checkTransactionStatus(user.prevTxID);
        setTxStatus(status);
        if (status === "success") {
          user.prevTxID = "";
          user.tier = "premium";
          await saveUserDetails(user);
          toast.success("Transaction successful", { richColors: true });
        }
      }
    };

    checkStatus();
  });

  const handleConfirm = async () => {
    setLoading(true);
    if (user && user.appearance !== appearance) {
      user.appearance = appearance;
      await saveUserDetails(user);
      console.log("new layout = ", user.appearance);
    } else {
      toast.success("Updated successfully.", { richColors: true });
    }
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-2 left-2 text-white bg-base-dark">
          Use Layout
        </Button>
      </DialogTrigger>
      <DialogContent>
        {appearance === "layout1" ? (
          <div className="text-center">
            <DialogTitle className="text-xl font-semibold mb-4">
              Confirm Appearance Change
            </DialogTitle>
            <DialogDescription className="mb-4">
              Are you sure you want to use this appearance?
            </DialogDescription>
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
        ) : user.tier === "free" ? (
          <div>
            <p className="">
              {txStatus === "success" ? (
                <span className="flex items-center gap-1">
                  Your previous transaction was success please refresh this page
                  to continue{" "}
                  <IoMdCheckmarkCircleOutline className="text-green-500 inline-flex items-center" />
                </span>
              ) : txStatus === "pending" ? (
                <span className="flex items-center gap-1">
                  Your previous transaction is still pending{" "}
                  <LoaderCircle
                    className="animate-spin inline-flex"
                    size={16}
                  />
                </span>
              ) : txStatus === "failed" ? (
                <span className="text-red flex items-center gap-1">
                  Your previous transaction failed <AiOutlineInfoCircle />
                </span>
              ) : txStatus === "dropped" ? (
                <span>
                  Your previous transaction was dropped <CgSmileSad />
                </span>
              ) : (
                ""
              )}
            </p>
            <DialogTitle className="text-xl font-semibold mb-4">
              Upgrade to Use This Appearance
            </DialogTitle>
            <PremiumOption
              title="Link Barn Premium (UNIKIND-holders)"
              price="3"
              txStatus={txStatus}
              user={user}
            />
            <PremiumOption
              title="Link Barn Premium"
              price="5"
              txStatus={txStatus}
              user={user}
            />
          </div>
        ) : (
          <div className="text-center">
            <DialogTitle className="text-xl font-semibold mb-4">
              Confirm Appearance Change
            </DialogTitle>
            <p className="mb-4">
              Are you sure you want to use this appearance?
            </p>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
