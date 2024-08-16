import ThemesPreview from "@/components/preview/theme-preview";
import ThemesPreviewButton from "@/components/preview/theme-preview-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { themes } from "@/data/themes";

const Themes = () => {
  return (
    <Tabs className="grid grid-cols-2">
      {/* <ThemesPreview key={index} theme={theme} /> */}
      <TabsList className="grid grid-cols-2 md:grid-cols-3 max-w-[700px] gap-3">
        {themes.map((theme, index) => (
          <TabsTrigger key={index} value={theme.name} asChild>
            <ThemesPreviewButton theme={theme} />
          </TabsTrigger>
        ))}
      </TabsList>
      <div>
        {themes.map((theme, index) => (
          <TabsContent value={theme.name} key={index}>
            <ThemesPreview theme={theme} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default Themes;
