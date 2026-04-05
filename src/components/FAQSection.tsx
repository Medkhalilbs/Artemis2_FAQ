import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
  id: string;
}

const FAQSection = ({ title, icon, items, id }: FAQSectionProps) => {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {title}
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`${id}-${index}`}
            className="bg-glass rounded-lg px-5 border-0 glow-border"
          >
            <AccordionTrigger className="text-left text-foreground font-medium hover:text-primary transition-colors py-5 text-[15px] leading-relaxed hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-[14px]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
