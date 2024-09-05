"use client";
import { signInWithGoogle } from "./actions";
import ConnectWallet from "./connect-wallet";
import { Submit } from "./sumbit";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserUUID } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppWrapper } from "@/context";

const Login = () => {
  const searchParams = useSearchParams();
  const [showText, setShowText] = useState(false);
  const router = useRouter();
  const uuid = getUserUUID();

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (uuid) {
      console.log(uuid);
      router.push("/user/links");
      // router.refresh();
    }
  }, [uuid, router]);

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center gap-16">
      <Link href={"/"} className="flex items-center gap-2">
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: showText ? 0 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={"/unik.png"}
            alt=""
            width={40}
            height={40}
            className="rounded-lg"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="text-center hM"
        >
          Link Barn
        </motion.p>
      </Link>
      <div className="flex items-center justify-center flex-col gap-4 !w-full">
        {searchParams.get("superdupersecret") && (
          <form action={signInWithGoogle} className="w-full max-w-[300px]">
            <Submit />
          </form>
        )}
        <AppWrapper>
          <ConnectWallet />
        </AppWrapper>
      </div>
    </div>
  );
};

export default Login;
