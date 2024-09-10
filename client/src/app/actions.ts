"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function revalidatePathServer(path: string) {
  revalidatePath(`/${path}`);
}

export async function revalidateTagServer(tag: string) {
  revalidateTag(tag);
}

export const revalidateUserProfile = async (uuid: string) => {
  revalidateTag(`userProfile-${uuid}`);
};

export async function signOut() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    const { error } = await supabase.auth.signOut();
  }
  if (cookies().get("uuid")?.value) {
    cookies().delete("uuid");
    redirect("/auth/login");
  }
}
