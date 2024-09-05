import axios from "axios";
import { clearUUID, getUserUUID, setUserUUID } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";
import { useAppContext } from "@/context";
import {
  AppConfig,
  UserSession,
  showConnect,
  authenticate,
  openSTXTransfer,
  STXTransferOptions,
} from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { useState } from "react";
import { toast } from "sonner";

interface UserProfile {
  stxAddress: {
    mainnet: string;
  };
  //walletProvider: string;
}

interface UserData {
  profile: UserProfile;
}

export const useWallet = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userAddress, setUserAddress] = useState<string | "Connect Wallet">(
    "Connect Wallet"
  );
  const { userProfileDetails } = useAppContext();
  const [pending, setPending] = useState(false);

  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Link Barn",
    icon: "/images/unik.png",
  };

  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => {
        handleConnect();
      },
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
    console.log("successfully signed out");
  };

  const postUserData = (userData: UserData) => {
    return axios.post(API_BASE_URL + "/users", {
      auth_type: "crypto",
      stx_address_mainnet: userData.profile.stxAddress.mainnet,
      first_name: null,
      last_name: null,
      theme: null,
      profile_picture: null,
      email: null,
      username: userData.profile.stxAddress.mainnet,
      supabase_user_id: null,
      wallet_provider: null,
      //wallet_provider: userData.profile.walletProvider,
      decentralized_id: null,
      stx_address_testnet: null,
      btc_address_mainnet: null,
      btc_address_testnet: null,
      public_key: null,
      gaia_hub_url: null,
    });
  };

  const checkUserExists = async (
    field: string = "username",
    value: string
  ): Promise<{ status: boolean; message: string }> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/check`, {
        field,
        value,
      });
      console.log(response.data);
      return {
        status: response.data.status,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Error checking user existence:", error);
      return {
        status: false,
        message: "Error checking user existence",
      };
    }
  };

  const handleConnect = async () => {
    setPending(true);
    try {
      let userData;
      if (userSession.isSignInPending()) {
        userData = await userSession.handlePendingSignIn();
      } else if (userSession.isUserSignedIn()) {
        userData = userSession.loadUserData();
      } else {
        console.log("User is not signed in or pending");
        return;
      }

      setUserData(userData);
      console.log(userData);
      setUserAddress(userData.profile.stxAddress.mainnet);
      const address = userData.profile.stxAddress.mainnet;

      const userExists = await checkUserExists("stx_address_mainnet", address);

      if (!getUserUUID()) {
        if (
          !userExists.status &&
          userExists.message === "User does not exist"
        ) {
          try {
            const response = await postUserData(userData);
            setUserUUID(response.data.uuid);
          } catch (error) {
            console.error("Error creating new user", error);
          }
        } else {
          setUserUUID(userExists.message);
        }
      }
    } catch (error) {
      console.error("Error handling connection or saving user data:", error);
    } finally {
      setPending(false);
      window.location.reload();
    }
  };

  const holdUnik = async (
    principal: string = userAddress
  ): Promise<boolean> => {
    try {
      const response = await axios.get(
        `https://api.hiro.so/extended/v1/tokens/nft/holdings?principal=${principal}&asset_identifiers=SP3X27NM39MR9HM98D8PEWAHE420JK3X090S1382Q.unikind::unikind&limit=1&unanchored=false`
      );

      if (response.data && response.data.total > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking Unik holdings:", error);
      toast.error("Error checking if user holds unik");
      return false;
    }
  };

  async function sendSTXTransaction(
    recipientAddress = "SP1SQHCJSFNR5020N2HJ8CPW192HF57J3NHNPP5A",
    amount = "1",
    memo = ""
  ) {
    const transactionDetails: STXTransferOptions = {
      network: new StacksMainnet(),
      recipient: recipientAddress,
      amount: amount,
      memo: memo,
      appDetails: {
        name: "Link Barn",
        icon: "/images/unik.png",
      },
      onFinish: async (response: { txId: string }) => {
        console.log("Transaction Result:", response);
        console.log("Transaction ID:", response.txId);
      },
      onCancel: () => {
        // WHEN user cancels/closes pop-up
        console.log("User canceled");
      },
    };

    await openSTXTransfer(transactionDetails);
  }
  async function checkTransactionStatus(txId = "") {
    const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Transaction Status:", data.tx_status);

      if (data.tx_status === "success") {
        console.log("Transaction confirmed!");
      } else if (data.tx_status === "pending") {
        console.log("Transaction is pending...");
      } else {
        console.log("Transaction failed:", data);
      }
    } catch (error) {
      console.error("Error fetching transaction status:", error);
    }
  }

  return {
    userData,
    userAddress,
    connectWallet,
    disconnectWallet,
    checkUserExists,
    handleConnect,
    pending,
    holdUnik,
    sendSTXTransaction,
    checkTransactionStatus,
  };
};
