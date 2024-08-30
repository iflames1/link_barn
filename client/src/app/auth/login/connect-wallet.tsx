"use client";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/utils/wallet";
import { Loader2 } from "lucide-react";
import { LuWallet2 } from "react-icons/lu";

export default function ConnectWallet() {
  const { connectWallet, handleConnect, disconnectWallet, pending } =
    useWallet();

  return (
    <Button
      onClick={() => {
        connectWallet();
        //handleConnect();
      }}
      className="gap-4 w-full max-w-[300px]"
    >
      {pending ? (
        <Loader2 size={17} className="animate-spin" color="#000" />
      ) : (
        <LuWallet2 />
      )}
      Sign in With Wallet
    </Button>
  );
}
