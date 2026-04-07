import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const MissionDashboard = () => {
  const { language } = useLanguage();

  return (
    <AnimatedSection className="max-w-4xl mx-auto px-6 -mt-10 relative z-20" delay={200}>
      <div className="bg-glass rounded-xl p-8 glow-border backdrop-blur-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <h2 className="font-heading font-bold uppercase tracking-widest text-sm text-primary">
            {language === 'fr' ? 'Télémétrie Officielle NASA' : 'Official NASA Telemetry'}
          </h2>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto mb-8">
          {language === 'fr'
            ? "Pour garantir une précision absolue, nous ne présentons pas d'estimations. Consultez la plateforme officielle AROW de la NASA pour suivre Orion en temps réel avec des données certifiées."
            : "To ensure absolute accuracy, we do not display estimations. Visit NASA's official AROW platform to track Orion in real-time with certified mission data."
          }
        </p>

        <div className="flex justify-center">
          <a
            href="https://www.nasa.gov/missions/artemis-ii/arow"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-lg border border-primary/20 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 font-heading font-bold uppercase tracking-wider text-xs">
              {language === 'fr' ? 'Ouvrir NASA AROW' : 'Open NASA AROW'}
            </span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <p className="mt-6 text-[10px] text-muted-foreground/60 uppercase tracking-widest">
          nasa.gov/missions/artemis-ii/arow
        </p>
      </div>
    </AnimatedSection>
  );
};

export default MissionDashboard;
