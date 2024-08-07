"use client";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { CgSelect } from "react-icons/cg";

export function SelectLink() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>("github");

  const options = [
    {
      value: "github",
      icon: <TbBrandGithubFilled className="size-4 text-gray-dark" />,
      label: "GitHub",
    },
    {
      value: "twitter",
      icon: <FaXTwitter className="size-4 text-gray-dark" />,
      label: "Twitter",
    },
    {
      value: "youtube",
      icon: <IoLogoYoutube className="size-4 text-gray-dark" />,
      label: "Youtube",
    },
    {
      value: "facebook",
      icon: <FaFacebook className="size-4 text-gray-dark" />,
      label: "Facebook",
    },
    {
      value: "linkedin",
      icon: <FaLinkedin className="size-4 text-gray-dark" />,
      label: "LinkedIn",
    },
  ];

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border-[1px] border-gray rounded-lg cursor-pointer ${
          isOpen && "shadow-active"
        }`}
      >
        {selectedOption && (
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {options.find((opt) => opt.value === selectedOption)?.icon}
              <span className="bM text-black">
                {options.find((opt) => opt.value === selectedOption)?.label}
              </span>
            </div>
            <CgSelect className="size-6 text-base-dark" />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-4 bg-white border border-gray shadow-dropdown rounded-lg px-4 h-[248px] overflow-y-auto z-10">
          {options.map((option, index) => (
            <div key={option.value}>
              <div
                className={`py-3 hover:bg-gray-100 cursor-pointer flex items-center
                gap-3 {option.value === selectedOption ? 'text-base-dark' : "text-black"}`}
                onClick={() => {
                  setSelectedOption(option.value);
                  setIsOpen(false);
                }}
              >
                {option.icon}
                <span className="bM">{option.label}</span>
              </div>
              {index !== options.length - 1 && (
                <hr className="h-px border-none bg-gray" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
