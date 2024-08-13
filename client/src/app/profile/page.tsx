import Header from "@/components/Header";
import ProfileDetails from "@/components/profileDetails/ProfileDetails";
import Wallet from "@/components/Wallet";

export default function Home() {
  return (
    <div className="bg-gray-light sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <ProfileDetails />
      </div>
      {/* <Wallet /> */}
    </div>
  );
}
