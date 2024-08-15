import { parseCookies, setCookie, destroyCookie } from "nookies";

export const setAdminToken = (token: string) => {
  setCookie(null, "adminToken", token, {
    maxAge: 7 * 24 * 60 * 60, // 7 day
    path: "/",
  });
};

export const getAdminToken = (): string | undefined => {
  const cookies = parseCookies();
  return cookies.adminToken;
};

export const clearAdminToken = () => {
  destroyCookie(null, "adminToken");
};

export const isAdmin = (): boolean => {
  return !!getAdminToken();
};
