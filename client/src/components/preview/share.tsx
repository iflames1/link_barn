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
import { useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { toast } from "sonner";
import { IoCheckmarkSharp } from "react-icons/io5";
import { checkUserExists } from "@/lib/queries";
import axios from "axios";
import { revalidateTagServer } from "@/app/actions";
import { ConfettiSideCannons } from "../ui/confetti-side";

export function ShareLink({ userProfileDetails }: { userProfileDetails: any }) {
  // const { getData, userProfileDetails, updateUserProfile, saveUserDetails } =
  //   useAppContext();
  // const { checkUserExists } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(userProfileDetails?.username);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userID = getUserUUID();
  //     if (userID) {
  //       console.log("UUID", userID);
  //       const res = await getData(API_BASE_URL + "/users/?user_id=" + userID);
  //       if (res) {
  //         console.log("Successfully fetched user details");
  //         setUsername(userProfileDetails?.username || "");
  //         console.log(username);
  //       } else {
  //         console.log("failed to get user");
  //       }
  //     }
  //   };
  //
  //   fetchUser();
  // }, [getData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const validate = async () => {
      if (username.trim() === "") {
        toast.warning("Username can't be empty", {
          richColors: true,
        });
        setIsLoading(false);
        return;
      }

      // this is to reserve bns names
      if (username.toLowerCase().endsWith(".btc")) {
        toast.error("Usernames ending with '.btc' are reserved for BTC names", {
          richColors: true,
        });
        setIsLoading(false);
        return;
      }

      const res = await checkUserExists("username", username);
      if (res.status && userProfileDetails?.username !== username) {
        console.log("User with that username already exist");
        toast.error("User with that username already exist, try another");
        setIsLoading(false);
      } else {
        try {
          const res = await axios.patch(
            `${API_BASE_URL}/users/${userProfileDetails?.uuid}`,
            {
              username: username,
            },
          );
          const data = await res.data;
          await revalidateTagServer("userProfile");
          console.log(data);

          toast.success("Username updated successfully", {
            richColors: true,
          });
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
        setIsEditing(false);
      }
    };
    validate();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://linkbarn.tech/${username}`);
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
              <div className="flex items-center justify-between border border-base-dark rounded-lg pl-2 py-2">
                <div className="flex items-center">
                  <span className="text-gray-dark">linkbarn.tech/</span>
                  <Input
                    id="link"
                    ref={inputRef}
                    defaultValue={userProfileDetails?.username}
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
            {/* {isEditing ? ( */}
            {/*   <Button */}
            {/*     type="submit" */}
            {/*     variant={"outline"} */}
            {/*     className="button py-[11px] hover:text-base-light sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-dark" */}
            {/*   > */}
            {/*     Save changes */}
            {/*   </Button> */}
            {/* ) : ( */}
            {/*   <Button */}
            {/*     className="button py-[11px] hover:text-base-light sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-dark" */}
            {/*     type="button" */}
            {/*     variant={"outline"} */}
            {/*     onClick={(e) => { */}
            {/*       setIsEditing(true); */}
            {/*       e.preventDefault(); */}
            {/*     }} */}
            {/*   > */}
            {/*     {userProfileDetails?.username */}
            {/*       ? "Change Username" */}
            {/*       : "Add Username"} */}
            {/*   </Button> */}
            {/* )} */}
            {userProfileDetails?.username !== username && (
              <Button
                type="submit"
                variant={"outline"}
                disabled={isLoading}
                className="button py-[11px] hover:text-base-light gap-4 sm:px-7 px-4 border-[1px] border-base-dark text-base-dark  hover:bg-base-dark"
              >
                {isLoading && (
                  <LoaderCircle className="animate-spin" size={18} />
                )}
                Save changes
              </Button>
            )}
            {/* <DialogClose asChild> */}
            {/*   <Button type="button" variant="secondary"> */}
            {/*     Close */}
            {/*   </Button> */}
            {/* </DialogClose> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
