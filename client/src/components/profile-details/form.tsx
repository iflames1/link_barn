"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { API_BASE_URL } from "@/lib/constants";
import { getUserUUID } from "@/lib/auth";
import { toast } from "sonner";
import { useAppContext } from "@/context";
import ImageInput from "./image-input";
import { revalidateTagServer } from "@/app/actions";

export default function Form() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uuid = getUserUUID();
  const { getData, userProfileDetails, updateUserProfile, saveUserDetails } =
    useAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      const userID = getUserUUID();
      if (userID) {
        console.log("UUID", userID);
        const res = await getData(API_BASE_URL + "/users/?user_id=" + userID);
        if (res) {
          console.log("Successfully fetched user details");
        } else {
          console.log("failed to get user");
        }
      }
    };

    fetchUser();
  }, [getData]);

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
        await revalidateTagServer("userProfile");
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

  const handleFileUpload = () => {
    if (selectedFile) {
      uploadStagedFile(selectedFile, uuid as string);
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFileUpload();
    saveUserDetails();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white flex flex-col justify-between rounded-xl lg:w-[60%] h-[calc(100vh-152px)] overflow-auto"
    >
      <div className="sm:p-10 p-6">
        <div className="pb-10">
          <h2 className="pb-2 hM text-black">Profile Details</h2>
          <p className="bM text-gray-dark">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 min-h-[calc(100vh-422px)]">
          <div className="flex md:flex-row flex-col gap-4 md:items-center items-start justify-between p-5 bg-gray-light rounded-xl w-full">
            <p className="bM text-gray-dark">Profile Picture</p>
            <div className=" flex md:flex-row flex-col gap-6 md:items-center items-start justify-between">
              {/*<ImageInput
                image={image}
                setImage={setImage}
                setSelectedFile={setSelectedFile}
              />*/}
              <div
                className="rounded-xl flex flex-col items-center justify-center cursor-pointer hS size-48 relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Profile Picture"
                    width={192}
                    height={192}
                    className="rounded-xl object-cover"
                  />
                ) : (
                  <div className="rounded-xl flex flex-col items-center justify-center cursor-pointer text-base-dark  bg-base-light size-48">
                    <IoImageOutline className="size-10" />
                    <p className="pt-2">+ Upload Image</p>
                  </div>
                )}
                {isHovered && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-2 text-white rounded-xl">
                    <IoImageOutline className="size-10" />
                    <p className="pt-2">Choose Image</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedFile(file as File);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <p className="bS text-gray-dark">
                Image must be below 1024 x 1024px.
                <br /> Use PNG or JPG format.
              </p>
            </div>
          </div>
          <div className="w-full bM bg-gray-light rounded-lg flex flex-col gap-3 p-5">
            <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-1 w-full">
              <label htmlFor="first-name" className="text-gray-dark w-60">
                First name*
              </label>
              <input
                id="first-name"
                placeholder={"John"}
                value={userProfileDetails?.first_name || ""}
                onChange={(e) =>
                  updateUserProfile({ first_name: e.target.value })
                }
                className="py-3 px-4 w-full placeholder:text-gray-dark placeholder:text-base bM text-black border-[1px] border-gray rounded-lg outline-none focus:shadow-active"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-1 w-full">
              <label htmlFor="last-name" className="text-gray-dark w-60">
                Last name
              </label>
              <input
                id="last-name"
                placeholder={"Deo"}
                value={userProfileDetails?.last_name || ""}
                onChange={(e) =>
                  updateUserProfile({ last_name: e.target.value })
                }
                className="py-3 px-4 w-full placeholder:text-gray-dark placeholder:text-base bM text-black border-[1px] border-gray rounded-lg outline-none focus:shadow-active"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <hr className="h-[1px] bg-gray border-none" />
        <div className="sm:py-6 sm:px-10 p-4 flex justify-end">
          <button
            type="submit"
            className={`hS button text-white bg-base-dark hover:opacity-90 sm:w-fit w-full`}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
