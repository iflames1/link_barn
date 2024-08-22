"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function revalidatePathServer(path: string) {
  revalidatePath(`/${path}`);
}

export async function revalidateTagServer(tag: string) {
  console.log("CALLED");
  revalidateTag(tag);
}

export async function signOut() {
  cookies().delete("uuid");
  redirect("/login");
}
