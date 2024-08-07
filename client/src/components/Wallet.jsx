"use client";
import { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { FaPowerOff } from "react-icons/fa6";

export default function Wallet() {
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState("Connect Wallet");
  const [showDetails, setShowDetails] = useState(false);

  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Link Barn",
    icon: "/images/logo.svg",
  };

  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      onCancel: () => {
        console.log("oops, canceled");
      },
      userSession,
    });
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then((userData) => {
          setUserData(userData);
          setUserAddress(userData.profile.stxAddress.mainnet);
        })
        .catch((error) => {
          console.error("Error handling pending sign-in:", error);
        });
    } else if (userSession.isUserSignedIn()) {
      const loadedUserData = userSession.loadUserData();
      setUserData(loadedUserData);
      setUserAddress(loadedUserData.profile.stxAddress.mainnet);
    }
  }, []);

  const disconnect = () => {
    userSession.signUserOut();
    setUserData(null);
    setUserAddress("Connect Wallet");
  };

  const handleDetails = () => {
    if (userData) {
      setShowDetails(!showDetails);
    } else {
      connectWallet();
    }
  };

  return (
    <div className="fixed bottom-4 sm:left-6 left-4">
      <button
        onClick={handleDetails}
        className={`text-white w-fit button hS ${
          userData ? "bg-base-dark" : "bg-base-normal hover:bg-base-dark"
        }`}
      >
        {userData
          ? `${userAddress.slice(0, 5)}...${userAddress.slice(-5)}`
          : userAddress}
      </button>
      <div
        className={`${
          showDetails ? "flex" : "hidden"
        } flex-col items-center gap-4 bg-white`}
      >
        <div className="bg-gray-preview size-24 rounded-full"></div>
        <div className=" flex flex-col items-center gap-[13px]">
          <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
          <div className="bg-gray-preview w-[72px] h-2 rounded-full"></div>
        </div>
        <button onClick={disconnect} className="flex items-center gap-2 button">
          <span className="">Disconnect</span>
          <FaPowerOff className="size-4" />
        </button>
      </div>
    </div>
  );
}
