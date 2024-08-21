"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidatePathServer(path: string) {
  revalidatePath(`/${path}`);
}

export async function revalidateTagServer(tag: string) {
  console.log("CALLED");
  revalidateTag(tag);
}
