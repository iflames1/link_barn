"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { UserData } from "@/types/links";
import { toast } from "sonner";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { cn } from "@/lib/utils";
import { CgSmileSad } from "react-icons/cg";
import { sendSTXTransaction } from "@/lib/sendSTXTransaction";
import { checkTransactionStatus } from "@/lib/checkTransactionStatus";
import { holdsUnik } from "@/lib/holdsUnik";

interface PremiumOptionProps {
  title: string;
  price: string;
  txStatus: string;
  user: UserData | undefined;
}

export function PremiumOption({
  title,
  price,
  txStatus,
  user,
}: PremiumOptionProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    if (price === "3" && !(await holdsUnik(user?.stx_address_mainnet))) {
      toast.error("You need to hold UNIK to use this option", {
        richColors: true,
      });
      setLoading(false);
      return;
    } else {
      const txId = await sendSTXTransaction(price, title);
      if (user && txId) {
        user.prevTxID = txId;
        await saveUserDetails(user);
        console.log("tx ID = ", user.prevTxID);
        const status = await checkTransactionStatus(txId);
        toast.success("Your transaction have been sent", { richColors: true });
        console.log("tx status = ", status);
      }
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-4">{price}stx one time payment</p>
      <ul className="space-y-2">
        {[
          "Remove Link Barn Branding",
          "Appearance Customization",
          "Product support",
        ].map((benefit, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={16} />
            {benefit}
          </li>
        ))}
      </ul>
      <Button
        className={cn(
          "w-full mt-4 bg-base-dark gap-4",
          txStatus === "success" && "cursor-not-allowed"
        )}
        onClick={handlePayment}
        disabled={txStatus === "success" || txStatus === "pending" || loading}
      >
        Choose {title}{" "}
        <LoaderCircle
          className={cn(
            `animate-spin`,
            loading || txStatus === "pending" ? "flex" : "hidden"
          )}
          size={16}
        />
      </Button>
    </div>
  );
}

interface UseAppearanceButtonProps {
  appearance: string;
  user: UserData | undefined;
  tier: string;
  txStatus: string;
}

export default function UseAppearanceButton({
  appearance,
  user,
  tier,
  txStatus,
}: UseAppearanceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(user, appearance, txStatus, tier);
  const [loading, setLoading] = useState(false);
  console.log("tx status = ", txStatus);

  const handleConfirm = async () => {
    setLoading(true);
    if (user && user.appearance !== appearance) {
      user.appearance = appearance;
      await saveUserDetails(user);
      console.log("new layout = ", user.appearance);
      setIsOpen(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-2 left-2 bg-white border border-base-dark text-base-dark hover:bg-base-light">
          Use Appearance
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
        ) : tier === "free" ? (
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
