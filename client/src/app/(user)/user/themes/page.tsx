import Header from "@/components/header";
import ThemesPreview, {
  ThemePreviewLink,
} from "@/components/preview/theme-preview";
import ThemesPreviewButton from "@/components/preview/theme-preview-button";
import ThemePreviewMobile from "@/components/preview/theme-preview-mobile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { themes } from "@/data/themes";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import PrevThemes from "./prev-themes";
import Themes from "@/components/themes/themes";

const ThemesPage = () => {
  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="w-full sm:p-0 sm:pt-6 p-4">
        {/*<PrevThemes />*/}
        <Themes />
      </div>
    </div>
  );
};

export default ThemesPage;
