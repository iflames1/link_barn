import { Button } from "@/components/ui/button";
import { CiBitcoin } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ConnectWallet from "./connect-wallet";

// Move the server action outside the component
async function signInWithGoogle() {
  "use server";
  const supabase = createClient();
  const origin = headers().get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    // Handle the error appropriately
    return;
  }

  if (data?.url) {
    redirect(data.url);
  }
}

const Login = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <main className="flex items-center justify-center h-dvh flex-col gap-4 !w-full">
      <form action={signInWithGoogle} className="w-full max-w-[300px]">
        <Button
          type="submit"
          variant="outline"
          className="gap-4 w-full max-w-[300px]"
        >
          <FcGoogle /> Continue with Google
        </Button>
      </form>
      <ConnectWallet />
    </main>
  );
};

export default Login;
