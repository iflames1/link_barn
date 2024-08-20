"use server";
import { revalidatePath } from "next/cache";

export async function revalidatePathServer(path: string) {
  revalidatePath(`/${path}`);
}
