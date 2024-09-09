// import "server-only";
import isUUID from "is-uuid";
import axios from "axios";
import { API_BASE_URL } from "./constants";

export const getUserProfile = async (uuid: string) => {
  console.log("IM BEING CALLED :sob:");
  console.log("IM BEING CALLED :sob:");
  console.log("IM BEING CALLED :sob:");
  console.log("IM BEING CALLED :sob:");
  console.log("IM BEING CALLED :sob:");
  console.log("IM BEING CALLED :sob:");
  console.log("IM BEING CALLED :sob:");
  try {
    const url = `${API_BASE_URL}/users?user_id=${uuid}`;
    const response = await fetch(url, {
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

export const checkUserExists = async (
  field: string = "username",
  value: string,
): Promise<{ status: boolean; message: string }> => {
  console.log("Im BEING CALLED");
  try {
    if (field === "uuid" && !isUUID.v4(value)) {
      return {
        status: false,
        message: "You think you are smart abi :joy:",
      };
    }
    const response = await axios.post(`${API_BASE_URL}/users/check`, {
      field,
      value,
    });
    return {
      status: response.data.status,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error checking user existence:", error);
    return {
      status: false,
      message: "Error checking user existence",
    };
  }
};

export const getUserProfileByUsername = async (username: string) => {
  try {
    const url = `${API_BASE_URL}/users/profile/${username}`;
    const response = await fetch(url, {
      // next: {
      //   revalidate: 3600,
      // },
      next: {
        tags: ["userProfileUsername"],
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

export const getAllUsernames = async () => {
  try {
    const url = `${API_BASE_URL}/users/all/usernames`;
    const response = await fetch(url, {
      // next: {
      //   revalidate: 3600,
      // },
      next: {
        tags: ["usernames"],
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
