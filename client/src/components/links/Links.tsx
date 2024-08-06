import Preview from "../Preview";
import LinkForm from "./LinkForm";

export default function Links() {
  return (
    <div className="lg:flex gap-6 w-full">
      <Preview className="w-[40vw] lg:flex hidden" />
      <LinkForm />
    </div>
  );
}
