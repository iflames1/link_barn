"import server-only";
import { API_BASE_URL } from "./constants";

export const getUserProfile = async (uuid: string) => {
  try {
    const url = `${API_BASE_URL}/users?user_id=${uuid}`;
    const response = await fetch(url, {
      // next: {
      //   revalidate: 3600,
      // },
      next: {
        tags: ["userProfile"],
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(response);
      console.log(JSON.stringify(errorData, null, 2));
      console.log(errorData.detail[0].loc);
      throw new Error("Failed to get user details");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
