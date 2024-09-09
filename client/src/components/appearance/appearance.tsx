import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { layouts, Layout1 } from "./layouts";

import { UserData } from "@/types/appearance";
import ResponsiveButton from "../common/responsive-button";
import Preview from "./preview";
import { LinkData } from "@/types/links";

export const sampleUserData: LinkData = {
  first_name: "Alex",
  last_name: "Johnson",
  username: "alexj",
  email: "",
  stx_address_mainnet: "",
  uuid: "1",
  bio: "Web developer, coffee enthusiast, and part-time adventurer. Building the future one line of code at a time.",
  profile_picture: "/dp.jpg",
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
    {
      uuid: "4",
      platform: "LinkedIn",
      index: 3,
      url: "https://example.com",
      user_id: "linkedin",
      link_title: "linkedin",
    },
    {
      uuid: "5",
      platform: "GitHub",
      index: 4,
      url: "https://example.com",
      user_id: "github",
      link_title: "github",
    },
  ],
};

export default function Themes() {
  return (
    <Tabs defaultValue="layout1" className="lg:flex gap-6 w-full relative">
      <Preview>
        {layouts.map((layout, index) => (
          <TabsContent className="px-6" key={index} value={layout.name} asChild>
            <layout.LayoutComponent userData={sampleUserData} />
          </TabsContent>
        ))}
      </Preview>
      <div className="bg-white rounded-xl lg:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto lg:w-[60%] w-full p-6">
        <TabsList className="bg-transparent h-full grid grid-cols-1 gap-4">
          {layouts.map((layout, index) => (
            <TabsTrigger
              key={index}
              value={layout.name}
              className="rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="max-w-[300px]">
                <layout.LayoutComponent userData={sampleUserData} />
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <ResponsiveButton
        path="/user/themes"
        title="Change Theme"
        className="absolute sm:bottom-2 bottom-0 right-6"
      />
    </Tabs>
  );
}
