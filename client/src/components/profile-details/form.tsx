import { UserData } from "@/types/links";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUser } from "@/lib/getUser";
import { toast } from "sonner";
import { handleFileUpload } from "@/lib/handleFileUpload";
import { saveUserDetails } from "@/lib/saveUserDetails";

interface FormProps {
  userProfileDetails: UserData | undefined;
  setUserProfileDetails: React.Dispatch<
    React.SetStateAction<UserData | undefined>
  >;
}

export default function Form({
  userProfileDetails,
  setUserProfileDetails,
}: FormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");
  const initialProfileData = useRef<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result) {
        const { userData } = result;
        setUserProfileDetails(userData);
        console.log("User data fetched");
        initialProfileData.current = userData;
        setImage(userData?.profile_picture || "");
      }
    };
    fetchUserData();
  }, []);

  const updateUserProfile = useCallback(
    (updatedProfile: Partial<UserData>) => {
      setUserProfileDetails((prevDetails) => {
        if (!prevDetails) return undefined;
        return { ...prevDetails, ...updatedProfile };
      });
    },
    [setUserProfileDetails]
  );

  const hasChanged = useCallback(() => {
    if (!userProfileDetails || !initialProfileData.current) return false;

    return Object.keys(userProfileDetails).some(
      (key) =>
        userProfileDetails[key as keyof UserData] !==
        initialProfileData.current?.[key as keyof UserData]
    );
  }, [userProfileDetails]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasChanged() && !selectedFile) {
      toast.info("No changes to save", { richColors: true });
      console.log("No changes to save");
      return;
    }
    setIsLoading(true);
    try {
      if (selectedFile) await handleFileUpload(selectedFile);

      if (hasChanged() && userProfileDetails)
        await saveUserDetails(userProfileDetails);
      initialProfileData.current = userProfileDetails;
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white flex flex-col justify-between rounded-xl lg:w-[60%] sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-auto"
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
                required
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
            <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-1 w-full">
              <label htmlFor="bio" className="text-gray-dark w-60">
                Bio
              </label>
              <textarea
                id="bio"
                placeholder={"Write a short description about yourself"}
                value={userProfileDetails?.bio || ""}
                onChange={(e) => updateUserProfile({ bio: e.target.value })}
                maxLength={160}
                className="py-3 px-4 w-full min-h-12 h-auto placeholder:text-gray-dark placeholder:text-base bM text-black border-[1px] border-gray rounded-lg outline-none focus:shadow-active"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div>
        <hr className="h-[1px] bg-gray border-none" />
        <div className="sm:py-6 sm:px-10 p-4 flex justify-end">
          <Button
            type="submit"
            className={`hS button text-white bg-base-dark hover:bg-opacity-90 sm:w-fit w-full space-x-2 gap-3`}
            disabled={isLoading}
          >
            {isLoading && <LoaderCircle className="animate-spin size-[18px]" />}
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
