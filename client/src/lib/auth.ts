import { parseCookies, setCookie, destroyCookie } from "nookies";

export const setUserUUID = (uuid: string) => {
  setCookie(null, "uuid", uuid, {
    maxAge: 24 * 60 * 60, // 1 day
    path: "/",
  });
};

export const getUserUUID = (): string | undefined => {
  const cookies = parseCookies();
  return cookies.uuid;
};

export const isAdmin = (): boolean => {
  return !!getUserUUID();
};

export const clearUUID = () => {
  destroyCookie(null, "uuid");
};

// import { serialize } from 'cookie';
//
// export const setServerSideCookie = (res: NextResponse, name: string, value: string, options: any = {}) => {
//   const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);
//   const cookieValue = serialize(name, stringValue, options);
//   res.headers.append('Set-Cookie', cookieValue);
// };
