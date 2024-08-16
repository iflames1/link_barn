import { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import axios from "axios";
import { clearUUID, getUserUUID, isAdmin, setUserUUID } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";

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
    clearUUID();
    console.log("disconnected");
  };

  useEffect(() => {
    const postUserData = (userData: UserData) => {
      return axios.post(API_BASE_URL + "/users", {
        auth_type: "crypto",
        stx_address_mainnet: userData.profile.stxAddress.mainnet,
        wallet_provider: userData.profile.walletProvider,
        supabase_user_id: null,
        first_name: null,
        last_name: null,
        profile_picture: null,
        email: null,
        decentralized_id: null,
        stx_address_testnet: null,
        btc_address_mainnet: null,
        btc_address_testnet: null,
        public_key: null,
        gaia_hub_url: null,
      });
    };

    const handleSignIn = async () => {
      if (userSession.isSignInPending()) {
        try {
          const userData = await userSession.handlePendingSignIn();
          setUserData(userData);
          setUserAddress(userData.profile.stxAddress.mainnet);
          const response = await postUserData(userData);
          console.log(response);
          setUserUUID(response.data.uuid);
          console.log(getUserUUID());
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
        console.log("already signed in");
        if (!isAdmin()) {
          try {
            const response = await postUserData(userData);
            console.log("Heyo");
            console.log(response);
            setUserUUID(response.data.uuid);
          } catch (error) {
            console.error("Error saving user data:", error);
          }
        }
      }
    };

    console.log(getUserUUID());
    console.log(userSession);
    console.log(userSession.isUserSignedIn());
    console.log(userSession.isSignInPending());

    handleSignIn();
  }, []);

  return {
    userData,
    userAddress,
    connectWallet,
    disconnectWallet,
  };
};
