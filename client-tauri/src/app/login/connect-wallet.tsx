"use client";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/utils/wallet";
import { LuWallet2 } from "react-icons/lu";

export default function ConnectWallet() {
  const { connectWallet, disconnectWallet } = useWallet();

  return (
    <Button
      onClick={() => {
        connectWallet();
      }}
      className="gap-4 w-full max-w-[300px]"
    >
      <LuWallet2 /> Sign in With Wallet
    </Button>
  );
}
