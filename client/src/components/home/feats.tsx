import { cn } from "@/lib/utils";
import {
  Wallet,
  Link,
  Brush,
  Zap,
  Lock,
  Gift,
  Star,
  Share2,
} from "lucide-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Wallet Integration",
      description:
        "Secure account creation and sign-in using your favorite cryptocurrency wallet.",
      icon: <Wallet />,
    },
    {
      title: "Intuitive Link Management",
      description:
        "Easily create, update, delete, and reorder your links with our user-friendly interface.",
      icon: <Link />,
    },
    {
      title: "Customizable Design",
      description:
        "Personalize your page with custom themes, colors, and backgrounds to match your brand.",
      icon: <Brush />,
    },
    {
      title: "Lightning-Fast Performance",
      description:
        "Experience blazing-fast load times and smooth interactions across all devices.",
      icon: <Zap />,
    },
    {
      title: "Enhanced Security",
      description:
        "Benefit from the added security of blockchain technology for your account.",
      icon: <Lock />,
    },
    {
      title: "Easy Sharing",
      description:
        "Share your Link Barn page effortlessly across various platforms and social media.",
      icon: <Share2 />,
    },
    {
      title: "Free Tier Available",
      description:
        "Get started with our feature-rich free tier, no credit card required.",
      icon: <Gift />,
    },
    {
      title: "Premium Features",
      description:
        "Unlock advanced capabilities with our affordable premium plan.",
      icon: <Star />,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 relative z-10 max-w-[1200px] py-6 mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-7 pb-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
