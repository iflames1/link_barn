import FAQs from "@/components/home/faqs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import ContactUs from "./contact";
import { isFree } from "@/lib/constants";

interface PlanFeature {
  type: string;
  features: {
    name: string;
    free: boolean;
    startup: boolean;
    team: boolean;
    enterprise: boolean;
  }[];
}

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const faqs = [
  {
    question: "What is Link Barn?",
    answer:
      "Link Barn is a versatile tool for managing, organizing, and sharing your links. Similar to LinkTree, it allows you to create a personalized page with multiple links. What sets Link Barn apart is its use of wallet connection for account creation and sign-in, providing enhanced security and seamless integration with blockchain technology.",
  },
  // {
  //   question: "Is Link Barn free to use?",
  //   answer: isFree
  //     ? "Link Barn offers both free and premium tiers. The free tier provides basic functionality, while the premium tier offers advanced features such as advance appearance customization removable Link Barn branding. Check our pricing page for more details."
  //     : "Link Barn offers premium and business tiers. The free tier provides basic functionality, while the premium tier offers advanced features such as advance appearance customization removable Link Barn branding. Check our pricing page for more details.",
  // },
  {
    question: "Can I use Link Barn for my business or brand?",
    answer:
      "Absolutely! Link Barn is perfect for both personal and professional use. Many businesses, projects, influencers, and content creators use Link Barn to centralize their important links, making it easier for their audience to find all relevant information in one place.",
  },
  {
    question: "What if I lose access to my wallet?",
    answer:
      "If you lose access to your wallet, you'll need to regain access to it using your wallet's recovery methods (e.g., seed phrase). Once you've regained access to your wallet, you can simply connect it to Link Barn again. We recommend always keeping your wallet recovery information in a safe place.",
  },
];

export default function PricingSectionCards() {
  return (
    <>
      {/* Pricing */}
      <div className="container py-24 lg:py-32">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Simple and Affordable Pricing Plan
          </h2>
          <p className="mt-1 text-muted-foreground">
            Whatever your status, our offers evolve according to your needs.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center items-center">
          {/* Card */}
          {isFree && (
            <Card className="hover:scale-[1.03] transition-transform duration-300">
              <CardHeader className="text-center pb-2">
                <CardTitle className="mb-7">Free</CardTitle>
                <span className="font-bold text-5xl">Free</span>
              </CardHeader>
              <CardDescription className="text-center">
                Forever free
              </CardDescription>
              <CardContent>
                <ul className="mt-7 space-y-2.5 text-sm">
                  <li className="flex space-x-2">
                    <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                    <span className="text-muted-foreground">Custom URL</span>
                  </li>
                  <li className="flex space-x-2">
                    <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                    <span className="text-muted-foreground">
                      Product support
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={"outline"}>
                  <Link href={"/user/preview"}>Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
          {/* End Card */}

          {/* Card */}
          <Card className="hover:scale-[1.03] transition-transform duration-300">
            <CardHeader className="text-center pb-2">
              <CardTitle className="!mb-7">Premium</CardTitle>
              <span className="font-bold text-5xl">5 STX</span>
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Everything you need for a growing presence
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Remove Link Barn Branding
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Appearance Customization
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"} asChild>
                <Link href={"/user/preview"}>Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="border-base-dark hover:scale-[1.03] transition-transform duration-300">
            <CardHeader className="text-center pb-2">
              <Badge className="uppercase w-max self-center mb-3">
                Most popular
              </Badge>
              <CardTitle className="!mb-7">Premium (UNIKIND HOLDERS)</CardTitle>
              <span className="font-bold text-5xl">2 STX</span>
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              Everything you need for a growing presence
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Remove Link Barn Branding
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Appearance Customization
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-base-dark text-base-light" asChild>
                <Link href={"/user/preview"}>Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="hover:scale-[1.03] transition-transform duration-300">
            <CardHeader className="text-center pb-2">
              <CardTitle className="!mb-7">Business</CardTitle>
              <span className="font-bold text-5xl">20 STX</span>
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Everything you need for a growing presence
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Custom Domain Support
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    24/7 priority support
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Custom icon/logo upload
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    Request personalized appearance
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"} asChild>
                <Link href={"/user/preview"}>Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
        </div>
        {/* End Grid */}
        <div className="flex flex-col md:flex-row gap-6 mt-14">
          <div className=" text-center md:text-left flex-1">
            <h3
              className={cn(
                "text-[#151515] text-xxl sm:text-2xl md:text-3xl font-bold md:leading-[55.68px]",
                manrope.className
              )}
            >
              Frequently Aked Questions
            </h3>
            <span className="my-1 block">Have more questions?</span>
          </div>
          <FAQs
            className="bg-[#fafafa] py-4 rounded-md flex-1"
            type="pricing"
            faqs={faqs}
          />
        </div>
      </div>
      {/* End Pricing */}
      <ContactUs />
    </>
  );
}
