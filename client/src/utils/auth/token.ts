// src/lib/auth.ts
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function createToken(uuid: string): Promise<string> {
  const token = await new SignJWT({ uuid })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(JWT_SECRET));
  return token;
}

export async function verifyToken(
  token: string,
): Promise<{ uuid: string } | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET),
    );
    return payload as { uuid: string };
  } catch (error) {
    return null;
  }
}
