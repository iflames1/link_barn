"use client";
import { sampleUserData } from "@/data/sampleUserData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PreviewLayout from "../appearance/preview-layout";
import { themes } from "@/data/themes2";
import { UserData } from "@/types/links";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import { layouts } from "@/components/appearance/layoutsForThemes";

export default function Themes() {
  const [userProfileDetails, setUserProfileDetails] = useState<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result) {
        const { userData } = result;
        setUserProfileDetails(userData);
        console.log("User data fetched");
      }
    };
    fetchUserData();
  }, []);

  const layoutName = userProfileDetails?.appearance || "layout1";
  const selectedLayout = layouts.find((layout) => layout.name === layoutName);
  const LayoutComponent =
    selectedLayout?.LayoutComponent || layouts[0].LayoutComponent;

  return (
    <Tabs
      defaultValue={sampleUserData.theme}
      className="lg:flex gap-6 w-full relative"
    >
      <PreviewLayout>
        {themes.map((theme, index) => (
          <TabsContent
            key={index}
            value={theme.name}
            className={`max-w-80 mx-auto py-14 px-4 ${theme.bg} ${theme.text}`}
            asChild
          >
            <LayoutComponent userData={sampleUserData} />
          </TabsContent>
        ))}
      </PreviewLayout>
      <div className="bg-white rounded-xl lg:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto lg:w-[60%] w-full p-6">
        <TabsList className="bg-transparent h-full grid grid-cols-1 gap-4">
          {themes.map((theme, index) => (
            <TabsTrigger
              key={index}
              value={theme.name}
              className={`max-w-80 mx-auto py-14 px-4 ${theme.bg} ${theme.text}`}
            >
              <LayoutComponent userData={sampleUserData} />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
