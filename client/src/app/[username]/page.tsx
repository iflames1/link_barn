import type { Metadata, ResolvingMetadata } from "next";
import PreviewLinks from "@/components/preview/preview-links";
import PreviewProfile from "@/components/preview/preview-profile";
import { API_BASE_URL } from "@/lib/constants";
import { useWallet } from "@/utils/wallet";
import { Suspense, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { checkUserExists, getUserProfileByUsername } from "@/lib/queries";
import Preview, { LinkSchema } from "@/components/preview/preview";
import { Loader } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { linkAttributes } from "@/components/common/links-attr";
import { FaArrowRight } from "react-icons/fa6";

interface PageProps {
  params: { username: string };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { username } = params;
  const userProfile = await getUserProfileByUsername(username);

  const previousImages = (await parent).openGraph?.images || [];
  const openGraphTitle =
    userProfile?.openGraph?.title || `LinkBarn | ${username}`;

  return {
    title: openGraphTitle,
    openGraph: {
      title: openGraphTitle,
      images: ["/public/images/logo.svg", ...previousImages],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { username } = params;
  const user_exists = await checkUserExists("username", username);
  let userProfile = null;
  let links = null;
  console.log(user_exists);

  if (user_exists.status) {
    userProfile = await getUserProfileByUsername(username);
    links = userProfile.links;
  } else {
    console.log("HERERE");
    notFound();
  }
  // const { checkUserExists } = useWallet();
  // const router = useRouter();
  // const { getData } = useAppContext();
  //
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const res = await checkUserExists("username", username);
  //     console.log(res);
  //     if (res.status) {
  //       console.log("User exists");
  //       getData(`${API_BASE_URL}/users/profile/${username}`);
  //     } else {
  //       console.log("User does not exist");
  //       router.push("/");
  //     }
  //   };
  //
  //   checkUser();
  // }, [checkUserExists, getData, router, username]);
  //

  return (
    <div
      suppressHydrationWarning={true}
      className="w-full h-full px-[18%] pt-[53px] flex flex-col items-center gap-14"
    >
      {/* <Preview /> */}
      <div className="w-full h-full px-[18%] pt-[53px] flex flex-col items-center gap-7">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[50vh]">
              <Loader className="animate-spin" />
            </div>
          }
        >
          <div className="flex flex-col items-center gap-3">
            {userProfile ? (
              <>
                {userProfile?.profile_picture ? (
                  <Image
                    src={userProfile?.profile_picture}
                    alt={userProfile?.first_name}
                    width={104}
                    height={104}
                    className={cn(
                      "rounded-full border-4 size-28 border-base-dark object-cover",
                    )}
                  />
                ) : (
                  <div
                    className={cn(`bg-gray-preview size-28 rounded-full`)}
                  ></div>
                )}
                {/* {userProfile?.first_name || userProfile?.last_name ? ( */}
                {userProfile?.username ? (
                  <div className="flex flex-col items-center gap-[13px]">
                    <p className={cn("text-lg font-semibold text-black")}>
                      {/* {userProfile?.first_name} {userProfile?.last_name} */}
                      @{userProfile?.username}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-[13px]">
                    <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="bg-gray-preview size-24 rounded-full"></div>
                <div className="flex flex-col items-center gap-[13px]">
                  <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
                  <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-center gap-3 w-full max-w-72">
            {links?.length < 1 ? (
              <div>This user hasn&apos;t added any links</div>
            ) : (
              links
                ?.slice()
                .sort((a: LinkSchema, b: LinkSchema) => a.index - b.index)
                .map((link: LinkSchema, index: number) => {
                  const normalizedLinkName =
                    link.platform.toLowerCase() as keyof typeof linkAttributes;
                  const attributes =
                    linkAttributes[normalizedLinkName] || linkAttributes.link;
                  return (
                    <a
                      href={link.url}
                      target="_blank"
                      key={index}
                      className={`flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray capitalize ${attributes.bg} ${attributes.text}`}
                    >
                      <p className="flex items-center justify-start gap-2">
                        {attributes.icon}
                        <span>{link.platform}</span>
                      </p>
                      <FaArrowRight className="size-4" />
                    </a>
                  );
                })
            )}
          </div>
        </Suspense>
      </div>

      {/* <Preview */}
      {/* <PreviewProfile /> */}
      {/* <PreviewLinks /> */}
    </div>
  );
}
