"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
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
import { handleFileUpload } from "@/lib/handleFileUpload";

interface UseAppearanceButtonProps {
  user: UserData | undefined;
  initialProfileData: React.MutableRefObject<UserData | undefined>;
  selectedFile: File | null;
}

export default function SaveProfileDetails({
  user,
  initialProfileData,
  selectedFile,
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

  function isEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 == null ||
      obj2 == null
    )
      return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  }

  const hasChanged = useCallback(() => {
    console.log("hasChanged");
    console.log(initialProfileData, user);
    if (!user || !initialProfileData.current) return false;
    return !isEqual(user, initialProfileData.current);
  }, [user]);

  // const hasChanged = useCallback(() => {
  //   if (!user || !initialProfileData.current) return false;
  //
  //   return Object.keys(user).some(
  //     (key) =>
  //       user[key as keyof UserData] !==
  //       initialProfileData.current?.[key as keyof UserData],
  //   );
  // }, [initialProfileData, user]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!hasChanged() && !selectedFile) {
      toast.info("No changes to save", { richColors: true });
      console.log("No changes to save");
      return;
    }
    setLoading(true);
    try {
      if (hasChanged() && user) await saveUserDetails(user);

      if (selectedFile) await handleFileUpload(selectedFile);

      initialProfileData.current = user;

      toast.success("Profile updated successfully");
      setIsOpen(false);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={loading}
          className="text-white bg-base-dark gap-3 sm:w-fit w-full"
        >
          Save
          <LoaderCircle
            className={cn(`animate-spin`, loading ? "flex" : "hidden")}
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
              price="0"
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
              Confirm update profile details
            </DialogTitle>
            <p className="mb-4">Do you want to save the changes?</p>
            <div className="flex gap-4">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-base-dark gap-4"
              >
                Save
                <LoaderCircle
                  className={cn(`animate-spin`, loading ? "flex" : "hidden")}
                  size={16}
                />
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
