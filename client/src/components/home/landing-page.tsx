import React from "react";
import { FeaturesSectionDemo } from "./feats";
import { Testimonials } from "./testimonials";
import FAQs from "./faqs";
import { cn } from "@/lib/utils";
import { HeroScrollDemo } from "./container-scroll";
import { Manrope } from "next/font/google";
import Counters from "./counters";
import { getAllUsernames } from "@/lib/queries";

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
  {
    question: "How do I create an account on Link Barn?",
    answer:
      "To create an account on Link Barn, you need to connect your stacks wallet. Simply click on the 'sign in with wallet' button, choose your preferred wallet (e.g., Leather, Xverse, Orange), and follow the prompts to complete the connection. Once your wallet is connected, your account is automatically created.",
  },
  {
    question: "What types of wallets are supported for sign-in?",
    answer:
      "Link Barn supports all that supports Stacks blockchain. We're constantly working on expanding our list of supported wallets to provide more options for our users.",
  },
  {
    question: "Is my personal information safe when using wallet connection?",
    answer:
      "Yes, your personal information is safe. By using wallet connection, Link Barn doesn't store your private keys or sensitive wallet information. The connection only provides a secure way to verify your identity without sharing unnecessary personal data.",
  },
  {
    question: "How do I add links to my Link Barn page?",
    answer: `After signing in, you'll be redirected to a "/user/links" page. Click on the 'Add New Link' button, enter the URL and a title for your link, and save. You can add as many links as you need and easily reorder them by dragging and dropping.`,
  },
  {
    question: "Can I customize the appearance of my Link Barn page?",
    answer:
      "Yes, Link Barn offers various customization options. You can change your page's theme, add a profile picture, customize colors, and even add a background image to make your page unique and reflective of your brand or personality.",
  },
  {
    question: "How do I share my Link Barn page with others?",
    answer:
      "Once you've set up your links, you'll receive a unique URL for your Link Barn page. You can share this URL on your social media profiles, email signature, or anywhere else you want to provide easy access to your collection of links.",
  },
  {
    question: "Is Link Barn free to use?",
    answer:
      "Link Barn offers both free and premium tiers. The free tier provides basic functionality, while the premium tier offers advanced features such as advance appearance customization removable Link Barn branding. Check our pricing page for more details.",
  },
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

export async function LandingPage() {
  const users = await getAllUsernames();

  return (
    <div className="h-full flex flex-col gap-16">
      <HeroScrollDemo />
      <div className="max-w-[1150px] mx-10 md:mx-auto w-full">
        {/* <Counters users={users?.length || 100} /> */}
      </div>
      <div className="md:h-[50rem] lg:h-[40rem] w-full flex-col dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h3
          className={cn(
            "mt-16 sm:mt-20 text-black px-4 text-center text-xl sm:text-3xl md:text-[36px] lg:text-[48px] max-w-[1240px] font-bold md:leading-[55.68px]",
            manrope.className
          )}
        >
          Creating Links & Sharing Made Easy
        </h3>
        <FeaturesSectionDemo />
      </div>
      <div id="testimonials">
        <h3
          className={cn(
            "text-center text-[#151515] px-4 text-2xl sm:text-3xl md:text-[36px] lg:text-[48px] font-bold md:leading-[55.68px] mb-4 md:mb-12",
            manrope.className
          )}
        >
          What people say about Link Barn
        </h3>
        <Testimonials />
      </div>
      <div id="faqs" className="py-6">
        <h3
          className={cn(
            "text-center text-[#151515]  px-4 text-2xl sm:text-3xl md:text-3xl md:text-[36px] lg:text-[48px] font-bold md:leading-[55.68px] md:mb-12",
            manrope.className
          )}
        >
          FAQs
        </h3>
        <FAQs
          className="bg-[#fafafa] py-4 rounded-md"
          type="landing"
          faqs={faqs}
        />
      </div>
    </div>
  );
}
