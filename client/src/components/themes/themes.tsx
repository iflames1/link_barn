import Preview from "./preview";
import ThemeCollection from "./theme-collection";

export default function Themes() {
  return (
    <div className="lg:flex gap-6 w-full">
      <Preview />
      <ThemeCollection />
    </div>
  );
}
