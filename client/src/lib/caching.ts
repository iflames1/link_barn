"use server";
import { unstable_cache } from "next/cache";
import {
  checkUserExists,
  getUserProfile,
  getUserProfileByUsername,
} from "./queries";

export const getUserProfileCached = async (uuid: string) => {
  const userProfileDetails = unstable_cache(
    async () => {
      return await getUserProfile(uuid || "");
    },
    ["userProfiles-preview", uuid],
    { tags: [`userProfile-${uuid}`] },
  );
  return await userProfileDetails();
};

export const getProfileByUsernameCached = async (username: string) => {
  const userProfile = unstable_cache(
    async () => {
      return await getUserProfileByUsername(username as string);
    },
    [`user-${username}`],
    { tags: [`userProfile-${username}`, "profile"] },
  );

  return await userProfile();
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
