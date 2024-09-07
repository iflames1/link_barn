"use client";
import React, { useEffect, useState, useRef } from "react";
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
  ];
  const [activeSection, setActiveSection] = useState<string>("");

  // const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  //
  // useEffect(() => {
  //   const sections = document.querySelectorAll("li[id]");
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.25,
  //   };
  //
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setActiveSection(entry.target.id);
  //       }
  //     });
  //   }, options);
  //
  //   sections.forEach((section) => {
  //     observer.observe(section);
  //     sectionRefs.current[section.id] = section as HTMLElement;
  //   });
  //
  //   return () => {
  //     sections.forEach((section) => {
  //       observer.unobserve(section);
  //     });
  //   };
  // }, []);

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
        <p className="text-2xl md:text-4xl font-semibold leading-10 pb-5">
          Our Privacy Policy
        </p>
        <p className="text-base font-normal leading-6 text-neutral-800">
          Thank you for using Reflex. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our website
          <span className="p-1">
            <Link
              href="http://www.telex.im"
              target="_blank"
              rel=""
              className="text-blue-500"
            >
              www.linkbarn.tech
            </Link>
          </span>
          including any other media form, media channel, mobile website, or
          mobile application related or connected thereto Reflex. Please read
          this privacy policy carefully. If you do not agree with the terms of
          this privacy policy, please do not access the site.
        </p>
        {/* <br /> */}
        {/* <br /> */}

        <ol className="list-decimal p-4 gap-[72px]">
          <li
            className="text-xl md:text-2xl font-semibold leading-6 pt-5 pb-3"
            id="info-collected"
          >
            Information We Collect
          </li>
          <p>
            <b>Personal Information:</b> We may collect personal information
            that you voluntarily provide to us when you register on the Site,
            express interest in obtaining information about us or our products
            and services, when you participate in activities on the Site or
            otherwise when you contact us. <br />
            <br />
            <b>Non-Personal Information:</b> We may collect non-personal
            information about you whenever you interact with our Site.
            Non-personal information may include the browser name, the type of
            computer and technical information about your means of connection to
            our Site, such as the operating system and the Internet service
            providers utilized and other similar information.
          </p>
          <br />
          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="how"
          >
            How We Use Your Information
          </li>

          <p>We may use the information we collect in the following way:</p>
          <ul className="list-disc">
            <li>To personalize user experience</li>
            <li>To improve our Site To send periodic emails</li>
          </ul>

          <br />
          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="disclosure"
          >
            Disclosure of Your Information
          </li>
          <p>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows:
          </p>
          <ul className="list-disc">
            <li>
              <b>Third-Party Service Providers:</b> We may share your
              information with third-party service providers who perform
              services on our behalf to help us operate our business and the
              Site or administer activities on our behalf.
            </li>
            <li>
              <b>Business Transfers:</b> We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </li>
            <li>
              <b>With your Consent: </b>We may disclose your personal
              information for any other purpose with your consent.
            </li>
          </ul>

          <br />
          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="security"
          >
            Security of Your Information
          </li>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>
          <br />
          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5"
            id="rights"
          >
            Your Rights
          </li>
          <p>
            If you are a resident of Nigeria, you may have certain rights
            regarding your personal information under the Nigerian Data
            Protection Regulation (NDPR). These rights may include the right to
            access, correct, or delete your personal information.
          </p>
          <br />
          <li
            className="text-xl md:text-2xl font-semibold leading-6 py-5 whitespace-nowrap"
            id="policy"
          >
            Changes to This Privacy Policy
          </li>
          <p>
            We may update this Privacy Policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal, or regulatory reasons.
          </p>
        </ol>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
