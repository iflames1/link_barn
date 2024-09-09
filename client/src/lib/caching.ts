import { unstable_cache } from "next/cache";
import { getUserProfile } from "./queries";

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
