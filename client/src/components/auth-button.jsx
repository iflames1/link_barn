"use client";
import { useWallet } from "@/utils/wallet";
import { Button } from "./ui/button";
import { getUserUUID } from "@/lib/auth";

export default function AuthButton() {
  const { connectWallet, disconnectWallet } = useWallet();

  const uuid = getUserUUID();

  return uuid ? (
    <Button onClick={disconnectWallet} className="bg-base-dark max-w-lg">
      Sign Out
    </Button>
  ) : (
    <Button onClick={connectWallet} className="bg-base-dark">
      Sign In
    </Button>
  );
}
