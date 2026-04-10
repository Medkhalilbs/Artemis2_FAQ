import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-space.jpg";
import FAQSection from "@/components/FAQSection";
import CrewCard from "@/components/CrewCard";
import MissionTimeline from "@/components/MissionTimeline";
import SideNav from "@/components/SideNav";
import AnimatedSection from "@/components/AnimatedSection";
import SearchBar from "@/components/SearchBar";
import OrionSpacecraft from "@/components/OrionSpacecraft";
import ApolloArtemisComparison from "@/components/ApolloArtemisComparison";
import OrionModel3D from "@/components/OrionModel3D";
import StarfieldBackground from "@/components/StarfieldBackground";
import MissionDashboard from "@/components/MissionDashboard";
import MomentsCles from "@/components/MomentsCles";
import ResourcesGrid from "@/components/ResourcesGrid";
import ThemeToggle from "@/components/ThemeToggle";
import videoFile from "@/assets/artemis2_full_2160p60.mp4";
import reidPortrait from "@/assets/Reid-Wiseman-in-2026.webp";
import victorPortrait from "@/assets/nasa-astronaut-victor-glover-.webp";
import christinaPortrait from "@/assets/christina-koch.webp";
import jeremyPortrait from "@/assets/jeremy-hansen.webp";
import { Globe, Book, Landmark, Moon, X, Share2, BookOpen } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import CommandPalette from "@/components/CommandPalette";

import { basesItems, vieABordItems, imagesItems, diversItems, survolItems, bouclierItems, retourItems, lexiqueItems } from "@/data/faqData";
import { basesItemsEN, vieABordItemsEN, imagesItemsEN, diversItemsEN, survolItemsEN, bouclierItemsEN, retourItemsEN, lexiqueItemsEN } from "@/data/faqDataEN";

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
    image: reidPortrait,
  },
  {
    name: "Victor Glover",
    role: lang === 'fr' ? "Pilote" : "Pilot",
    birthDate: lang === 'fr' ? "30 avril 1976" : "April 30, 1976",
    age: 49,
    nationality: lang === 'fr' ? "Américain" : "American",
    formation: lang === 'fr' ? "Pilote de chasse (US Navy)" : "Fighter pilot (US Navy)",
    experience: "1 mission (ISS, 2014)", // Strictly following the provided document as requested
    agency: "NASA",
    flag: "🇺🇸",
    image: victorPortrait,
  },
  {
    name: "Christina Hammock Koch",
    role: lang === 'fr' ? "Spécialiste de mission" : "Mission Specialist",
    birthDate: lang === 'fr' ? "29 janvier 1979" : "January 29, 1979",
    age: 47,
    nationality: lang === 'fr' ? "Américaine" : "American",
    formation: lang === 'fr' ? "Ingénieure" : "Engineer",
    experience: lang === 'fr' ? "328 jours à l'ISS (record féminin), 6 sorties extravéhiculaires" : "328 days at ISS (female record), 6 spacewalks",
    agency: "NASA",
    flag: "🇺🇸",
    image: christinaPortrait,
  },
  {
    name: "Jeremy Hansen",
    role: lang === 'fr' ? "Spécialiste de mission" : "Mission Specialist",
    birthDate: lang === 'fr' ? "27 janvier 1976" : "January 27, 1976",
    age: 50,
    nationality: lang === 'fr' ? "Canadien" : "Canadian",
    formation: lang === 'fr' ? "Pilote de chasse (armée de l'air canadienne, CF-18)" : "Fighter pilot (Canadian Air Force, CF-18)",
    experience: lang === 'fr' ? "Première mission" : "First mission",
    agency: lang === 'fr' ? "Agence spatiale canadienne (ASC)" : "Canadian Space Agency (CSA)",
    flag: "🇨🇦",
    image: jeremyPortrait,
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

// Volumetric Background Lighting
const VolumetricLighting = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized percentages based on viewport sizes
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] transition-opacity duration-1000 mix-blend-screen"
      style={{
        background: `radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0) 80%)`
      }}
    />
  );
};

