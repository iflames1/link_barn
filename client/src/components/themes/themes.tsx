import { sampleUserData } from "@/data/sampleUserData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PreviewLayout from "../appearance/preview-layout";
import { themes } from "@/data/themes2";
import { UserData } from "@/types/links";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import { layouts } from "@/components/appearance/layoutsForThemes";
import { UserProfileSchema } from "@/types/users";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import EditTheme from "../appearance/edit-theme";
import { ThemeSelector } from "./wrapper";

export default function Themes({
  userProfileDetails,
  selectedTheme = themes[0].name,
}: {
  userProfileDetails: UserProfileSchema;
  selectedTheme?: string;
}) {
  const layoutName = userProfileDetails?.appearance || "layout1";
  const selectedLayout = layouts.find((layout) => layout.name === layoutName);
  const LayoutComponent =
    selectedLayout?.LayoutComponent || layouts[0].LayoutComponent;

  {
    /* <Tabs */
  }
  {
    /* defaultValue={themes[0].name} */
  }
  {
    /* className="lg:flex gap-6 w-full grid grid-cols-1" */
  }
  // >
  return (
    <ThemeSelector defaultValue={selectedTheme}>
      <div className="w-full">
        {themes.map((theme, index) => (
          <TabsContent
            key={index}
            value={theme.name}
            className={cn(
              "max-w-80 mx-auto",
              `${theme.text}
                data-[state=active]:${theme.bg}
                data-[state=active]:${theme.text}
                data-[state=active]:shadow-sm
                transition-all`
            )}
            asChild
          >
            <PreviewLayout className="max-w-none w-full" bg={theme.bg}>
              <div className="py-14 px-4">
                <LayoutComponent userData={sampleUserData} />
              </div>
            </PreviewLayout>
          </TabsContent>
        ))}
      </div>
      <div className="bg-white rounded-xl lg:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto w-full p-6">
        <TabsList className="bg-transparent h-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themes.map((theme, index) => (
            <TabsTrigger
              key={index}
              value={theme.name}
              // className={`max-w-80 mx-auto py-14 px-4 ${theme.bg} ${theme.text} [&[data-state='active']]:bg-`}
              className={`
                max-w-80 mx-auto py-14 px-4 relative
                ${theme.bg} ${theme.text}
                data-[state=active]:${theme.bg}
                data-[state=active]:${theme.text}
                data-[state=active]:shadow-sm
                transition-all
              `}
            >
              <>
                <EditTheme />
                <LayoutComponent userData={sampleUserData} />
              </>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </ThemeSelector>
  );
}
// </Tabs>
