import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { useState, useEffect } from "react";

export default function Wallet() {
  const [userData, setUserData] = useState(undefined);
  const [userAddress, setUserAddress] = useState("");

  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Link Barn",
    icon: "/dp.jpg",
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
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setUserAddress(userData.profile.stxAddress.mainnet);
      });
    } else if (userSession.isUserSignedIn()) {
      const loadedUserData = userSession.loadUserData();
      setUserData(loadedUserData);
      setUserAddress(loadedUserData.profile.stxAddress.mainnet);
    }
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>
        {userData ? "Connect Wallet" : userAddress}
      </button>
    </div>
  );
}
