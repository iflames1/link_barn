import { themes, ThemeSchema } from "@/data/themes2";
import { cn } from "@/lib/utils";
import { JoinLinkBarn } from "../ui/logo";

interface ProfileWrapperProps {
  children: React.ReactNode;
  className?: string;
  theme?: string;
  username?: string;
  themesPage?: ThemeSchema;
}

export default function ProfileWrapper({
  children,
  className,
  theme,
  username,
  themesPage,
}: ProfileWrapperProps) {
  const userTheme = themes.find((data) => data.name === theme) || themes[0];

  return (
    <main
      className={cn(
        themesPage ? themesPage.bg : userTheme.bg,
        "w-full h-full",
        username &&
          "min-h-dvh min-w-screen flex flex-col items-center justify-between",
      )}
    >
      <div
        className={cn(
          "sm:max-w-80 mx-auto py-14 px-[10%] sm:px-0",
          className,
          username && "w-dvw",
          themesPage ? themesPage.text : userTheme.text,
        )}
      >
        {children}
      </div>
      {username && (
        <div
          className={cn(`pb-4`, themesPage ? themesPage.text : userTheme?.text)}
        >
          <JoinLinkBarn username={username} />
        </div>
      )}
    </main>
  );
}
