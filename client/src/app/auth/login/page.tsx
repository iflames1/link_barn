"use client";
import { cookies } from "next/headers";
import { signInWithGoogle } from "./actions";
import ConnectWallet from "./connect-wallet";
import { Submit } from "./sumbit";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserUUID } from "@/lib/auth";

const Login = () => {
  const router = useRouter();
  const uuid = getUserUUID();

  useEffect(() => {
    if (uuid) {
      console.log(uuid);
      router.push("/user/links");
      // router.refresh();
    }
  }, [uuid, router]);

  return (
    <div className="flex items-center justify-center h-dvh flex-col gap-4 !w-full">
      <form action={signInWithGoogle} className="w-full max-w-[300px]">
        <Submit />
      </form>
      <ConnectWallet />
    </div>
  );
};

export default Login;
