import { useLanguage } from "@/contexts/LanguageContext";

const getSections = (lang: string) => [
  { id: "bases", label: lang === 'fr' ? "Les bases" : "Basics", icon: "🚀" },
  { id: "survol", label: lang === 'fr' ? "Survol" : "Flyby", icon: "🌕" },
  { id: "modele-3d", label: lang === 'fr' ? "Modèle 3D" : "3D Model", icon: "🛰️" },
  { id: "vaisseau", label: lang === 'fr' ? "Vaisseau" : "Spacecraft", icon: "🛸" },
  { id: "equipage", label: lang === 'fr' ? "Équipage" : "Crew", icon: "👨‍🚀" },
  { id: "vie-a-bord", label: lang === 'fr' ? "Vie à bord" : "Life aboard", icon: "🛏️" },
  { id: "images", label: lang === 'fr' ? "Images" : "Media", icon: "📷" },
  { id: "divers", label: lang === 'fr' ? "Divers" : "Misc", icon: "❓" },
  { id: "lexique", label: lang === 'fr' ? "Lexique" : "Lexicon", icon: "📖" },
  { id: "planning", label: lang === 'fr' ? "Planning" : "Timeline", icon: "📅" },
];

const SideNav = () => {
  const { language } = useLanguage();
  const sections = getSections(language);
  return (
    <nav className="hidden lg:block fixed top-1/2 -translate-y-1/2 left-6 z-50">
      <div className="bg-glass rounded-xl p-2 space-y-1 glow-border">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            title={section.label}
          >
            <span>{section.icon}</span>
            <span className="hidden xl:inline">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;
