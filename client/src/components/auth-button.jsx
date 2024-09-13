"use client";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { useWallet } from "@/utils/wallet";
import { Button } from "./ui/button";
import { getUserUUID } from "@/lib/auth";

export default function AuthButton() {
  const { connectWallet, disconnectWallet } = useWallet();

  const uuid = getUserUUID();

  return uuid ? (
    <Button onClick={disconnectWallet} className="bg-base-dark">
      Sign Out
    </Button>
  ) : (
    <Button onClick={connectWallet}>Sign In</Button>
  );
}
