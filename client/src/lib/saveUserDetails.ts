import { UserData } from "@/types/links";
import axios from "axios";
import { API_BASE_URL } from "./constants";
import { getUserUUID } from "./auth";
import { toast } from "sonner";
import { revalidateTagServer } from "@/app/actions";

export const saveUserDetails = async (
  userDetails: UserData | undefined,
  id: string | undefined = getUserUUID()
) => {
  if (id) {
    try {
      const response = await axios.patch(
        API_BASE_URL + "/users/" + id,
        userDetails
      );
      await revalidateTagServer("userProfile");

      if (response.status === 200) {
        console.log("User details updated successfully");
        toast.success("Updated successfully.", { richColors: true });
        return true;
      } else {
        console.error("Failed to update user details");
        toast.error("Failed to save changes", { richColors: true });
        return false;
      }
    } catch (error) {
      console.error("Failed to update user details", error);
      toast.error("Failed to save changes", { richColors: true });
      return false;
    }
  } else {
    console.log("id is missing");
  }
};
