import React from "react";
import Link from "next/link";
import {
  TableOfContentsItem,
  TableOfContentsLink,
  TableOfContentsList,
  TableOfContentsTitle,
} from "@/components/ui/toc";

const PrivacyPolicy = () => {
  const tableOfContents = [
    {
      title: "Information We Collect",
      href: "info-collected",
    },
    {
      title: "How We Use Your Information",
      href: "how",
    },
    {
      title: "Current Data Storage and Future Plans",
      href: "storage",
    },
    {
      title: "Disclosure of Your Information",
      href: "disclosure",
    },
    {
      title: "Security of Your Information",
      href: "security",
    },
    {
      title: "Your Rights",
      href: "rights",
    },
    {
      title: "Changes to This Privacy Policy",
      href: "policy",
    },
    {
      title: "Contact Us",
      href: "contact",
    },
  ];

  return (
    <div className="w-full flex gap-8 py-20 px-6 md:px-16 max-w-[1200px] mx-auto">
      <TableOfContentsList className="!sticky self-start hidden md:block top-[90px]">
        <TableOfContentsTitle>Contents</TableOfContentsTitle>
        {tableOfContents.map((item, index) => (
          <TableOfContentsItem key={index}>
            <TableOfContentsLink href={`#${item.href}`}>
              {item.title}
            </TableOfContentsLink>
          </TableOfContentsItem>
        ))}
      </TableOfContentsList>
      <div className="w-[375px] md:w-[700px] lg:w-[815px] px-5 text-black">
        <h1 className="text-2xl md:text-4xl font-semibold leading-10 pb-5">
          Our Privacy Policy
        </h1>
        <p className="text-base font-normal leading-6 text-neutral-800">
          Thank you for using Link Barn, a decentralized application for sharing
          links. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our application accessible at{" "}
          <Link
            href="http://www.linkbarn.tech"
            target="_blank"
            rel=""
            className="text-blue-500"
          >
            www.linkbarn.tech
          </Link>
          . Please read this privacy policy carefully. If you do not agree with
          the terms of this privacy policy, please do not access the
          application.
        </p>

        <ol className="list-decimal p-4 gap-[72px]">
          <li
            className="text-xl md:text-2xl font-semibold leading-6 pt-5 pb-3"
            id="info-collected"
          >
            Information We Collect
          </li>
          <ul className="list-disc pl-6">
            <li>
              <b>Wallet Address:</b> When you connect your wallet to our
              application, we collect your public wallet address. This is
              necessary for the functioning of our application and to provide
              you with our services.
            </li>
            <li>
              <b>Optional Personal Information:</b> You may choose to provide
              additional personal information, such as your name, to enhance
              your profile. This information is entirely optional and you can
              use our service without providing it.
            </li>
            <li>
              <b>Links:</b> We collect and store the links that you choose to
              share through our platform.
            </li>
            <li>
              <b>Non-Personal Information:</b> We may collect non-personal
              information about you when you interact with our application. This
              may include technical information about your means of connection,
              such as the type of device, operating system, and browser
              you&apos;re using.
            </li>
          </ul>

          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="how"
          >
            How We Use Your Information
          </li>
          <p>We use the information we collect in the following ways:</p>
          <ul className="list-disc pl-6">
            <li>To provide and maintain our application</li>
            <li>To personalize your experience</li>
            <li>To improve our application</li>
            <li>To communicate with you about your account or transactions</li>
            <li>To respond to your comments or inquiries</li>
          </ul>

          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="storage"
          >
            Current Data Storage and Future Plans
          </li>
          <p>
            Currently, we do not store user data on any public blockchain or
            decentralized storage system. Your information is stored securely on
            our servers. However, we are planning to transition to a more
            decentralized approach in the future:
          </p>
          <ul className="list-disc pl-6">
            <li>
              We plan to implement Gaia, a decentralized storage system on the
              Stacks blockchain, for storing user data.
            </li>
            <li>
              Once implemented, your data will be stored in a self-hosted
              blockchain storage, increasing data ownership and control.
            </li>
            <li>
              We will update this privacy policy and notify users before making
              this transition.
            </li>
          </ul>

          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="disclosure"
          >
            Disclosure of Your Information
          </li>
          <p>We take your privacy seriously:</p>
          <ul className="list-disc pl-6">
            <li>
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to third parties.
            </li>
            <li>
              We may share aggregated, non-personal information with third
              parties for industry analysis and demographic profiling.
            </li>
            <li>
              In the future, when we transition to decentralized storage, some
              information may become publicly visible. We will provide more
              details and options before this transition.
            </li>
          </ul>

          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="security"
          >
            Security of Your Information
          </li>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. However, no method of transmission
            over the internet or electronic storage is 100% secure. While we
            strive to use commercially acceptable means to protect your personal
            information, we cannot guarantee its absolute security.
          </p>

          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="rights"
          >
            Your Rights
          </li>
          <p>
            Depending on your jurisdiction, you may have certain rights
            regarding your personal information, such as the right to access,
            correct, or delete your data. Please contact us if you wish to
            exercise these rights. Note that once we transition to decentralized
            storage, the nature of blockchain technology may limit our ability
            to modify or delete information.
          </p>

          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="policy"
          >
            Changes to This Privacy Policy
          </li>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, legal requirements, or other
            factors. We encourage you to review this policy periodically. We
            will notify you of any significant changes in the way we treat
            personal information by sending a notice to the primary email
            address specified in your account or by placing a prominent notice
            on our site.
          </p>

          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="contact"
          >
            Contact Us
          </li>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <Link
              href="https://discord.gg/d9HjRNRYgQ"
              target="_blank"
              className="text-blue-500"
            >
              Discord
            </Link>
            .
          </p>
        </ol>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