// Deep Space Procedural Noise
const DeepSpaceNoise = () => (
  <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const Index = () => {
  const { language, toggleLanguage } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const crewMembers = getCrewMembers(language);

  return (
    <div className="min-h-screen text-foreground relative bg-background">
      <VolumetricLighting />
      <DeepSpaceNoise />

      {/* Global Command Palette */}
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Animated Scroll Trajectory Line */}
      <motion.div 
        className="fixed top-0 left-0 bottom-0 w-1 bg-primary z-50 shadow-[0_0_15px_rgba(var(--primary),1)] origin-top hidden lg:block"
        style={{ scaleY }}
      />
      
      <SideNav />

      {/* Theme & Language Toggles */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={toggleLanguage}
          className="bg-background/50 backdrop-blur border border-white/10 px-4 py-2 flex items-center justify-center gap-2 rounded-full text-foreground font-bold hover:bg-primary/20 hover:text-primary transition-all glow-border uppercase text-xs tracking-widest"
          title={language === 'fr' ? "Switch to English" : "Passer en Français"}
        >
          <Globe size={14} /> {language}
        </button>
      </div>

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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {(language === 'fr'
              ? ["Les bases", "Vaisseau", "Équipage", "Images", "Moments Clés", "Planning"]
              : ["Basics", "Spacecraft", "Crew", "Media", "Key Moments", "Timeline"]
            ).map((label, i) => {
              const ids = ["bases", "vaisseau", "equipage", "images", "moments-cles", "planning"];
              return (
               <button
                  key={label}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(ids[i])?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-secondary/40 backdrop-blur-md text-secondary-foreground hover:bg-primary/20 hover:text-primary hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 border border-white/10"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mission Dashboard Live */}
      <MissionDashboard />

      {/* Content */}
      <main className="relative max-w-3xl mx-auto px-6 py-16 space-y-20 z-10">
        {/* Search */}
        <AnimatedSection>
          <SearchBar onClick={() => setSearchOpen(true)} />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection id="bases" title={language === 'fr' ? "Les bases de la mission" : "Mission Basics"} icon={rocketIcon} items={language === 'fr' ? basesItems : basesItemsEN} />
        </AnimatedSection>

        <AnimatedSection>
          <ApolloArtemisComparison />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection
            id="survol"
            title={language === 'fr' ? "Le survol de la Lune (6-7 avril)" : "Lunar Flyby (April 6-7)"}
            icon={<Moon size={20} />}
            items={language === 'fr' ? survolItems : survolItemsEN}
          />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection
            id="bouclier"
            title={language === 'fr' ? "Le bouclier anti-radiations (8-9 avril)" : "Radiation Shield (April 8-9)"}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            items={language === 'fr' ? bouclierItems : bouclierItemsEN}
          />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection
            id="retour"
            title={language === 'fr' ? "Retour sur la Terre (10-11 avril)" : "Return to Earth (April 10-11)"}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9 9 9-9M12 3v18" /></svg>}
            items={language === 'fr' ? retourItems : retourItemsEN}
          />
        </AnimatedSection>

        {/* Orbit Map */}
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

        {/* 3D Model */}
        <AnimatedSection>
          <OrionModel3D />
        </AnimatedSection>

        {/* Orion Spacecraft */}
        <AnimatedSection>
          <OrionSpacecraft />
        </AnimatedSection>

        {/* Crew Section */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {crewMembers.map((member) => (
                <CrewCard key={member.name} member={member} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection id="vie-a-bord" title={language === 'fr' ? "Vie à bord" : "Life Aboard"} icon={homeIcon} items={language === 'fr' ? vieABordItems : vieABordItemsEN} />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection id="images" title={language === 'fr' ? "Images & Son" : "Media"} icon={cameraIcon} items={language === 'fr' ? imagesItems : imagesItemsEN} />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection id="divers" title={language === 'fr' ? "Divers" : "Miscellaneous"} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} items={language === 'fr' ? diversItems : diversItemsEN} />
        </AnimatedSection>

        <AnimatedSection>
          <FAQSection
            id="lexique"
            title={language === 'fr' ? "Lexique" : "Lexicon"}
            icon={<Book size={20} />}
            items={language === 'fr' ? lexiqueItems : lexiqueItemsEN}
          />
        </AnimatedSection>

        <AnimatedSection>
          <MomentsCles />
        </AnimatedSection>

        <AnimatedSection>
          <ResourcesGrid />
        </AnimatedSection>

        <AnimatedSection>
          <section id="planning" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 font-heading font-bold text-2xl md:text-3xl">
              <Landmark size={24} className="text-primary" />
              <h2>{language === 'fr' ? 'Chronologie Globale' : 'Global Timeline'}</h2>
            </div>
            <MissionTimeline />
          </section>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 pt-16 pb-10 text-center text-xs text-muted-foreground px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Community Credits */}
          <div className="bg-glass rounded-2xl glow-border p-8 text-left">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <span className="text-xl">❤️</span>
              <h3 className="font-heading font-bold text-foreground text-base uppercase tracking-widest">
                {language === 'fr' ? 'Merci à la communauté Stardust' : 'Thanks to the Stardust Community'}
              </h3>
              <span className="text-xl">❤️</span>
            </div>
            <p className="text-center text-muted-foreground text-[13px] leading-relaxed mb-6 max-w-xl mx-auto">
              {language === 'fr'
                ? 'Ce document a été préparé avec amour par les membres de la communauté Stardust qui ont collecté questions et réponses pour vous.'
                : 'This document was prepared with love by Stardust community members who collected questions and answers for you.'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "M'ellowdy (Jenny)",
                "Wendark",
                "Skøll (RaineyShooter___)",
                "amathieu",
                "Louloup",
                "Heycureuil",
                "Formica",
                "Louane",
                "Pierro_b",
                "Khalil_bin",
                "Pierre-Alexandre",
                "Vicnet de stardust",
                "Loutre",
                "Tid0",
                "L’Ours Bruns",
                "Zoro",
                "Athessis",
                "Vulcain",
                "G-X",
                "Jean-Guilhem",
              ].map((name) => (
                <span
                  key={name}
                  className="inline-block px-3 py-1.5 rounded-full text-[12px] font-medium bg-primary/10 border border-primary/20 text-primary/90 hover:bg-primary/20 hover:scale-105 transition-all duration-200"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="space-y-2">
            <p className="font-bold tracking-widest uppercase">NASA · ARTEMIS II FAQ</p>
            <p>{language === 'fr' ? 'FAQ non-officielle · Données issues de sources publiques NASA & Stardust' : 'Unofficial FAQ · Data from NASA and Stardust public sources'}</p>
            <div className="flex justify-center gap-4 text-[10px] uppercase tracking-tighter opacity-50">
              <span>2026 Artemis Mission Guide</span>
              <span>·</span>
              <span>Community Project</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Index;
