"use client";
import { signOut } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/utils/wallet";

export default function SignOut() {
  const { disconnectWallet } = useWallet();
  return (
    <form action={signOut} onClick={disconnectWallet}>
      <Button className="bg-base-dark hover:bg-opacity-90 rounded-lg items-center justify-between">
        Sign Out
      </Button>
    </form>
  );
}
