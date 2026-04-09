import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
  id: string;
  searchQuery?: string;
}

function highlightQuery(node: React.ReactNode, query?: string): React.ReactNode {
  if (!query || !query.trim()) return node;
  const qStr = query.trim();
  
  if (typeof node === "string") {
    const parts = node.split(new RegExp(`(${qStr})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === qStr.toLowerCase() ? (
        <span key={i} className="bg-primary/40 text-white px-0.5 rounded shadow-[0_0_10px_rgba(var(--primary),0.5)] font-bold">{part}</span>
      ) : part
    );
  }
  
  if (Array.isArray(node)) {
    return React.Children.map(node, (n) => highlightQuery(n, query));
  }
  
  if (React.isValidElement(node)) {
    return React.cloneElement(node as React.ReactElement<any>, {
      ...node.props,
      children: highlightQuery(node.props.children, query),
    });
  }
  
  return node;
}

const FAQSection = ({ title, icon, items, id, searchQuery = "" }: FAQSectionProps) => {
  const [activeLectureIndex, setActiveLectureIndex] = useState<number | null>(null);

  return (
    <section id={id} className="scroll-mt-24">
      {/* Lecture Mode Dialog */}
      <Dialog open={activeLectureIndex !== null} onOpenChange={(open) => !open && setActiveLectureIndex(null)}>
        {activeLectureIndex !== null && (
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur-3xl border-border p-0 shadow-2xl rounded-3xl flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 z-50"></div>
            
            <div className="absolute top-1/2 left-4 sm:left-6 -translate-y-1/2 z-50 hidden sm:block">
              <button 
                onClick={() => setActiveLectureIndex(Math.max(0, activeLectureIndex - 1))}
                disabled={activeLectureIndex === 0}
                className="p-4 rounded-full bg-background/50 backdrop-blur border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-all hover:scale-110 shadow-lg"
                title="Question précédente"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            </div>
            
            <div className="absolute top-1/2 right-4 sm:right-6 -translate-y-1/2 z-50 hidden sm:block">
              <button 
                onClick={() => setActiveLectureIndex(Math.min(items.length - 1, activeLectureIndex + 1))}
                disabled={activeLectureIndex === items.length - 1}
                className="p-4 rounded-full bg-background/50 backdrop-blur border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-all hover:scale-110 shadow-lg"
                title="Question suivante"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <DialogHeader className="px-8 sm:px-24 pt-12 pb-8 bg-muted/20 border-b border-border shrink-0 relative z-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLectureIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogTitle className="text-2xl sm:text-4xl font-heading font-bold text-foreground leading-[1.35] tracking-tight text-center">
                    {highlightQuery(items[activeLectureIndex].question, searchQuery)}
                  </DialogTitle>
                </motion.div>
              </AnimatePresence>
            </DialogHeader>
            
            <div className="overflow-y-auto px-8 sm:px-24 py-10 relative z-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLectureIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose dark:prose-invert prose-lg max-w-none text-muted-foreground/90 leading-[1.8] font-body marker:text-primary prose-a:text-primary prose-strong:text-foreground prose-headings:text-foreground">
                    {highlightQuery(items[activeLectureIndex].answer, searchQuery)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Mobile navigation (visible only on small screens) */}
            <div className="flex sm:hidden justify-between p-4 border-t border-border bg-background mt-auto z-50">
               <button 
                onClick={() => setActiveLectureIndex(Math.max(0, activeLectureIndex - 1))}
                disabled={activeLectureIndex === 0}
                className="p-3 flex items-center gap-2 rounded-xl bg-secondary text-foreground disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-5 h-5" /> Précédent
              </button>
              <button 
                onClick={() => setActiveLectureIndex(Math.min(items.length - 1, activeLectureIndex + 1))}
                disabled={activeLectureIndex === items.length - 1}
                className="p-3 flex items-center gap-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-30 disabled:pointer-events-none"
              >
                Suivant <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center w-12 h-12 shadow-[0_0_20px_rgba(var(--primary),0.3)] rounded-xl bg-primary/10 text-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 blur-md"></div>
          <span className="relative z-10">{icon}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
          {title}
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-5 w-full">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              layout
              key={item.question}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.05, type: "spring", stiffness: 90 }}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/0 to-glow-blue/0 group-hover:from-primary/20 group-hover:via-glow-blue/15 group-hover:to-primary/0 rounded-3xl blur-xl transition duration-700 opacity-0 group-hover:opacity-100"></div>
              
              <div className="absolute right-14 top-[18px] sm:top-[20px] z-20">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLectureIndex(index);
                  }} 
                  className="group/btn flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 hover:bg-primary/30 hover:border-primary/50 text-primary transition-all duration-500 opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-[0_0_15px_rgba(var(--primary),0.1)] hover:shadow-[0_0_25px_rgba(var(--primary),0.3)] hover:-translate-y-0.5 pointer-events-none group-hover:pointer-events-auto"
                  title="Read in Lecture Mode"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest hidden sm:block opacity-0 group-hover/btn:opacity-100 transition-all whitespace-nowrap overflow-hidden max-w-0 group-hover/btn:max-w-[120px] duration-500 ease-out">
                    Lecture
                  </span>
                </button>
              </div>

              <AccordionItem
                id={`accordion-${id}-${index}`}
                value={`${id}-${index}`}
                className="relative bg-background/50 backdrop-blur-2xl rounded-2xl border border-border/40 shadow-lg hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 data-[state=open]:border-primary/30 data-[state=open]:bg-gradient-to-b data-[state=open]:from-primary/10 data-[state=open]:to-transparent data-[state=open]:shadow-[0_0_40px_rgba(var(--primary),0.15)] transition-all duration-500 overflow-hidden pr-3"
              >
                <AccordionTrigger className="px-6 py-6 sm:py-7 text-left text-foreground hover:text-primary transition-all duration-300 hover:no-underline group/trigger">
                  <span className="flex items-center gap-5 relative z-10 w-full pr-14 sm:pr-32">
                    <span className="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-primary/30 group-hover/trigger:bg-primary group-hover/trigger:scale-[1.3] group-hover/trigger:shadow-[0_0_15px_rgba(var(--primary),0.8)] transition-all duration-500"></span>
                    <span className="text-[16px] sm:text-[18px] font-semibold leading-relaxed text-foreground/80 group-hover/trigger:text-foreground transition-colors mix-blend-plus-lighter">{highlightQuery(item.question, searchQuery)}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 sm:px-12 pb-8 text-muted-foreground/80 text-[15.5px] leading-loose">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {highlightQuery(item.answer, searchQuery)}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Accordion>
    </section>
  );
};

export default FAQSection;
