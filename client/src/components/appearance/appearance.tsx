import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { layouts } from "./layouts";
// import ResponsiveButton from "../common/responsive-button";
import dynamic from "next/dynamic";
import { UserProfileSchema } from "@/types/users";

const ChangeAppearance = dynamic(() => import("./change-appearance"), {
  ssr: false,
  loading: () => (
    <Button className="absolute top-2 left-2 text-white bg-base-dark">
      <Skeleton className="w-20 h-6" />
    </Button>
  ),
});

const ResponsiveButton = dynamic(() => import("../common/responsive-button"), {
  ssr: false,
});

import PreviewLayout from "./preview-layout";
import { sampleUserData } from "@/data/sample-user-data";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { themes } from "@/data/themes2";

export default function Themes({
  userProfile,
}: {
  userProfile: UserProfileSchema;
}) {
  console.log("current layout = ", userProfile?.appearance);
  const theme =
    themes.find((data) => data.name === userProfile?.theme) || themes[0];

  return (
    <Tabs
      defaultValue={userProfile?.appearance}
      className="lg:flex gap-6 w-full relative"
    >
      <PreviewLayout>
        {layouts.map((layout, index) => (
          <TabsContent key={index} value={layout.name} asChild>
            <layout.LayoutComponent
              userData={sampleUserData}
              className={cn("sm:px-5 w-auto")}
            />
          </TabsContent>
        ))}
      </PreviewLayout>
      <div className="bg-white rounded-xl lg:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto lg:w-[60%] w-full p-6">
        <TabsList className="bg-transparent h-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {layouts.map((layout, index) => (
            <TabsTrigger
              key={index}
              value={layout.name}
              className={cn(
                "rounded-lg h-full border border-gray-200 hover:border-gray-300 transition-colors relative",
                //                 `
                //                 ${theme.bg} ${theme.text}
                //                 data-[state=active]:${theme.bg}
                //                 data-[state=active]:${theme.text}
                //                 data-[state=active]:shadow-sm
                //                 transition-all
                // `,
              )}
            >
              <layout.LayoutComponent
                userData={sampleUserData}
                className="sm:px-5 w-auto"
              />
              <ChangeAppearance appearance={layout.name} user={userProfile} />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <ResponsiveButton
        path="/user/themes"
        title="Change theme"
        className="fixed bottom-4 sm:bottom-2 right-6"
      />
    </Tabs>
  );
}
