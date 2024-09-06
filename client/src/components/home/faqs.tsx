import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSchema {
  question: string;
  answer: string;
}

const faqs = [
  {
    question: "What is LinkBarn",
    answer: "It is Free",
  },
  {
    question: "What is LinkBarn",
    answer: "It is Free",
  },
  {
    question: "What is LinkBarn",
    answer: "It is Free",
  },
  {
    question: "What is LinkBarn",
    answer: "It is Free",
  },
  {
    question: "What is LinkBarn",
    answer: "It is Free",
  },
  {
    question: "What is LinkBarn",
    answer: "It is Free",
  },
];

const FAQs = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-[1000px] px-4 mx-auto flex flex-col gap-4"
    >
      {faqs.map((faq, index) => (
        <FAQ faq={faq} key={index} index={index} />
      ))}
    </Accordion>
  );
};

const FAQ = ({ faq, index }: { faq: FAQSchema; index: number }) => {
  return (
    <AccordionItem value={index.toString()} className="">
      <AccordionTrigger className="text-lg rounded-md bg-[#f2f4f7] px-4 hover:no-underline">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="pt-2 pl-4">{faq.answer}</AccordionContent>
    </AccordionItem>
  );
};

export default FAQs;
