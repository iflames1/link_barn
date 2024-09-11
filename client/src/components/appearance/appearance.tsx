"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { layouts } from "./layouts";
import ResponsiveButton from "../common/responsive-button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { saveUserDetails } from "@/lib/saveUserDetails";
import dynamic from "next/dynamic";
import { UserProfileSchema } from "@/types/users";

const ChangeAppearance = dynamic(() => import("./change-appearance"), {
  ssr: false,
  loading: () => (
    <Button className="absolute top-2 left-2 bg-white border border-base-dark text-base-dark hover:bg-base-light">
      Use Theme
    </Button>
  ),
});
import PreviewLayout from "./preview-layout";
import { sampleUserData } from "@/data/sampleUserData";
import { checkTransactionStatus } from "@/lib/checkTransactionStatus";
import { Button } from "../ui/button";

export default function Themes({
  userProfile,
}: {
  userProfile: UserProfileSchema;
}) {
  const [txStatus, setTxStatus] = useState<string>("");

  useEffect(() => {
    const checkStatus = async () => {
      if (userProfile) {
        const status = await checkTransactionStatus(userProfile.prevTxID);
        setTxStatus(status);
        if (status === "success") {
          userProfile.prevTxID = "";
          userProfile.tier = "premium";
          console.log("userProfile before = ", userProfile);
          await saveUserDetails(userProfile);
          console.log("userProfile after = ", userProfile);
          toast.success("Transaction successful", { richColors: true });
        }
      }
    };

    checkStatus();
  });

  console.log("current layout = ", userProfile.appearance);

  return (
    <Tabs
      defaultValue={userProfile.appearance}
      className="lg:flex gap-6 w-full relative"
    >
      <PreviewLayout>
        {layouts.map((layout, index) => (
          <TabsContent key={index} value={layout.name} asChild>
            <layout.LayoutComponent userData={sampleUserData} />
          </TabsContent>
        ))}
      </PreviewLayout>
      <div className="bg-white rounded-xl lg:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto lg:w-[60%] w-full p-6">
        <TabsList className="bg-transparent h-full grid grid-cols-1 gap-4">
          {layouts.map((layout, index) => (
            <TabsTrigger
              key={index}
              value={layout.name}
              className="rounded-lg border border-gray-200 hover:border-gray-300 transition-colors relative"
            >
              <layout.LayoutComponent userData={sampleUserData} />
              <ChangeAppearance
                appearance={layout.name}
                user={userProfile}
                tier={userProfile?.tier}
                txStatus={txStatus}
              />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <ResponsiveButton
        path="/user/themes"
        title="Change theme"
        className="absolute sm:bottom-2 bottom-0 right-6"
      />
    </Tabs>
  );
}
