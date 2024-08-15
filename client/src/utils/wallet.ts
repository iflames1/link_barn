import { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import axios from "axios";
import {
  setAdminToken,
  isAdmin,
  clearAdminToken,
  getAdminToken,
} from "./cookie";
const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || "";

interface UserProfile {
  stxAddress: {
    mainnet: string;
  };
  walletProvider: string;
}

interface UserData {
  profile: UserProfile;
}

export const useWallet = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userAddress, setUserAddress] = useState<string | "Connect Wallet">(
    "Connect Wallet"
  );

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
    clearAdminToken();
  };

  useEffect(() => {
    const postUserData = (userData: UserData) => {
      return axios.post(apiUrl + "/api/v1/users/", {
        auth_type: "STX Wallet",
        stx_address_mainnet: userData.profile.stxAddress.mainnet,
        wallet_provider: userData.profile.walletProvider,
      });
    };

    const handleSignIn = async () => {
      if (userSession.isSignInPending()) {
        try {
          const userData = await userSession.handlePendingSignIn();
          setUserData(userData);
          setUserAddress(userData.profile.stxAddress.mainnet);

          const response = await postUserData(userData);
          setAdminToken(response.data.uuid);
        } catch (error) {
          console.error(
            "Error handling pending sign-in or saving user data:",
            error
          );
        }
      } else if (userSession.isUserSignedIn()) {
        const userData = userSession.loadUserData();
        setUserData(userData);
        setUserAddress(userData.profile.stxAddress.mainnet);

        if (!isAdmin()) {
          try {
            const response = await postUserData(userData);
            setAdminToken(response.data.uuid);
          } catch (error) {
            console.error("Error saving user data:", error);
          }
        }
      }
    };

    console.log(getAdminToken());

    handleSignIn();
  }, []);

  return {
    userData,
    userAddress,
    connectWallet,
    disconnectWallet,
  };
};
