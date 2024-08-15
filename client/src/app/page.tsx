import Header from "@/components/Header";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  return (
    <div className="bg-gray-light sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="sm:p-0 p-4 bg-white">Yooo</div>
      <div>{cookieStore.get("uuid")?.value} | Hello</div>
    </div>
  );
}
