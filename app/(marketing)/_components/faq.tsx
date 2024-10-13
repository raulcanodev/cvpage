"use client";

import { cn } from "@/lib/utils";
import React, { useState, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define FAQ item type
interface FaqItem {
  title: string;
  answer: string;
}

// Sample FAQ data
const faqList: FaqItem[] = [
  {
    title: "How do I create my online CV?",
    answer:
      "Creating your CV is very simple, just write your sections blocks and arrange them however you like. Then you can share it with a simple link like this: cvpage.to/raul"
  },
  {
    title: "Can I update my CV after it's created?",
    answer:
      "Yes, you can update your CV anytime. Whether you want to add more experience, update your skills, or change your personal details, you can make edits at any time and your CV will automatically be updated online.",
  },
  {
    title: "How does sharing my online CV work?",
    answer:
      "Once your online CV is ready, you can easily share it by generating a unique link. You can send this link to employers or add it to your resume applications. This makes your CV easily accessible and ensures you always have an up-to-date version ready to share.",
  },
  {
    title: "Do I have to pay to create my CV?",
    answer:
      "To use 100% of the features, a one-time payment is required, priced like a dinner. You are not tied to any subscription, we are against that model. It will always be yours. However, you can always use the free version to see how it works."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="scroll-mt-28 flex w-full flex-col gap-5 items-center py-10">
      <div className="flex flex-col items-center mb-4 gap-4 max-w-xl">
        <p className="text-2xl md:text-4xl font-semibold">
          Any Questions?
        </p>
        {/* <p className="text-wrap text-center text-sm sm:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem reiciendis placeat possimus error officia quis, rem nihil dolor molestias illo!
        </p> */}
      </div>
      <Accordion className="max-w-2xl">
        {faqList.map((item, index) => (
          <AccordionItem
            className="shadow-md"
            title={item.title}
            answer={item.answer}
            key={index}
          />
        ))}
      </Accordion>
    </section>
  );
};

const Accordion: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={cn("flex w-full flex-col gap-4", className)}>{children}</div>;
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  answer: string;
  className?: string;
  rotation?: string;
  icon?: ReactElement;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  answer,
  className,
  ...props
}) => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border opacity-70 hover:opacity-100 hover:shadow-md border-black/50 dark:border-white/50 dark:bg-white/5 hover:dark:bg-white/10 bg-white dark:bg-black",
        accordionOpen && "shadow-md opacity-100",
        className
      )}
      {...props}
    >
      <button
        onClick={() => setAccordionOpen(prev => !prev)}
        className="flex w-full items-center justify-between px-5 py-3 rounded-2xl"
      >
        <span className="text-lg font-medium">{title}</span>
        <motion.span
          initial={false}
          animate={accordionOpen ? "open" : "close"}
          variants={{
            open: { rotate: 45 },
            close: { rotate: 0 },
          }}
          transition={{ duration: 0.5, stiffness: 150, type: "spring" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {accordionOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="overflow-hidden text-wrap"
          >
            <p className="m-5 opacity-80">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQSection;