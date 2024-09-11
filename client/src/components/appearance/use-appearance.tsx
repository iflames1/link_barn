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
import { useEffect, useState } from "react";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { getUser } from "@/lib/getUser";
import { UserData } from "@/types/links";
import { useWallet } from "@/utils/wallet";
import { toast } from "sonner";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { cn } from "@/lib/utils";

interface PremiumOptionProps {
  title: string;
  price: string;
  txStatus: string;
}

export function PremiumOption({ title, price, txStatus }: PremiumOptionProps) {
  const { sendSTXTransaction } = useWallet();

  const handlePayment = () => {
    sendSTXTransaction(undefined, price, title);
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
          "w-full mt-4 bg-base-dark",
          txStatus === "success" && "cursor-not-allowed"
        )}
        onClick={handlePayment}
        disabled={txStatus === "success" || txStatus === "pending"}
      >
        Choose {title}
      </Button>
    </div>
  );
}

interface UseAppearanceButtonProps {
  appearance: string;
  user: UserData | undefined;
  tire: string;
  txStatus: string;
}

export default function UseAppearanceButton({
  appearance,
  user,
  tire,
  txStatus,
}: UseAppearanceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(user, appearance, txStatus, tire);
  console.log("txStatus", txStatus);

  const handleConfirm = async () => {
    if (user) {
      user.appearance = appearance;
      console.log(user);
      await saveUserDetails(user);
      console.log(`Appearance changed to ${appearance}`);
      setIsOpen(false);
    }
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
            <Button onClick={handleConfirm} className="bg-base-dark">
              Confirm Change
            </Button>
          </div>
        ) : tire === "free" ? (
          <div>
            <p className="">
              {txStatus === "success" ? (
                <span className="">
                  Your previous transaction was success please refresh this page
                  to continue{" "}
                  <IoMdCheckmarkCircleOutline className="text-green-500 inline-flex items-center" />
                </span>
              ) : txStatus === "pending" ? (
                <span className="">
                  Your previous transaction is still pending{" "}
                  <LoaderCircle
                    className="animate-spin inline-flex"
                    size={16}
                  />
                </span>
              ) : (
                <span className="text-red">
                  Your previous transaction failed <AiOutlineInfoCircle />
                </span>
              )}
            </p>
            <DialogTitle className="text-xl font-semibold mb-4">
              Upgrade to Use This Appearance
            </DialogTitle>
            <PremiumOption
              title="Premium (UNIKIND-holders)"
              price="3"
              txStatus={txStatus}
            />
            <PremiumOption title="Premium" price="5" txStatus={txStatus} />
          </div>
        ) : (
          <div className="text-center">
            <DialogTitle className="text-xl font-semibold mb-4">
              Confirm Appearance Change
            </DialogTitle>
            <p className="mb-4">
              Are you sure you want to use this appearance?
            </p>
            <Button className="bg-base-dark" onClick={handleConfirm}>
              Confirm Change
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
