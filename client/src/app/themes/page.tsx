import Header from "@/components/header";
import ThemesPreview from "@/components/preview/theme-preview";
import ThemesPreviewButton from "@/components/preview/theme-preview-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { themes } from "@/data/themes";

const Themes = () => {
  return (
    <div className="min-h-screen sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <Tabs className="grid grid-cols-2 gap-6 mt-12">
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
        <div>
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
