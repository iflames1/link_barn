"use client";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { getUserUUID } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";
import { useWallet } from "@/utils/wallet";
import { toast } from "sonner";
import { IoCheckmarkSharp } from "react-icons/io5";

export function ShareLink() {
  const { getData, userProfileDetails, updateUserProfile, saveUserDetails } =
    useAppContext();
  const { checkUserExists } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userID = getUserUUID();
      if (userID) {
        console.log("UUID", userID);
        const res = await getData(API_BASE_URL + "/users/?user_id=" + userID);
        if (res) {
          console.log("Successfully fetched user details");
          setUsername(userProfileDetails?.username || "");
          console.log(username);
        } else {
          console.log("failed to get user");
        }
      }
    };

    fetchUser();
  }, [getData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = async () => {
      const res = await checkUserExists(
        "username",
        userProfileDetails?.username
      );
      if (res.status && userProfileDetails?.username !== username) {
        console.log("User with that username already exist");
        toast.error("User with that username already exist, try another");
      } else if (res.status && userProfileDetails?.username === username) {
        toast.success("Username updated successfully");
        console.log("Successfully updated username");
        setIsEditing(false);
      } else {
        saveUserDetails();
        setIsEditing(false);
      }
    };
    validate();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserProfile({ username: e.target.value });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://linkbarn.tech/${userProfileDetails?.username}`
    );
    console.log("Link copied to clipboard!");
    setCopied(true);
    toast.success("Link copied to clipboard!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hS py-[11px] px-[27px] bg-base-dark text-white hover:bg-opacity-90 rounded-lg">
          Share Link
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view your link barn.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <div className="flex items-center border border-base-dark rounded-lg px-2 py-[11px]">
                <span className="text-gray-dark">linkbarn.tech/</span>
                <Input
                  id="link"
                  type="text"
                  defaultValue={userProfileDetails?.username}
                  readOnly={!isEditing}
                  onChange={handleUsernameChange}
                  className="border-none outline-none flex-grow text-black p-0 h-fit focus-within:ring-0 focus-within:ring-offset-0"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                isEditing
                  ? toast.info("Save Changes to copy link")
                  : handleCopyLink();
              }}
              className="text-white bg-base-dark hover:bg-opacity-90 rounded-lg h-full p-4"
            >
              <span className="sr-only">Copy</span>
              {copied ? (
                <IoCheckmarkSharp className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>
          <DialogFooter className="sm:justify-start">
            {isEditing ? (
              <button
                type="submit"
                className="button py-[11px] sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-light"
              >
                Save changes
              </button>
            ) : (
              <button
                className="button py-[11px] sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-light"
                type="button"
                onClick={(e) => {
                  setIsEditing(true);
                  e.preventDefault();
                }}
              >
                {userProfileDetails?.username
                  ? "Change Username"
                  : "Add Username"}
              </button>
            )}
            {/*<DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>*/}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
