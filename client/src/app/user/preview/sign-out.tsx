"use client";
import { signOut } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/utils/wallet";

export default function SignOut({ auth }: { auth: string }) {
  const { disconnectWallet } = useWallet();
  return (
    <form
      action={signOut}
      onClick={() => auth === "crypto" && disconnectWallet()}
    >
      <Button className="bg-base-dark hover:bg-opacity-90 rounded-lg items-center justify-between">
        Sign Out
      </Button>
    </form>
  );
}
