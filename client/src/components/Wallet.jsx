"use client";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { useWallet } from "@/utils/wallet";

export default function Wallet() {
  const { connectWallet, disconnectWallet, userAddress, userData } =
    useWallet();

  return (
    <div
      onClick={() => connectWallet()}
      className="fixed bottom-4 sm:left-6 left-4"
    >
      {userAddress}
    </div>
  );
}
