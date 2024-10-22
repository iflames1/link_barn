"use client";
import { Copy, FileEdit, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { IoCheckmarkSharp } from "react-icons/io5";
import { checkUserExists } from "@/lib/queries";
import { ConfettiSideCannons } from "../ui/confetti-side";
import { FaShareAlt } from "react-icons/fa";
import { getUser } from "@/lib/getUser";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { UserData } from "@/types/links";
import { revalidateTagServer } from "@/app/actions";

export default function ShareLink() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [username, setUsername] = useState("");
  const [prevUsername, setPrevUsername] = useState("");
  const [user, setUser] = useState<UserData>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res) {
        setUser(res.userData);
        setUsername(res.userData.username);
        setPrevUsername(res.userData.username);
      }
    };
    fetchUser();
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/${username}`
        : `https://www.linkbarn.tech/${username}`,
    );
    console.log("Link copied to clipboard!");
    setCopied(true);
    toast.success("Link copied to clipboard!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!username || username.trim() === "") {
      toast.warning("Username can't be empty", {
        richColors: true,
      });
      setLoading(false);
      return;
    }

    if (username.toLowerCase().endsWith(".btc")) {
      toast.error(
        "Usernames ending with '.btc' are reserved for future bns feature",
        {
          richColors: true,
        },
      );
      setLoading(false);
      return;
    }

    if (username === prevUsername) {
      toast.info("No changes to save", { richColors: true });
      setLoading(false);
      return;
    }

    if (user) {
      const userExist: { status: boolean; message?: string } =
        await checkUserExists("username", username);
      if (!userExist.status && userExist.message === "User does not exist") {
        user.username = username;
        await saveUserDetails(user);
        await revalidateTagServer("usernames");
        setPrevUsername(username);
        setIsEditing(false);
        setLoading(false);
        return;
      } else if (userExist.status && username !== prevUsername) {
        toast.error("User with that username already exist, try another");
        setLoading(false);
        return;
      } else {
        toast.error("Something went wrong, please try again later");
        setLoading(false);
      }
      return;
    }
    console.log("return here");
    setIsEditing(false);
    setLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button py-[11px] sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-light">
          <span className="hidden sm:flex">Share Link</span>
          <FaShareAlt className="flex sm:hidden size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view your link barn.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <div className="flex items-center justify-between border border-base-dark rounded-lg pl-2 py-2">
                <div className="flex items-center">
                  <span className="text-gray-dark">linkbarn.tech/</span>
                  <Input
                    id="link"
                    ref={inputRef}
                    defaultValue={username}
                    readOnly={!isEditing}
                    onChange={handleUsernameChange}
                    className="border-none outline-none flex-grow text-black p-0 h-fit focus-within:ring-0 focus-within:ring-offset-0"
                  />
                </div>
                <Button
                  onClick={() => {
                    setIsEditing(true);
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                  type="button"
                  variant={"ghost"}
                  size={"icon"}
                >
                  <FileEdit className="text-base-dark" size={17} />
                </Button>
              </div>
            </div>
            <ConfettiSideCannons
              disabled={loading}
              onClick={() => {
                isEditing
                  ? toast.info("Save Changes to copy link")
                  : handleCopyLink();
              }}
              isEditing={isEditing}
              className=" rounded-lg h-full p-5"
            >
              <span className="sr-only">Copy</span>
              {copied ? (
                <IoCheckmarkSharp className="size-5" />
              ) : (
                <Copy className="size-5" />
              )}
            </ConfettiSideCannons>
          </div>
          <DialogFooter className="justify-end">
            {prevUsername !== username && (
              <Button
                type="submit"
                variant={"outline"}
                disabled={
                  loading || !username || username.trim() === "" || !user
                }
                className="button py-[11px] hover:text-base-light gap-4 sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-dark"
              >
                {loading && <LoaderCircle className="animate-spin" size={18} />}
                Save changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
