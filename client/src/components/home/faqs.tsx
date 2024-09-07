import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQSchema {
  question: string;
  answer: string;
}

const FAQs = ({
  className,
  type,
  faqs,
}: {
  className: string;
  type: string;
  faqs: FAQSchema[];
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "w-full max-w-[1000px] px-4 mx-auto flex flex-col gap-4",
        className,
      )}
    >
      {faqs.map((faq, index) => (
        <FAQ faq={faq} key={index} index={index} type={type} />
      ))}
    </Accordion>
  );
};

const FAQ = ({
  faq,
  index,
  type,
}: {
  faq: FAQSchema;
  index: number;
  type: string;
}) => {
  return (
    <AccordionItem
      value={index.toString()}
      className={cn(type === "landing" && "bg-[#f2f4f7] rounded-md")}
    >
      <AccordionTrigger
        className={cn(
          "px-4 hover:no-underline ",
          type === "landing" ? "text-lg rounded-md" : "",
        )}
      >
        {faq.question}
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          "text-[#767676]",
          type === "pricing" ? "pl-6" : "pl-6 border-b-transparent",
        )}
      >
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQs;
