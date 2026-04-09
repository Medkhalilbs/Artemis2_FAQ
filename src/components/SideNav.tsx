import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const getSections = (lang: string) => [
  { id: "bases", label: lang === 'fr' ? "Les bases" : "Basics", icon: "🚀" },
  { id: "survol", label: lang === 'fr' ? "Survol" : "Flyby", icon: "🌕" },
  { id: "bouclier", label: lang === 'fr' ? "Bouclier" : "Radiation", icon: "🛡️" },
  { id: "retour", label: lang === 'fr' ? "Retour" : "Return", icon: "🌎" },
  { id: "equipage", label: lang === 'fr' ? "Équipage" : "Crew", icon: "👨‍🚀" },
  { id: "vie-a-bord", label: lang === 'fr' ? "Vie à bord" : "Life aboard", icon: "🛏️" },
  { id: "images", label: lang === 'fr' ? "Images" : "Media", icon: "📷" },
  { id: "divers", label: lang === 'fr' ? "Divers" : "Misc", icon: "❓" },
  { id: "lexique", label: lang === 'fr' ? "Lexique" : "Lexicon", icon: "📖" },
  { id: "moments-cles", label: lang === 'fr' ? "Moments Clés" : "Key Moments", icon: "⏱️" },
  { id: "ressources", label: lang === 'fr' ? "Ressources" : "Resources", icon: "🔗" },
  { id: "planning", label: lang === 'fr' ? "Planning" : "Timeline", icon: "📅" },
];

const SideNav = () => {
  const { language } = useLanguage();
  const sections = getSections(language);
  const [activeSection, setActiveSection] = useState<string>("bases");

  useEffect(() => {
    const observers = new Map();
    const visibleSections = new Set();
    
    // Create an intersection observer for each section
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });
      
      // Find the first visible section based on order in DOM/array
      if (visibleSections.size > 0) {
        for (const section of sections) {
          if (visibleSections.has(section.id)) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -40% 0px", // Trigger when element is well within viewport
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="hidden lg:block fixed top-1/2 -translate-y-1/2 left-6 z-50">
      <div className="bg-glass rounded-xl p-2 space-y-1.5 glow-border shadow-xl backdrop-blur-xl">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`relative flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-300 group
                ${isActive 
                  ? "text-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.15)] scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              title={section.label}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-primary rounded-r-md shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
              )}
              <span className={`text-lg transition-transform duration-300 ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" : "group-hover:scale-110"}`}>
                {section.icon}
              </span>
              <span className={`hidden xl:inline tracking-wide transition-opacity duration-300 ${isActive ? "opacity-100 font-bold" : "opacity-80"}`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNav;
