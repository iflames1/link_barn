import { themes } from "@/data/themes2";
import { cn } from "@/lib/utils";
import { JoinLinkBarn } from "../ui/logo";

interface ProfileWrapperProps {
  children: React.ReactNode;
  className?: string;
  theme?: string;
  username?: string;
}

export default function ProfileWrapper({
  children,
  className,
  theme,
  username,
}: ProfileWrapperProps) {
  const userTheme = themes.find((data) => data.name === theme) || themes[0];
  console.log(userTheme);

  return (
    <main
      className={cn(
        `${userTheme.bg} w-full h-full`,
        username &&
          "min-h-dvh min-w-screen flex flex-col items-center justify-between",
      )}
    >
      <div
        className={`sm:max-w-80 mx-auto py-14 sm:px-0 px-[10%] w-screen ${userTheme.text} ${className}`}
      >
        {children}
      </div>
      {username && (
        <div className={`pb-4 ${userTheme.text}`}>
          <JoinLinkBarn username={username} />
        </div>
      )}
    </main>
  );
}
