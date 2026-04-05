import { useState, useMemo } from "react";
import heroImage from "@/assets/hero-space.jpg";
import FAQSection from "@/components/FAQSection";
import CrewCard from "@/components/CrewCard";
import MissionTimeline from "@/components/MissionTimeline";
import SideNav from "@/components/SideNav";
import AnimatedSection from "@/components/AnimatedSection";
import SearchBar from "@/components/SearchBar";
import OrionSpacecraft from "@/components/OrionSpacecraft";
import OrionModel3D from "@/components/OrionModel3D";

import { basesItems, vieABordItems, imagesItems, diversItems } from "@/data/faqData";

const crewMembers = [
  {
    name: "Reid Wiseman",
    role: "Commandant",
    birthDate: "11 novembre 1975",
    age: 50,
    nationality: "Américain",
    formation: "Ingénieur, pilote d'essais (F-35, F-18, US Navy)",
    experience: "1 mission (ISS, 2014)",
    agency: "NASA",
    flag: "🇺🇸",
  },
  {
    name: "Victor Glover",
    role: "Pilote",
    birthDate: "30 avril 1976",
    age: 49,
    nationality: "Américain",
    formation: "Pilote de chasse (US Navy)",
    experience: "1 mission (Crew-1, 2020)",
    agency: "NASA",
    flag: "🇺🇸",
  },
  {
    name: "Christina Koch",
    role: "Spécialiste de mission",
    birthDate: "29 janvier 1979",
    age: 47,
    nationality: "Américaine",
    formation: "Ingénieure",
    experience: "328 jours ISS (record féminin), 6 EVA",
    agency: "NASA",
    flag: "🇺🇸",
  },
  {
    name: "Jeremy Hansen",
    role: "Spécialiste de mission",
    birthDate: "27 janvier 1976",
    age: 50,
    nationality: "Canadien",
    formation: "Pilote de chasse (CF-18, armée canadienne)",
    experience: "Première mission",
    agency: "Agence spatiale canadienne (ASC)",
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
  const [search, setSearch] = useState("");

  const filteredBases = useMemo(() => filterItems(basesItems, search), [search]);
  const filteredVie = useMemo(() => filterItems(vieABordItems, search), [search]);
  const filteredImages = useMemo(() => filterItems(imagesItems, search), [search]);
  const filteredDivers = useMemo(() => filterItems(diversItems, search), [search]);
  const isSearching = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <SideNav />

      {/* Hero */}
      <header className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="La Lune et la Terre vues depuis l'espace"
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-zoom-pan"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4">
            NASA · Programme Artemis
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-gradient-hero mb-4 leading-tight">
            Artemis II
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 font-body leading-relaxed">
            Foire aux questions — Tout comprendre sur la première mission habitée vers la Lune depuis 1972
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Les bases", "Modèle 3D", "Vaisseau", "Équipage", "Vie à bord", "Images", "Divers", "Planning"].map((label, i) => {
              const ids = ["bases", "modele-3d", "vaisseau", "equipage", "vie-a-bord", "images", "divers", "planning"];
              return (
                <a
                  key={label}
                  href={`#${ids[i]}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-secondary/60 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors border border-border/50"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        {/* Search */}
        <AnimatedSection>
          <SearchBar value={search} onChange={setSearch} />
        </AnimatedSection>


        {(!isSearching || filteredBases.length > 0) && (
          <AnimatedSection>
            <FAQSection id="bases" title="Les bases de la mission" icon={rocketIcon} items={isSearching ? filteredBases : basesItems} />
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
                  Équipage
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
            <FAQSection id="vie-a-bord" title="Vie à bord" icon={homeIcon} items={isSearching ? filteredVie : vieABordItems} />
          </AnimatedSection>
        )}

        {(!isSearching || filteredImages.length > 0) && (
          <AnimatedSection>
            <FAQSection id="images" title="Images & Son" icon={cameraIcon} items={isSearching ? filteredImages : imagesItems} />
          </AnimatedSection>
        )}

        {(!isSearching || filteredDivers.length > 0) && (
          <AnimatedSection>
            <FAQSection id="divers" title="Divers" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} items={isSearching ? filteredDivers : diversItems} />
          </AnimatedSection>
        )}

        {!isSearching && (
          <AnimatedSection>
            <MissionTimeline />
          </AnimatedSection>
        )}

        {/* No results */}
        {isSearching && filteredBases.length === 0 && filteredVie.length === 0 && filteredImages.length === 0 && filteredDivers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Aucune question trouvée pour « {search} »</p>
            <p className="text-sm mt-2">Essayez d'autres termes de recherche</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        <p>FAQ non-officielle · Données issues de sources publiques NASA & Stardust</p>
      </footer>
    </div>
  );
};

export default Index;
