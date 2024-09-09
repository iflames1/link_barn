import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { API_BASE_URL } from "@/lib/constants";
import { check_supabase_user } from "@/lib/auth";
import { checkUserExists } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      },
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user) {
        try {
          console.log(API_BASE_URL, "FROM CALLBACK");
          const { data, error } = await supabase.auth.getUser();
          const user = data?.user;

          const fullName = user?.user_metadata?.full_name || "";
          const [firstName, ...lastNameParts] = fullName.split(" ");
          const lastName = lastNameParts.join(" ");

          console.log(user);
          if (error) {
            console.log(error);
          }

          const exists = await checkUserExists(
            "supabase_user_id",
            user?.id as string,
          );

          if (!exists.status) {
            console.log("I AM NOT HIM");
            const url = `${API_BASE_URL}/users`;
            console.log(url);
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                auth_type: "supabase",
                email: user?.user_metadata?.email,
                first_name: firstName || null,
                last_name: lastName || null,
                theme: null,
                profile_picture: user?.user_metadata?.avatar_url,
                stx_address_mainnet: null,
                username: null,
                supabase_user_id: user?.id,
                wallet_provider: null,
                decentralized_id: null,
                stx_address_testnet: null,
                btc_address_mainnet: null,
                btc_address_testnet: null,
                public_key: null,
                gaia_hub_url: null,
              }),
            });
            if (!response.ok) {
              const errorData = await response.json();
              console.log(response);
              console.log(JSON.stringify(errorData, null, 2));
              console.log(errorData.detail[0].loc);
              throw new Error("Failed to create user in API");
            }
            const responseData = await response.json();
            console.log(responseData);
            cookieStore.set({
              name: "uuid",
              value: responseData?.uuid,
              httpOnly: false,
              path: "/",
              sameSite: "strict",
            });
          } else {
            console.log("I AM HIM");
            // console.log(`${API_BASE_URL}/users/supabase/${user?.id}`);
            // console.log(user?.id);
            // const response = await fetch(
            //   `${API_BASE_URL}/users/supabase/${user?.id}`,
            // );
            // if (!response.ok) {
            //   console.log("OVE HERE");
            //   const errorData = await response.json();
            //   console.log(response);
            //   console.log(JSON.stringify(errorData, null, 2));
            //   console.log(errorData.detail[0].loc);
            //   throw new Error("Failed to create user in API");
            // }
            //
            // const data = await response.json();
            // console.log(data);
            cookieStore.set({
              name: "uuid",
              value: exists?.message,
              httpOnly: false,
              path: "/",
              sameSite: "strict",
            });
          }

          return NextResponse.redirect(`${origin}${next}/user/links`);
        } catch (err) {
          console.log(err);
          return NextResponse.redirect(`${origin}/auth/auth-code-error`);
        }
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
