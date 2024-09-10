"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { layouts, Layout1 } from "./layouts";

import ResponsiveButton from "../common/responsive-button";
import Preview from "./preview";
import { UserData } from "@/types/links";
import UseAppearanceButton from "./use-appearance";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import { toast } from "sonner";
import { saveUserDetails } from "@/lib/saveUserDetails";

export const sampleUserData: UserData = {
  first_name: "Alex",
  last_name: "Johnson",
  username: "alexj",
  email: "",
  stx_address_mainnet: "",
  uuid: "1",
  bio: "Web developer, coffee enthusiast, and part-time adventurer. Building the future one line of code at a time.",
  profile_picture: "/dp.jpg",
  appearance: "layout1",
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
  const [user, setUser] = useState<UserData | undefined>();
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
  });

  useEffect(() => {
    async function checkTransactionStatus(txID = "") {
      if (txID === "") return "no prev tx made";
      const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txID}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Transaction Status:", data.tx_status);

        handleTx(data.tx_status);
        //if (data.tx_status === "success") {
        //  console.log("Transaction confirmed!");
        //  return "success";
        //} else if (data.tx_status === "pending") {
        //  console.log("Transaction is pending...");
        //  return "pending";
        //} else {
        //  console.log("Transaction failed:", data);
        //  return "failed";
        //}
      } catch (error) {
        console.error("Error fetching transaction status:", error);
        toast.error("error checking previous transaction status");
      }
    }

    async function handleTx(txStatus: string) {
      if (txStatus === "success") {
        //user.prevTxID = "";
        //user.tire = "premium";
        console.log(user);
        await saveUserDetails(user);
        setTxStatus("successful");
      } else if (txStatus == "pending") {
        setTxStatus("pending");
      } else {
        setTxStatus("failed");
      }
    }

    checkTransactionStatus(prevTxID);
  }, []);

  return (
    <Tabs
      defaultValue={sampleUserData.appearance}
      className="lg:flex gap-6 w-full relative"
    >
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
              className="rounded-lg border border-gray-200 hover:border-gray-300 transition-colors relative"
            >
              <layout.LayoutComponent userData={sampleUserData} />
              <UseAppearanceButton
                appearance={layout.name}
                user={user}
                tire={tire}
                txStatus={txStatus}
              />
              {/*<button className="absolute top-2 left-2 bg-white button py-[11px] px-7 border border-base-dark text-base-dark hover:bg-base-light">
                Use Appearance
              </button>*/}
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
