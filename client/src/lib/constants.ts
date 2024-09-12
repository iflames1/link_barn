export const DEV = false;
export const API_BASE_URL = DEV
  ? "http://127.0.0.1:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.linkbarn.tech";
export const isFree = false;
