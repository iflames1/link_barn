import { NewLink, LinkSchema } from "@/types/links";
import axios from "axios";
import { API_BASE_URL } from "./constants";
import { getUserUUID } from "./auth";
import { toast } from "sonner";

export const saveLinks = async (
  updatedLinks: LinkSchema[] = [],
  newLinks: LinkSchema[] = [],
  deletedLinks: LinkSchema[] = []
) => {
  const UUID = getUserUUID();
  if (
    updatedLinks.length === 0 &&
    newLinks.length === 0 &&
    deletedLinks.length === 0
  ) {
    console.log("No changes to save");
    toast.info("No changes to save", { richColors: true });
  } else {
    try {
      await Promise.all([
        ...updatedLinks.map(async (link) =>
          axios
            .patch(API_BASE_URL + "/links/" + link.uuid, {
              platform: link.platform,
              index: link.index,
              link_title: link.link_title,
              url: link.url,
            })
            .then((res) =>
              console.log("updated ", link.platform + ", status: " + res.status)
            )
            .catch((error) =>
              console.log("error updating " + link.platform, error)
            )
        ),

        ...newLinks.map(async (link) =>
          axios
            .post(API_BASE_URL + "/links", {
              platform: link.platform,
              index: link.index,
              link_title: link.link_title,
              url: link.url,
              user_id: UUID,
            })
            .then((res) =>
              console.log("Added ", link.platform + ", status: " + res.status)
            )
            .catch((error) =>
              console.log("error adding " + link.platform, error)
            )
        ),

        ...deletedLinks.map(async (link) =>
          axios
            .delete(API_BASE_URL + "/links/" + link.uuid)
            .then((res) =>
              console.log("deleted ", link.platform + ", status: " + res.status)
            )
            .catch((error) =>
              console.log("error deleting " + link.platform, error)
            )
        ),
      ]);
    } catch (error) {
      console.log("Error saving links", error);
      toast.error("Failed to save link, Please try again later", {
        richColors: true,
      });
    }
  }
};
