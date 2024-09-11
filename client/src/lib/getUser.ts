import { toast } from "sonner";
import { getUserUUID } from "./auth";
import axios from "axios";
import { API_BASE_URL } from "./constants";
import { LinkSchema, UserData } from "@/types/links";

export const getUser = async (
  id: string | undefined = getUserUUID()
): Promise<{ userData: UserData; links: LinkSchema[] } | undefined> => {
  if (id) {
    try {
      const response = await axios.get(API_BASE_URL + "/users/?user_id=" + id);
      if (response.status === 200) {
        const userData = response.data;
        const links = response.data.links;
        return { userData, links };
      } else if (response.status === 404) {
        console.log(response.data.detail);
        console.log("User not found");
        toast.error("User not found");
      } else {
        console.log("error fetching user data", response);
        toast.error("An error occurred, please try again later");
      }
    } catch (error) {
      console.log("error fetching user data", error);
      toast.error("An error occurred, please try again later");
    }
  } else {
    console.log("User id is missing");
    return;
  }
};
