import { getUser } from "@/lib/getUser";
import { UserData } from "@/types/links";

let userData: UserData | undefined;

const fetchUserData = async () => {
  const result = await getUser();
  userData = result?.userData;
};

fetchUserData();

const truncateString = (str: string | undefined): string => {
  if (str && str.length > 15) {
    return `${str.slice(0, 5)}...${str.slice(-5)}`;
  }
  return str ?? "Alexj";
};

let username = truncateString(userData?.username);

export const sampleUserData: UserData = {
  first_name: userData?.first_name || "Johnson",
  last_name: "Johnson",
  username: username,
  email: "",
  stx_address_mainnet: "",
  uuid: "1",
  bio:
    userData?.bio ||
    "Web developer, coffee enthusiast, and part-time adventurer. Building the future one line of code at a time.",
  profile_picture: userData?.profile_picture || "",
  appearance: userData?.appearance || "layout1",
  theme: userData?.theme || "theme1",
  prevTxID: "",
  tier: "free",
  links: [
    {
      uuid: "1",
      platform: "portfolio",
      index: 0,
      url: "https://example.com",
      user_id: "link",
      link_title: "portfolio",
    },
    {
      uuid: "2",
      platform: "twitter",
      index: 1,
      url: "https://example.com",
      user_id: "twitter",
      link_title: "twitter",
    },
    {
      uuid: "3",
      platform: "instagram",
      index: 2,
      url: "https://example.com",
      user_id: "instagram",
      link_title: "instagram",
    },
    // {
    //   uuid: "4",
    //   platform: "linkedIn",
    //   index: 3,
    //   url: "https://example.com",
    //   user_id: "linkedin",
    //   link_title: "linkedin",
    // },
    // {
    //   uuid: "5",
    //   platform: "gitHub",
    //   index: 4,
    //   url: "https://example.com",
    //   user_id: "github",
    //   link_title: "github",
    // },
  ],
};
