import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-space.jpg";
import FAQSection from "@/components/FAQSection";
import CrewCard from "@/components/CrewCard";
import MissionTimeline from "@/components/MissionTimeline";
import SideNav from "@/components/SideNav";
import AnimatedSection from "@/components/AnimatedSection";
import SearchBar from "@/components/SearchBar";
import OrionSpacecraft from "@/components/OrionSpacecraft";
import OrionModel3D from "@/components/OrionModel3D";
import StarfieldBackground from "@/components/StarfieldBackground";
import MissionDashboard from "@/components/MissionDashboard";
import PlanningSection from "@/components/PlanningSection";
import videoFile from "@/assets/artemis2_full_2160p60.mp4";
import { Globe, Book, Landmark, Moon } from "lucide-react";

import { basesItems, vieABordItems, imagesItems, diversItems, survolItems, lexiqueItems } from "@/data/faqData";
import { basesItemsEN, vieABordItemsEN, imagesItemsEN, diversItemsEN, survolItemsEN, lexiqueItemsEN } from "@/data/faqDataEN";

const getCrewMembers = (lang: string) => [
  {
    name: "Reid Wiseman",
    role: lang === 'fr' ? "Commandant" : "Commander",
    birthDate: lang === 'fr' ? "11 novembre 1975" : "November 11, 1975",
    age: 50,
    nationality: lang === 'fr' ? "Américain" : "American",
    formation: lang === 'fr' ? "Ingénieur, pilote d'essais (F-35, F-18, US Navy)" : "Engineer, test pilot (F-35, F-18, US Navy)",
    experience: "1 mission (ISS, 2014)",
    agency: "NASA",
    flag: "🇺🇸",
  },
  {
    name: "Victor Glover",
    role: lang === 'fr' ? "Pilote" : "Pilot",
    birthDate: lang === 'fr' ? "30 avril 1976" : "April 30, 1976",
    age: 49,
    nationality: lang === 'fr' ? "Américain" : "American",
    formation: lang === 'fr' ? "Pilote de chasse (US Navy)" : "Fighter pilot (US Navy)",
    experience: "1 mission (Crew-1, 2020)",
    agency: "NASA",
    flag: "🇺🇸",
  },
  {
    name: "Christina Koch",
    role: lang === 'fr' ? "Spécialiste de mission" : "Mission Specialist",
    birthDate: lang === 'fr' ? "29 janvier 1979" : "January 29, 1979",
    age: 47,
    nationality: lang === 'fr' ? "Américaine" : "American",
    formation: lang === 'fr' ? "Ingénieure" : "Engineer",
    experience: lang === 'fr' ? "328 jours ISS (record féminin), 6 EVA" : "328 days ISS (female record), 6 EVAs",
    agency: "NASA",
    flag: "🇺🇸",
  },
  {
    name: "Jeremy Hansen",
    role: lang === 'fr' ? "Spécialiste de mission" : "Mission Specialist",
    birthDate: lang === 'fr' ? "27 janvier 1976" : "January 27, 1976",
    age: 50,
    nationality: lang === 'fr' ? "Canadien" : "Canadian",
    formation: lang === 'fr' ? "Pilote de chasse (CF-18, armée canadienne)" : "Fighter pilot (CF-18, Canadian forces)",
    experience: lang === 'fr' ? "Première mission" : "First mission",
    agency: lang === 'fr' ? "Agence spatiale canadienne (ASC)" : "Canadian Space Agency (CSA)",
    flag: "🇨🇦",
  },
];

const rocketIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const cameraIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const homeIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as React.ReactElement).props.children);
  }
  return "";
}

function filterItems(items: { question: string; answer: string | React.ReactNode }[], query: string) {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      extractText(item.answer).toLowerCase().includes(q)
  );
}

