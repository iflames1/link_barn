"use server";
import { unstable_cache } from "next/cache";
import { checkUserExists, getUserProfile } from "./queries";

export const getUserProfileCached = async (uuid: string) => {
  const userProfileDetails = unstable_cache(
    async () => {
      return await getUserProfile(uuid || "");
    },
    ["userProfiles-preview"],
    { tags: ["userProfile"] },
  );
  return await userProfileDetails();
};

export const checkUserExistsCached = async (uuid: string) => {
  const isValid = unstable_cache(
    async () => {
      return await checkUserExists("uuid", uuid);
    },
    [`uuid-${uuid}`],
    { tags: ["userExists"] },
  );
  return await isValid();
};
