import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  checkUserExists,
  getAllUsernames,
  getUserProfileByUsername,
} from "@/lib/queries";
import { Loader } from "lucide-react";
import type { Metadata } from "next";
import { layouts } from "@/components/appearance/layouts";
import {
  getProfileByUsernameCached,
  getUserProfileCached,
} from "@/lib/caching";

interface PageProps {
  params: { username: string };
}
type User = {
  username: string | null;
};

export async function generateStaticParams(): Promise<string[]> {
  const response: User[] = await getAllUsernames();
  const filteredUsers = response.filter(
    (user: User): user is User & { username: string } => user.username !== null,
  );
  return filteredUsers.map(({ username }) => username);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = params;

  const user_exists = await checkUserExists("username", username);
  let userProfile = null;
  let links = null;
  let truncUsername = "";
  //console.log(user_exists);

  const truncateString = (str: string): string => {
    if (str?.length > 15) {
      return `${str.slice(0, 5)}...${str.slice(-5)}`;
    }
    return str;
  };

  if (user_exists.status) {
    userProfile = await getUserProfileByUsername(username);
    links = userProfile && userProfile?.links;
    truncUsername = truncateString(userProfile?.username);
  } else {
    //console.log("HERERE");
    notFound();
  }

  return {
    title: truncUsername ?? userProfile?.username,
    description: userProfile?.bio || `${username} Links`,
    openGraph: {
      images: [
        {
          url: userProfile?.profile_picture,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { username } = params;
  const user_exists = await checkUserExists("username", username);
  let userProfile = null;
  let links = null;
  let truncUsername = "";

  const truncateString = (str: string): string => {
    if (str?.length > 15) {
      return `${str.slice(0, 5)}...${str.slice(-5)}`;
    }
    return str;
  };

  if (user_exists.status) {
    userProfile = await getProfileByUsernameCached(username);
    links = userProfile && userProfile?.links;
    truncUsername = truncateString(userProfile?.username);
  } else {
    notFound();
  }

  const layout = layouts.find(
    (layout) => layout.name === userProfile?.appearance ?? "layout1",
  );

  return (
    <div className="h-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[50vh]">
            <Loader className="animate-spin" />
          </div>
        }
      >
        {layout && (
          <layout.LayoutComponent
            userData={userProfile}
            links={userProfile?.links}
            username={truncUsername ?? userProfile?.username}
          />
        )}
      </Suspense>
    </div>
  );
}

/*
   <div className="flex flex-col items-center gap-3">
            {userProfile ? (
              <>
                {userProfile?.profile_picture ? (
                  <Image
                    src={userProfile?.profile_picture}
                    alt={userProfile?.first_name || "profile picture"}
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
                {userProfile?.username ? (
                  <>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-xl font-bold">
                        {userProfile?.first_name} {userProfile?.last_name}
                      </p>
                      <p className={cn("text-md font-semibold text-black")}>
                        @{truncUsername}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-[13px]">
                    <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
                  </div>
                )}
                {<p className="text-center">{userProfile?.bio}</p>}
              </>
            ) : (
              <>
                <div className="bg-gray-preview size-24 rounded-full"></div>
                <div className="flex flex-col items-center gap-[13px]">
                  <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
                  <div className="bg-gray-preview w-20 h-4 rounded-full"></div>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-center gap-3 w-full max-w-80 px-4">
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
                        <span>
                          {link.platform === "link"
                            ? link.link_title
                            : link.platform}
                        </span>
                      </p>
                      <FaArrowRight className="size-4" />
                    </a>
                  );
                })
            )}
          </div>
*/
