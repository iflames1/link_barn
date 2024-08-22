"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function revalidatePathServer(path: string) {
  revalidatePath(`/${path}`);
}

export async function revalidateTagServer(tag: string) {
  revalidateTag(tag);
}

export async function signOut() {
  if (cookies().get("uuid")?.value) {
    cookies().delete("uuid");
    redirect("/auth/login");
  }
}
