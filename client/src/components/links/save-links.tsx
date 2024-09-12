"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { UserData } from "@/types/links";
import { toast } from "sonner";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { cn } from "@/lib/utils";
import { CgSmileSad } from "react-icons/cg";
import { PremiumOption } from "../premium-option";
import { LoaderCircle } from "lucide-react";
import { checkTransactionStatus } from "@/lib/checkTransactionStatus";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { z } from "zod";

interface SaveLinksProps {
  user: UserData | undefined;
  onSave: () => Promise<void>;
  isLoading: boolean;
}

export default function SaveLinks({ user, onSave, isLoading }: SaveLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSave = async () => {
    await onSave();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading}
          className="text-white bg-base-dark self-end gap-3 hS button"
        >
          Save
          <LoaderCircle
            className={cn(`animate-spin`, isLoading ? "flex" : "hidden")}
            size={16}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {user?.tier === "free" ? (
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
              Save changes
            </DialogTitle>
            <PremiumOption
              title="Link Barn Premium (UNIKIND-holders)"
              price="2"
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
          <div className="text-center flex flex-col items-center">
            <DialogTitle className="text-xl font-semibold mb-4">
              Confirm links changes
            </DialogTitle>
            <p className="mb-4">Do you want to save the changes?</p>
            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-base-dark gap-4"
              >
                Save
                {isLoading && (
                  <LoaderCircle className="animate-spin" size={16} />
                )}
              </Button>
              <Button onClick={() => setIsOpen(false)} className="bg-red gap-4">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
