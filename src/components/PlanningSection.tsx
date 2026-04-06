import { Calendar, Clock, ExternalLink } from "lucide-react";
import { planningEvents } from "@/data/faqData";
import { planningEventsEN } from "@/data/faqDataEN";
import AnimatedSection from "./AnimatedSection";

interface PlanningSectionProps {
  language: 'fr' | 'en';
}

const PlanningSection = ({ language }: PlanningSectionProps) => {
  const events = language === 'fr' ? planningEvents : planningEventsEN;

  return (
    <section id="planning" className="scroll-mt-24 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <Calendar size={20} />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {language === 'fr' ? "Planning de la Mission" : "Mission Schedule"}
        </h2>
      </div>

      <div className="space-y-12">
        {events.map((day, dayIdx) => (
          <div key={dayIdx} className="relative pl-8 border-l border-primary/20">
            {/* Day Marker */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_10px_rgba(var(--primary),0.5)]" />

            <h3 className="text-xl font-heading font-bold text-primary mb-6 tracking-tight uppercase">
              {day.date}
            </h3>

            <div className="grid gap-4">
              {day.events.map((event, eventIdx) => (
                <div
                  key={eventIdx}
                  className="bg-glass p-4 rounded-lg border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm shrink-0 mt-0.5">
                      <Clock size={14} className="group-hover:animate-pulse" />
                      {event.time}
                    </div>
                    <div className="text-foreground/90 font-medium leading-tight">
                      {event.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default PlanningSection;
