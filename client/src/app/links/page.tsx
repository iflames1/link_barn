import Header from "@/components/header";
import Links from "@/components/links/links";
import { NewLinks } from "@/components/links/new-links-content";

export default async function LinksPage() {
  return (
    <div className="min-h-screen sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        {/* <Links /> */}
        <NewLinks />
      </div>
    </div>
  );
}
