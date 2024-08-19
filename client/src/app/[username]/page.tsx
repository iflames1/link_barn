"use client";
import PreviewLinks from "@/components/preview/preview-links";
import PreviewProfile from "@/components/preview/preview-profile";
import { API_BASE_URL } from "@/lib/constants";
import { useLinkSync } from "@/utils/linkSync";
import { useWallet } from "@/utils/wallet";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { username: string };
}

export default function Page({ params }: PageProps) {
  const { username } = params;
  const { getLinks, links, userProfileDetails } = useLinkSync();
  const { checkUserExists } = useWallet();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const res = await checkUserExists(username);
      console.log(res);
      if (res.status) {
        console.log("User exists");
        getLinks(`${API_BASE_URL}/users/?user_id=${username}`);
      } else {
        console.log("User does not exist");
        router.push("/");
      }
    };
    setLoading(true);
    checkUser();
    setLoading(false);
  }, [checkUserExists, getLinks, router, username]);

  return (
    <>
      {loading && <Loading />}
      <div
        suppressHydrationWarning={true}
        className="w-full h-full px-[18%] pt-[53px] flex flex-col items-center gap-14"
      >
        <PreviewProfile userProfileDetails={userProfileDetails} />
        <PreviewLinks links={links} />
      </div>
    </>
  );
}
