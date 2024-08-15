import { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import axios from "axios";

export const useWallet = () => {
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState("Connect Wallet");

  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Stacks Gov",
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

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
    setUserAddress("Connect Wallet");
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then((userData: any) => {
          setUserData(userData);
          setUserAddress(userData.profile.stxAddress.mainnet);
        })
        .catch((error) => {
          console.error("Error handling pending sign-in:", error);
        });
    } else if (userSession.isUserSignedIn()) {
      const loadedUserData: any = userSession.loadUserData();
      setUserData(loadedUserData);
      setUserAddress(loadedUserData.profile.stxAddress.mainnet);
    }
  }, []);

  return {
    userData,
    userAddress,
    connectWallet,
    disconnectWallet,
  };
};
