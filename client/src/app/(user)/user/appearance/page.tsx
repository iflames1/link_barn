import Header from "@/components/header";
import Appearance from "@/components/appearance/appearance";

const AppearancePage = () => {
  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="w-full sm:p-0 sm:pt-6 p-4">
        <Appearance />
      </div>
    </div>
  );
};

export default AppearancePage;
