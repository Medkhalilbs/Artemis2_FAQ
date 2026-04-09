import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { momentsCles, momentsClesEN } from "@/data/faqData";
import { momentsClesEN as momentsClesENAlternative } from "@/data/faqDataEN";

const MomentsCles = () => {
  const { language } = useLanguage();
  const data = language === "fr" ? momentsCles : momentsClesENAlternative;

  return (
    <section id="moments-cles" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {language === "fr" ? "Moments clés de la mission" : "Key Mission Moments"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-glass glow-border rounded-lg hover:bg-primary/5 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-primary/60 font-mono">Mission Elapsed Time</span>
                <span className="text-xl font-mono font-bold text-primary group-hover:text-primary/80 transition-colors">
                  {item.met}
                </span>
              </div>
              <div className="h-10 w-[1px] bg-border/50 mx-2" />
              <span className="text-sm font-medium text-foreground group-hover:translate-x-1 transition-transform">
                {item.label}
              </span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MomentsCles;
