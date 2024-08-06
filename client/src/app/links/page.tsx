import Header from "@/components/Header";
import Links from "@/components/links/Links";

export default function Home() {
  return (
    <div className="bg-gray-light min-h-screen sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <div className="bg-white rounded-xl">
          <Links />
        </div>
      </div>
    </div>
  );
}
