import Preview from "./preview";
import ThemeCollection from "./theme-collection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { layouts, Layout1 } from "./layouts";

import { UserData } from "@/types/appearance"; // Assuming you have a types file

export const sampleUserData: UserData = {
  name: "Alex Johnson",
  bio: "Web developer, coffee enthusiast, and part-time adventurer. Building the future one line of code at a time.",
  profilePicture: "https://i.pravatar.cc/300?img=8", // Using a placeholder image service
  links: [
    {
      id: "1",
      title: "Portfolio",
      url: "https://example.com",
      icon: "link",
    },
    {
      id: "2",
      title: "Twitter",
      url: "https://example.com",
      icon: "twitter",
    },
    {
      id: "3",
      title: "Instagram",
      url: "https://example.com",
      icon: "instagram",
    },
    {
      id: "4",
      title: "LinkedIn",
      url: "https://example.com",
      icon: "linkedin",
    },
    {
      id: "5",
      title: "GitHub",
      url: "https://example.com",
      icon: "github",
    },
  ],
};

export default function Themes() {
  return (
    <Tabs className="lg:flex gap-6 w-full">
      {/*<Preview />*/}
      <div className="w-[40vw] lg:flex hidden p-6 rounded-xl bg-white  justify-center items-center">
        <div className="lg:max-h-[calc(100vh-192px)] overflow-y-auto overflow-x-hidden">
          <div className="border-[1px] border-gray-dark rounded-[56px] max-w-[100vw] sm:w-[307px] h-[631px] p-[11px] relative">
            <div className="border border-gray-dark rounded-[45px] w-full h-full pt-[53px] flex flex-col items-center gap-14 overflow-y-auto">
              {layouts.map((layout, index) => (
                <TabsContent
                  className="px-6"
                  key={index}
                  value={layout.name}
                  asChild
                >
                  <layout.LayoutComponent userData={sampleUserData} />
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl lg:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto lg:w-[60%] w-full">
        <TabsList className="bg-transparent h-full grid grid-cols-1  gap-4 p-4">
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
    </Tabs>
  );
}
