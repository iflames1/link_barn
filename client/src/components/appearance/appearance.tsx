"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { layouts } from "./layouts";

import ResponsiveButton from "../common/responsive-button";
import { UserData } from "@/types/links";
import UseAppearanceButton from "./use-appearance";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import { toast } from "sonner";
import { saveUserDetails } from "@/lib/saveUserDetails";
import dynamic from "next/dynamic";
import { UserProfileSchema } from "@/types/users";

const ChangeAppearance = dynamic(() => import("./use-appearance"), {
  ssr: false,
  loading: () => <span>....</span>,
});
import PreviewLayout from "./preview-layout";
import { sampleUserData } from "@/data/sampleUserData";
import { checkTransactionStatus } from "@/lib/checkTransactionStatus";

export default function Themes({
  userProfile,
}: {
  userProfile: UserProfileSchema;
}) {
  const [user, setUser] = useState<UserData | undefined>(userProfile);
  const [txStatus, setTxStatus] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result) {
        setUser(result.userData);
        if (result.userData.tier === "free") {
          if (
            result.userData &&
            result.userData.prevTxID &&
            result.userData.prevTxID !== ""
          ) {
            const status = await checkTransactionStatus(
              result.userData.prevTxID
            );
            setTxStatus(status);

            if (status === "success") {
              const updatedUser = {
                ...result.userData,
                prevTxID: "",
                tier: "premium",
              };
              setUser(updatedUser);
              await saveUserDetails(updatedUser);
              toast.success("Transaction successful", { richColors: true });
            } else {
              await saveUserDetails(result.userData);
            }
          }
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <Tabs
      defaultValue={sampleUserData.appearance}
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
                user={user}
                tier={user?.tier || "free"}
                txStatus={txStatus}
              />
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
