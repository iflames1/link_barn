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
import { useEffect, useState } from "react";
import { UserData } from "@/types/links";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { toast } from "sonner";
import { checkTransactionStatus } from "@/lib/checkTransactionStatus";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CgSmileSad } from "react-icons/cg";
import { PremiumOption } from "../premium-option";
import { revalidateTagServer, revalidateUserProfile } from "@/app/actions";

export default function ChangeTheme({
  user,
  theme,
  status,
}: {
  user: UserData;
  theme: string;
  status: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [txStatus, setTxStatus] = useState<string>(status);

  // useEffect(() => {

  // });

  const handleConfirm = async () => {
    setLoading(true);
    if (user && user.theme !== theme) {
      user.theme = theme;
      await saveUserDetails(user);
      await revalidateTagServer("profile");
      await revalidateUserProfile(user.uuid);
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
        <Button className="absolute top-2 left-2 text-white bg-base-dark">
          Use Theme
        </Button>
      </DialogTrigger>
      <DialogContent>
        {user.tier === "free" ? (
          <div>
            <p className="">
              {status === "success" ? (
                <span className="flex items-center gap-1">
                  Your previous transaction was success please refresh this page
                  to continue{" "}
                  <IoMdCheckmarkCircleOutline className="text-green-500 inline-flex items-center" />
                </span>
              ) : status === "pending" ? (
                <span className="flex items-center gap-1">
                  Your previous transaction is still pending{" "}
                  <LoaderCircle
                    className="animate-spin inline-flex"
                    size={16}
                  />
                </span>
              ) : status === "failed" ? (
                <span className="text-red flex items-center gap-1">
                  Your previous transaction failed <AiOutlineInfoCircle />
                </span>
              ) : status === "dropped" ? (
                <span>
                  Your previous transaction was dropped <CgSmileSad />
                </span>
              ) : (
                ""
              )}
            </p>
            <DialogTitle className="text-xl font-semibold mb-4">
              Upgrade to Use This Theme
            </DialogTitle>
            <PremiumOption
              title="Link Barn Premium (UNIKIND-holders)"
              price="2"
              txStatus={status}
              user={user}
            />
            <PremiumOption
              title="Link Barn Premium"
              price="5"
              txStatus={status}
              user={user}
            />
          </div>
        ) : (
          <div className="text-center">
            <DialogTitle className="text-xl font-semibold mb-4">
              Confirm theme Change
            </DialogTitle>
            <p className="mb-4">
              Are you sure you want to use the {theme} theme?
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
