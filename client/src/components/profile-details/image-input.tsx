"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";

interface ImageInputProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ImageInput({
  image,
  setImage,
  setSelectedFile,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
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
    </>
  );
}