const Index = () => {
  const { language, toggleLanguage } = useLanguage();
  const [search, setSearch] = useState("");

  const filteredBases = useMemo(() => filterItems(language === 'fr' ? basesItems : basesItemsEN, search), [search, language]);
  const filteredVie = useMemo(() => filterItems(language === 'fr' ? vieABordItems : vieABordItemsEN, search), [search, language]);
  const filteredImages = useMemo(() => filterItems(language === 'fr' ? imagesItems : imagesItemsEN, search), [search, language]);
  const filteredDivers = useMemo(() => filterItems(language === 'fr' ? diversItems : diversItemsEN, search), [search, language]);
  const filteredSurvol = useMemo(() => filterItems(language === 'fr' ? survolItems : survolItemsEN, search), [search, language]);
  const filteredLexique = useMemo(() => filterItems(language === 'fr' ? lexiqueItems : lexiqueItemsEN, search), [search, language]);
  
  const isSearching = search.trim().length > 0;
  const crewMembers = getCrewMembers(language);

  const menuItems = useMemo(() => {
    if (language === 'fr') {
      return [
        { label: "Bases", id: "bases" },
        { label: "Survol", id: "survol" },
        { label: "Équipage", id: "equipage" },
        { label: "Vie à bord", id: "vie-a-bord" },
        { label: "Media", id: "images" },
        { label: "Planning", id: "planning" },
        { label: "Lexique", id: "lexique" },
      ];
    }
    return [
      { label: "Basics", id: "bases" },
      { label: "Flyby", id: "survol" },
      { label: "Crew", id: "equipage" },
      { label: "Life", id: "vie-a-bord" },
      { label: "Media", id: "images" },
      { label: "Schedule", id: "planning" },
      { label: "Lexicon", id: "lexique" },
    ];
  }, [language]);

  return (
    <div className="min-h-screen text-foreground relative bg-background">
      <SideNav />

      {/* Language Toggle */}
      <button 
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 bg-background/50 backdrop-blur border border-white/10 px-4 py-2 flex items-center justify-center gap-2 rounded-full text-white font-bold hover:bg-primary/20 hover:text-primary transition-all glow-border uppercase text-xs tracking-widest"
        title={language === 'fr' ? "Switch to English" : "Passer en Français"}
      >
        <Globe size={14} /> {language}
      </button>

      {/* Hero */}
      <header className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <StarfieldBackground />
        <img
          src={heroImage}
          alt="La Lune et la Terre vues depuis l'espace"
          className="absolute inset-0 w-full h-full object-cover opacity-80 animate-zoom-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4">
            {language === 'fr' ? 'NASA · Programme Artemis' : 'NASA · Artemis Program'}
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-gradient-hero mb-4 leading-tight">
            Artemis II
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 font-body leading-relaxed max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Foire aux questions — Tout comprendre sur la première mission habitée vers la Lune depuis 1972' 
              : 'Frequently Asked Questions — Learn everything about the first crewed lunar mission since 1972'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-full text-xs font-bold bg-secondary/80 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-all border border-border/50 uppercase tracking-tighter"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mission Dashboard Live */}
      {!isSearching && <MissionDashboard />}

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        {/* Search */}
        <AnimatedSection>
          <SearchBar value={search} onChange={setSearch} />
        </AnimatedSection>

        {(!isSearching || filteredBases.length > 0) && (
          <AnimatedSection>
            <FAQSection id="bases" title={language === 'fr' ? "Les bases de la mission" : "Mission Basics"} icon={rocketIcon} items={isSearching ? filteredBases : (language === 'fr' ? basesItems : basesItemsEN)} />
          </AnimatedSection>
        )}
        
        {(!isSearching || filteredSurvol.length > 0) && (
          <AnimatedSection>
            <FAQSection 
              id="survol" 
              title={language === 'fr' ? "Le survol de la Lune (6-7 avril)" : "Lunar Flyby (April 6-7)"} 
              icon={<Moon size={20} />} 
              items={isSearching ? filteredSurvol : (language === 'fr' ? survolItems : survolItemsEN)} 
            />
          </AnimatedSection>
        )}

        {/* Orbit Map */}
        {!isSearching && (
          <AnimatedSection className="my-16">
            <div className="bg-glass rounded-xl p-1 glow-border shadow-2xl">
              <div className="px-5 py-4 border-b border-white/5 bg-white/5">
                 <h3 className="text-xl font-heading font-bold text-foreground">{language === 'fr' ? 'Vidéo de la Mission' : 'Mission Video Feed'}</h3>
                 <p className="text-sm text-muted-foreground mt-1">{language === 'fr' ? 'Artemis II — Images officielles de la NASA (Haute Résolution)' : 'Artemis II — Official NASA Feed (High Resolution)'}</p>
              </div>
              <div className="w-full rounded-b-xl overflow-hidden pointer-events-auto bg-black">
                <video 
                  src={videoFile} 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto aspect-video object-cover" 
                />
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* 3D Model */}
        {!isSearching && (
          <AnimatedSection>
            <OrionModel3D />
          </AnimatedSection>
        )}

        {/* Orion Spacecraft - hidden during search */}
        {!isSearching && (
          <AnimatedSection>
            <OrionSpacecraft />
          </AnimatedSection>
        )}

        {/* Crew Section - hidden during search */}
        {!isSearching && (
          <AnimatedSection>
            <section id="equipage" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {language === 'fr' ? "Équipage" : "Crew"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crewMembers.map((member) => (
                  <CrewCard key={member.name} member={member} />
                ))}
              </div>
            </section>
          </AnimatedSection>
        )}

        {(!isSearching || filteredVie.length > 0) && (
          <AnimatedSection>
            <FAQSection id="vie-a-bord" title={language === 'fr' ? "Vie à bord" : "Life Aboard"} icon={homeIcon} items={isSearching ? filteredVie : (language === 'fr' ? vieABordItems : vieABordItemsEN)} />
          </AnimatedSection>
        )}

        {(!isSearching || filteredImages.length > 0) && (
          <AnimatedSection>
            <FAQSection id="images" title={language === 'fr' ? "Images & Son" : "Media"} icon={cameraIcon} items={isSearching ? filteredImages : (language === 'fr' ? imagesItems : imagesItemsEN)} />
          </AnimatedSection>
        )}

        {(!isSearching || filteredDivers.length > 0) && (
          <AnimatedSection>
            <FAQSection id="divers" title={language === 'fr' ? "Divers" : "Miscellaneous"} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} items={isSearching ? filteredDivers : (language === 'fr' ? diversItems : diversItemsEN)} />
          </AnimatedSection>
        )}

        {!isSearching && (
          <AnimatedSection>
            <PlanningSection language={language} />
          </AnimatedSection>
        )}

        {(!isSearching || filteredLexique.length > 0) && (
          <AnimatedSection>
            <FAQSection 
              id="lexique" 
              title={language === 'fr' ? "Lexique" : "Lexicon"} 
              icon={<Book size={20} />} 
              items={isSearching ? filteredLexique : (language === 'fr' ? lexiqueItems : lexiqueItemsEN)} 
            />
          </AnimatedSection>
        )}

        {!isSearching && (
          <AnimatedSection>
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6 font-heading font-bold text-2xl md:text-3xl">
                <Landmark size={24} className="text-primary" />
                <h2>{language === 'fr' ? 'Chronologie Globale' : 'Global Timeline'}</h2>
              </div>
              <MissionTimeline />
            </section>
          </AnimatedSection>
        )}

        {/* No results */}
        {isSearching && filteredBases.length === 0 && filteredVie.length === 0 && filteredImages.length === 0 && filteredDivers.length === 0 && filteredSurvol.length === 0 && filteredLexique.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-secondary/10 rounded-2xl border border-dashed border-white/10">
            <p className="text-lg">{language === 'fr' ? `Aucune question trouvée pour « ${search} »` : `No answers found for "${search}"`}</p>
            <p className="text-sm mt-2">{language === 'fr' ? "Essayez d'autres termes de recherche" : "Try different keywords"}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 text-center text-xs text-muted-foreground px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="font-bold tracking-widest uppercase">NASA · ARTEMIS II FAQ</p>
          <p>{language === 'fr' ? 'FAQ non-officielle · Données issues de sources publiques NASA & Stardust' : 'Unofficial FAQ · Data from NASA and Stardust public sources'}</p>
          <div className="flex justify-center gap-4 text-[10px] uppercase tracking-tighter opacity-50">
            <span>2026 Artemis Mission Guide</span>
            <span>·</span>
            <span>Community Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
