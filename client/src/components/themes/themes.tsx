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
import dynamic from "next/dynamic";
import ResponsiveButton from "../common/responsive-button";

const ChangeTheme = dynamic(() => import("./change-theme"), {
  ssr: false,
  loading: () => (
    <Button className="absolute top-2 left-2 bg-white border border-base-dark text-base-dark hover:bg-base-light">
      Use Theme
    </Button>
  ),
});

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
      <div className="bg-white rounded-xl lg:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto w-full p-6 relative">
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
                {/*<EditTheme />*/}
                <LayoutComponent userData={sampleUserData} />
                <ChangeTheme user={userProfileDetails} theme={theme.name} />
              </>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <ResponsiveButton
        path="/user/appearance"
        title="Go back"
        className="absolute sm:bottom-8 bottom-6 right-12"
      />
    </ThemeSelector>
  );
}
// </Tabs>
