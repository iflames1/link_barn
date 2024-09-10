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
      <p>
        {txStatus === "success" ? (
          <span className="">
            your previous transaction was success please refresh this page to
            continue <IoMdCheckmarkCircleOutline className="text-green-500" />
          </span>
        ) : txStatus === "pending" ? (
          <span>
            your previous transaction is still pending{" "}
            <LoaderCircle className="animate-spin" size={16} />
          </span>
        ) : txStatus === "failed" ? (
          <span className="text-red">
            your previous transaction failed <AiOutlineInfoCircle />
          </span>
        ) : (
          ""
        )}
      </p>
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
      <Button className="w-full mt-4 bg-base-dark" onClick={handlePayment}>
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
  //const [user, setUser] = useState<UserData | undefined>();
  //const [tire, setTire] = useState<string>();
  //const [prevTxID, setPrevTxID] = useState<string>("");
  //const [txStatus, setTxStatus] = useState<string>("");

  //useEffect(() => {
  //  const fetchUserData = async () => {
  //    const result = await getUser();
  //    if (result) {
  //      setUser(result.userData);
  //      //setTire(result.userData.tire);
  //      setTire("free");
  //      //setPrevTxID(result.userData.prevTxID);
  //      setPrevTxID(
  //        "0xa6d228c5f0f6d6d476a6b1522987e6fa3c729438e8bee0831e9b656b8bc8ab0b"
  //      );
  //    }
  //  };
  //  fetchUserData();
  //});

  //useEffect(() => {
  //  async function checkTransactionStatus(txID = "") {
  //    if (txID === "") return "no prev tx made";
  //    const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txID}`;

  //    try {
  //      const response = await fetch(url);
  //      const data = await response.json();
  //      console.log("Transaction Status:", data.tx_status);

  //      handleTx(data.tx_status);
  //      //if (data.tx_status === "success") {
  //      //  console.log("Transaction confirmed!");
  //      //  return "success";
  //      //} else if (data.tx_status === "pending") {
  //      //  console.log("Transaction is pending...");
  //      //  return "pending";
  //      //} else {
  //      //  console.log("Transaction failed:", data);
  //      //  return "failed";
  //      //}
  //    } catch (error) {
  //      console.error("Error fetching transaction status:", error);
  //      toast.error("error checking previous transaction status");
  //    }
  //  }

  //  async function handleTx(txStatus: string) {
  //    if (txStatus === "success") {
  //      //user.prevTxID = "";
  //      //user.tire = "premium";
  //      console.log(user);
  //      await saveUserDetails(user);
  //      setTxStatus("successful");
  //    } else if (txStatus == "pending") {
  //      setTxStatus("pending");
  //    } else {
  //      setTxStatus("failed");
  //    }
  //  }

  //  checkTransactionStatus(prevTxID);
  //}, []);

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
