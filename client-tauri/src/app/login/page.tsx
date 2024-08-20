import Link from "next/link";
import { signInWithGoogle } from "./actions";
import ConnectWallet from "./connect-wallet";
import { Submit } from "./sumbit";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Login = () => {
  const cookieStore = cookies();

  if (cookieStore.get("uuid")?.value) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-dvh flex-col gap-4 !w-full">
      <form action={signInWithGoogle} className="w-full max-w-[300px]">
        <Submit />
      </form>
      <Link href={"/"}>Home NOW</Link>
      <ConnectWallet />
    </div>
  );
};

export default Login;
