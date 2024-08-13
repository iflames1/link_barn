"use client";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { useWallet } from "@/utils/wallet";

export default function Wallet() {
  const [showDetails, setShowDetails] = useState(false);
  const { connectWallet, disconnectWallet, userAddress, userData } =
    useWallet();

  const handleDetails = () => {
    if (userData) {
      setShowDetails(!showDetails);
    } else {
      connectWallet();
    }
  };

  return (
    <div className="fixed bottom-4 sm:left-6 left-4">
      <button onClick={handleDetails} className={`w-fit hS`}>
        <span
          className={`hidden md:block button text-white  ${
            userData ? "bg-base-dark" : "bg-base-normal hover:bg-base-dark"
          }`}
        >
          {userData
            ? `${userAddress.slice(0, 5)}...${userAddress.slice(-5)}`
            : userAddress}
        </span>
        <span
          className={`block md:hidden rounded-full p-2 text-base-dark ${
            userData ? "bg-base-normal" : "bg-base-normal"
          }`}
        >
          <FaInfo className="size-4" />
        </span>
      </button>
      <div
        className={`${
          showDetails ? "flex" : "hidden"
        } flex-col items-center gap-4 bg-white`}
      >
        <div className="bg-gray-preview size-24 rounded-full"></div>
        <div className=" flex flex-col items-center gap-[13px]">
          <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
          <div className="bg-gray-preview w-[72px] h-2 rounded-full"></div>
        </div>
        <button
          onClick={() => disconnectWallet()}
          className="flex items-center gap-2 button"
        >
          <span className="">Disconnect</span>
          <FaPowerOff className="size-4" />
        </button>
      </div>
    </div>
  );
}
