import Preview from "./preview";
import Form from "./form";

interface ProfileDetailsProps {
  children: React.ReactNode;
}

export default function ProfileDetails() {
  return (
    <div className="lg:flex gap-6 w-full">
      <Preview />
      <Form />
    </div>
  );
}
