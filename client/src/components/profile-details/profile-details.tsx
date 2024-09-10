"use client";
import Preview from "../appearance/preview";
import Form from "./form";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUser } from "@/lib/getUser";
import { UserData } from "@/types/links";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { handleFileUpload } from "@/lib/handleFileUpload";
import { toast } from "sonner";

interface ProfileDetailsProps {
  children: (props: ProfileProps) => React.ReactNode;
}

export interface ProfileProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isHovered: boolean;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedFile: File | null;
  userProfileDetails: UserData | undefined;
  updateUserProfile: (updatedProfile: Partial<UserData>) => void;
  isLoading: boolean;
}

export default function ProfileDetails({ children }: ProfileDetailsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userProfileDetails, setUserProfileDetails] = useState<UserData>();
  const [image, setImage] = useState<string>("");
  const initialProfileData = useRef<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result) {
        const { userData, links } = result;
        setUserProfileDetails(userData);
        initialProfileData.current = userData;
        setImage(userData?.profile_picture);
      }
    };
    fetchUserData();
  });

  const updateUserProfile = useCallback((updatedProfile: Partial<UserData>) => {
    setUserProfileDetails((prevDetails) => {
      if (!prevDetails) return;
      return { ...prevDetails, ...updatedProfile };
    });
  }, []);

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

      if (hasChanged()) await saveUserDetails(userProfileDetails);
      initialProfileData.current = userProfileDetails;
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const childProps: ProfileProps = {
    handleSubmit,
    setIsHovered,
    isHovered,
    setImage,
    image,
    fileInputRef,
    setSelectedFile,
    selectedFile,
    userProfileDetails,
    updateUserProfile,
    isLoading,
  };
  // @ts-ignore
  return <>{children}</>;
}
