"use client";
import PreviewLinks from "@/components/preview/preview-links";
import PreviewProfile from "@/components/preview/preview-profile";
import { API_BASE_URL } from "@/lib/constants";
import { useWallet } from "@/utils/wallet";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

interface PageProps {
  params: { username: string };
}

export default function Page({ params }: PageProps) {
  const { username } = params;
  const { checkUserExists } = useWallet();
  const router = useRouter();
  const { getData } = useAppContext();

  useEffect(() => {
    const checkUser = async () => {
      const res = await checkUserExists("username", username);
      console.log(res);
      if (res.status) {
        console.log("User exists");
        getData(`${API_BASE_URL}/users/profile/${username}`);
      } else {
        console.log("User does not exist");
        router.push("/");
      }
    };

    checkUser();
  }, [checkUserExists, getData, router, username]);

  return (
    <div
      suppressHydrationWarning={true}
      className="w-full h-full px-[18%] pt-[53px] flex flex-col items-center gap-14"
    >
      <PreviewProfile />
      <PreviewLinks />
    </div>
  );
}
