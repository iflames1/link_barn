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

const Themes = () => {
  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto ">
      <Header />
      <Tabs className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 px-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 bg-transparent max-w-[700px] gap-4">
          {themes.map((theme, index) => (
            <TabsTrigger
              key={index}
              value={theme.name}
              asChild
              className={`data-[state=active]:${theme.background.value}`}
            >
              <ThemesPreviewButton theme={theme} />
            </TabsTrigger>
          ))}
        </TabsList>
        <>
          {themes.map((theme, index) => (
            <TabsContent
              value={theme.name}
              className={`data-[state=active]:${theme.background.value}`}
              key={index}
              asChild
            >
              <ThemePreviewMobile theme={theme} />
            </TabsContent>
          ))}
        </>

        <div className="hidden w-full md:flex items-center justify-center bg-white">
          {themes.map((theme, index) => (
            <TabsContent
              value={theme.name}
              className={`data-[state=active]:${theme.background.value}`}
              key={index}
            >
              <ThemesPreview theme={theme} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Themes;
