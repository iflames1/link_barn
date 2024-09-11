"use client";

import { API_BASE_URL } from "@/lib/constants";
import { Button } from "../ui/button";
import { getUserUUID } from "@/lib/auth";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { revalidateTagServer, revalidateUserProfile } from "@/app/actions";
import { useSearchParams } from "next/navigation";

const EditTheme = () => {
  const uuid = getUserUUID();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  const editTheme = async () => {
    setIsLoading(true);
    const toastId = toast.loading(`Updating theme to ${theme} ...`, {
      position: "top-right",
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const url = `${API_BASE_URL}/users/${uuid}`;
      console.log(url, theme);
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          theme: theme,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(response);
        throw new Error("Failed to update theme");
      }

      const data = await response.json();
      console.log(data);

      toast.success("Theme updated successfully", {
        id: toastId,
      });
      await revalidateUserProfile(uuid as string);
      await revalidateTagServer("profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update theme. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={editTheme}
      className="absolute right-2 top-2"
      size="icon"
      variant="outline"
      disabled={isLoading}
    >
      {/* {isLoading ? ( */}
      {/*   <Loader2 className="h-4 w-4 animate-spin" /> */}
      {/* ) : ( */}
      {/*   <Check className="h-4 w-4" /> */}
      {/* )} */}✅
      <span className="sr-only">
        {isLoading ? "Updating theme" : "Update theme"}
      </span>
    </Button>
  );
};

export default EditTheme;
