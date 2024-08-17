import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { API_BASE_URL } from "@/lib/constants";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { setUserUUID } from "@/lib/auth";

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
          const url = `${API_BASE_URL}/users`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth_type: "supabase",
              supabase_user_id: user?.id,
              first_name: firstName || null,
              last_name: lastName || null,
              profile_picture: user?.user_metadata?.avatar_url,
              email: user?.user_metadata?.email,
              decentralized_id: null,
              stx_address_testnet: null,
              stx_address_mainnet: null,
              btc_address_mainnet: null,
              btc_address_testnet: null,
              wallet_provider: null,
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
          // setUserUUID(responseData?.uuid || "HERE");
          console.log(responseData);
          cookieStore.set({
            name: "uuid",
            value: responseData?.uuid,
            httpOnly: false,
            path: "/",
            sameSite: "strict",
          });
          return NextResponse.redirect(`${origin}${next}`);
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
