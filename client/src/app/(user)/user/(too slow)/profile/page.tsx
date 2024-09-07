import Header from "@/components/header";
import ProfileDetails from "@/components/profile-details/profile-details";
import Wallet from "@/components/wallet";

export default function ProfilePage() {
  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <ProfileDetails />
      </div>
      {/* <Wallet /> */}
    </div>
  );
}
