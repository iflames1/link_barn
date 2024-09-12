import { toast } from "sonner";
import { API_BASE_URL } from "./constants";
import { revalidateTagServer, revalidateUserProfile } from "@/app/actions";
import { getUserUUID } from "./auth";

const uploadStagedFile = async (stagedFile: File | Blob, uuid: string) => {
  const form = new FormData();
  form.set("file", stagedFile);
  console.log(stagedFile);

  try {
    const res = await fetch("/upload", {
      method: "POST",
      body: form,
      headers: {},
    });

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await res.json();
    console.log("Cloudinary Response:", data.imgUrl);

    // Update the user profile with the uploaded image URL
    try {
      const url = `${API_BASE_URL}/users/${uuid}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile_picture: data.imgUrl,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        throw new Error(
          `An error occurred while updating profile: ${responseData.detail}`,
        );
      }

      console.log("API Response:", response, responseData);

      toast.success("Image updated successfully", {
        richColors: true,
      });
      await revalidateUserProfile(uuid);
      await revalidateTagServer("profile");
    } catch (err) {
      console.error("Error updating profile:", err);

      if (err instanceof Error) {
        toast.error(`An error occurred: ${err.message}`, {
          richColors: true,
        });
      } else {
        toast.error("An unknown error occurred", {
          richColors: true,
        });
      }
    }
  } catch (err) {
    console.log("Error uploading image:", err);
  }
};

export const handleFileUpload = async (
  selectedFile: File | null,
  uuid: string | undefined = getUserUUID(),
) => {
  if (selectedFile) {
    console.log(uuid, "Where you go i go");
    await uploadStagedFile(selectedFile, uuid as string);
  } else {
    console.log("No file selected");
  }
};
