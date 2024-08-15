import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Login = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log(user);
  if (error) {
    console.log(error);
  }

  const signInWithGoogle = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    // if (data.url) {
    //   redirect(data.url);
    // }

    if (error) {
      console.log(error);
    } else {
      redirect(data.url);
    }
  };

  return (
    <form action={signInWithGoogle}>
      <Button type="submit">Login </Button>
    </form>
  );
};

export default Login;
