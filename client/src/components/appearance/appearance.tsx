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
import axios from "axios";

export default function Themes({
  userProfile,
}: {
  userProfile: UserProfileSchema;
}) {
  const [user, setUser] = useState<UserData | undefined>(userProfile);
  const [tire, setTire] = useState<string>("free");
  const [prevTxID, setPrevTxID] = useState<string>("");
  const [txStatus, setTxStatus] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result) {
        setUser(result.userData);
        //setTire(result.userData.tire);
        setTire("free");
        //setPrevTxID(result.userData.prevTxID);
        setPrevTxID(
          "0xa6d228c5f0f6d6d476a6b1522987e6fa3c729438e8bee0831e9b656b8bc8ab0b"
        );
      }
    };
    fetchUserData();

    async function checkTransactionStatus(txID: string) {
      if (txID === "") {
        console.log("No transaction ID provided");
        return "no prev tx made";
      }
      const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txID}`;

      try {
        const response = await axios.get(url);
        console.log("response ....", response.data);
        const data = response.data;
        console.log("tx data", data);
        console.log("Transaction Status:", data.tx_status);

        setTxStatus(data.tx_status);
        console.log("after handleTx");
      } catch (error) {
        console.error("Error fetching transaction status:", error);
        toast.error("Error checking previous transaction status");
      }
    }

    checkTransactionStatus(prevTxID);
  }, [prevTxID]);

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
              <div className="max-w-[300px]">
                <layout.LayoutComponent userData={sampleUserData} />
              </div>
              {/* <layout.LayoutComponent userData={sampleUserData} /> */}
              <ChangeAppearance
                appearance={layout.name}
                user={user}
                tire={tire}
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
