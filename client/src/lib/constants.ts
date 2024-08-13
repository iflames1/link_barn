const DEV = false;
export const API_BASE_URL = DEV
  ? "http://127.0.0.1:8000"
  : process.env.NEXT_PUBLIC_API_BASE_URL || "";
