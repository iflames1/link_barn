// "use client";

import { Tabs } from "@/components/ui/tabs";
// import { useRouter, useSearchParams } from "next/navigation";

interface ThemeSelectorProps {
  defaultValue: string;
  children: React.ReactNode;
}

export function ThemeSelector({ defaultValue, children }: ThemeSelectorProps) {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const onValueChange = (value: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("theme", value);
  //   router.push(`?${params.toString()}`);
  // };

  return (
    <Tabs
      defaultValue={defaultValue}
      // onValueChange={onValueChange}
      className="gap-6 w-full grid grid-cols-1 lg:grid-cols-2"
    >
      {children}
    </Tabs>
  );
}
