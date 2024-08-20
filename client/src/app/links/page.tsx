import Header from "@/components/header";
import Links from "@/components/links/links";

export default async function LinksPage() {
  return (
    <div className="min-h-screen sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <Links />
      </div>
    </div>
  );
}
