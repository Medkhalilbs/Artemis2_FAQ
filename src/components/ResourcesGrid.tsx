import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ressourcesExtra } from "@/data/faqData";
import { ressourcesExtraEN } from "@/data/faqDataEN";

const ResourcesGrid = () => {
  const { language } = useLanguage();
  const data = language === "fr" ? ressourcesExtra : ressourcesExtraEN;

  return (
    <section id="ressources" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {language === "fr" ? "Outils et ressources" : "Tools and Resources"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-glass glow-border rounded-xl hover:bg-primary/5 transition-all duration-300"
          >
            <div className="absolute top-4 right-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            
            <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {resource.label}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {resource.desc}
            </p>
            
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-primary/60 uppercase tracking-wider">
              <span>Access Data</span>
              <div className="w-8 h-[1px] bg-primary/30" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ResourcesGrid;
