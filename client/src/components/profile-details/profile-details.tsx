import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";
import { layouts } from "../appearance/layouts";
import Preview from "../appearance/preview";
import Form from "./form";

export default async function ProfileDetails() {
  const userProfileDetails = await getUserProfile(
    cookies().get("uuid")?.value || "",
  );
  console.log(userProfileDetails, "HMMMMM");
  const links = userProfileDetails?.links;
  console.log(links, userProfileDetails);
  const layout =
    layouts.find((layout) => layout.name === userProfileDetails?.appearance) ||
    layouts[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <div className="hidden h-full w-full">
        <Preview className="w-full h-full flex">
          <div className="w-full px-6">
            {
              <layout.LayoutComponent
                userData={userProfileDetails}
                links={userProfileDetails?.links}
              />
            }
          </div>
        </Preview>
      </div>
      <Form />
    </div>
  );
}
