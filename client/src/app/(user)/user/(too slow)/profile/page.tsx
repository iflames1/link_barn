import Header from "@/components/header";
import Profile from "@/components/profile-details/profile";
import ProfileDetails from "@/components/profile-details/profile-details";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Update your information",
};

export default function ProfilePage() {
  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <Profile />
      </div>
      {/* <Wallet /> */}
    </div>
  );
}

// <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
// </div>;
