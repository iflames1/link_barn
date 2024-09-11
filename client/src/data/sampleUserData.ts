import { getUser } from "@/lib/getUser";
import { UserData } from "@/types/links";

let userData: UserData | undefined;

const fetchUserData = async () => {
  const result = await getUser();
  userData = result?.userData;
};

fetchUserData();

export const sampleUserData: UserData = {
  first_name: "Alex",
  last_name: "Johnson",
  username: "alexj",
  email: "",
  stx_address_mainnet: "",
  uuid: "1",
  bio: "Web developer, coffee enthusiast, and part-time adventurer. Building the future one line of code at a time.",
  profile_picture: "/dp.jpg",
  appearance: userData?.appearance || "layout1",
  theme: userData?.theme || "theme1",
  links: [
    {
      uuid: "1",
      platform: "Portfolio",
      index: 0,
      url: "https://example.com",
      user_id: "link",
      link_title: "portfolio",
    },
    {
      uuid: "2",
      platform: "Twitter",
      index: 1,
      url: "https://example.com",
      user_id: "twitter",
      link_title: "twitter",
    },
    {
      uuid: "3",
      platform: "Instagram",
      index: 2,
      url: "https://example.com",
      user_id: "instagram",
      link_title: "instagram",
    },
    // {
    //   uuid: "4",
    //   platform: "LinkedIn",
    //   index: 3,
    //   url: "https://example.com",
    //   user_id: "linkedin",
    //   link_title: "linkedin",
    // },
    // {
    //   uuid: "5",
    //   platform: "GitHub",
    //   index: 4,
    //   url: "https://example.com",
    //   user_id: "github",
    //   link_title: "github",
    // },
  ],
};
