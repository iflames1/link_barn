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

export function ShareLink() {
  const { getData, userProfileDetails, updateUserProfile, saveUserDetails } =
    useAppContext();
  const { checkUserExists } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userID = getUserUUID();
      if (userID) {
        console.log("UUID", userID);
        const res = await getData(API_BASE_URL + "/users/?user_id=" + userID);
        if (res) {
          console.log("Successfully fetched user details");
          setUsername(userProfileDetails?.username || "");
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
        console.log("Successfully updated username");
      } else {
        saveUserDetails();
      }
    };
    setIsEditing(false);
    validate();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserProfile({ username: e.target.value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hS py-[11px] px-[27px] bg-base-dark text-white hover:bg-opacity-90 rounded-lg">
          Share Link
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view your link barn.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`https://linkbarn.tech/${userProfileDetails?.username}`}
                readOnly={!isEditing}
                onChange={handleUsernameChange}
              />
            </div>
            <button
              type="button"
              className="p-3 text-white bg-base-dark hover:bg-opacity-90 rounded-lg h-full"
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
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
                onClick={() => setIsEditing(true)}
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
