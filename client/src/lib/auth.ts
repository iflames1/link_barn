import { parseCookies, setCookie, destroyCookie } from "nookies";
import { API_BASE_URL } from "./constants";
import { toast } from "sonner";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const setUserUUID = (uuid: string) => {
  setCookie(null, "uuid", uuid, {
    maxAge: 24 * 60 * 60, // 1 day
    path: "/",
  });
};

export const getUserUUID = (): string | undefined => {
  const cookies = parseCookies();
  return cookies.uuid;
};

export const isAdmin = (): boolean => {
  return !!getUserUUID();
};

export const clearUUID = () => {
  destroyCookie(null, "uuid");
};

export async function createToken(uuid: string): Promise<string> {
  const token = await new SignJWT({ uuid })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(JWT_SECRET));
  return token;
}

export const check_supabase_user = async (supabase_user_id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "supabase_user_id",
        value: supabase_user_id,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || errorData.detail;
      console.log(errorData);
      toast.error(errorMessage, {
        richColors: true,
      });
      throw new Error(errorMessage);
    }
    const data = await response.json();

    return data.status;
  } catch (err) {
    console.log(err);
  }
};

// import { serialize } from 'cookie';
//
// export const setServerSideCookie = (res: NextResponse, name: string, value: string, options: any = {}) => {
//   const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);
//   const cookieValue = serialize(name, stringValue, options);
//   res.headers.append('Set-Cookie', cookieValue);
// };
