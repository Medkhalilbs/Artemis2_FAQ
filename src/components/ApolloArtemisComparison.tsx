import { useLanguage } from "@/contexts/LanguageContext";

const rows_fr = [
  { aspect: "Époque", apollo: "1969 – 1972", artemis: "2026 (Artemis II)" },
  { aspect: "Programme", apollo: "Guerre froide / Course à la Lune", artemis: "Retour durable & Porte lunaire" },
  { aspect: "Fusée", apollo: "Saturn V (110 m)", artemis: "SLS Block 1 (98 m)" },
  { aspect: "Vaisseau", apollo: "Apollo Command/Service Module", artemis: "Orion MPCV" },
  { aspect: "Équipage", apollo: "3 hommes (tous Américains)", artemis: "4 personnes (mixte : femme + Canadien)" },
  { aspect: "Objectif", apollo: "Alunissage puis retour", artemis: "Survol habité + préparation Artemis III" },
  { aspect: "Alunissage", apollo: "Oui (Apollo 11–17)", artemis: "Non — orbite libre & survol" },
  { aspect: "Distance Lune", apollo: "~384 400 km", artemis: "~370 000 km (survol à ~6 000 km)" },
  { aspect: "Durée", apollo: "~8–12 jours", artemis: "~10 jours" },
  { aspect: "Ordinateurs", apollo: "64 Ko RAM (AGC ~ 4 MHz)", artemis: "Avioniques modernes & IA embarquée" },
  { aspect: "Combinaisons", apollo: "A7L (pressurisé, câblé)", artemis: "Axiom AxEMU (modulaire, flexible)" },
  { aspect: "Transmission", apollo: "Radio analogique UHF/S-Band", artemis: "Laser optique + réseau Deep Space" },
  { aspect: "Retour sur Terre", apollo: "Splash atlantique / pacifique", artemis: "Retour capsule Orion (Pacifique)" },
];

const rows_en = [
  { aspect: "Era", apollo: "1969 – 1972", artemis: "2026 (Artemis II)" },
  { aspect: "Program goal", apollo: "Cold War / Moon Race", artemis: "Sustainable return & Lunar Gateway" },
  { aspect: "Rocket", apollo: "Saturn V (110 m)", artemis: "SLS Block 1 (98 m)" },
  { aspect: "Spacecraft", apollo: "Apollo Command/Service Module", artemis: "Orion MPCV" },
  { aspect: "Crew", apollo: "3 men (all American)", artemis: "4 persons (mixed: woman + Canadian)" },
  { aspect: "Objective", apollo: "Moon landing then return", artemis: "Crewed flyby + prep for Artemis III" },
  { aspect: "Moon landing", apollo: "Yes (Apollo 11–17)", artemis: "No — free-return trajectory & flyby" },
  { aspect: "Moon distance", apollo: "~384,400 km", artemis: "~370,000 km (flyby at ~6,000 km)" },
  { aspect: "Duration", apollo: "~8–12 days", artemis: "~10 days" },
  { aspect: "Computers", apollo: "64 KB RAM (AGC ~4 MHz)", artemis: "Modern avionics & onboard AI" },
  { aspect: "Suits", apollo: "A7L (pressurised, wired)", artemis: "Axiom AxEMU (modular, flexible)" },
  { aspect: "Comms", apollo: "Analog UHF/S-Band radio", artemis: "Optical laser + Deep Space Network" },
  { aspect: "Earth return", apollo: "Splashdown Atlantic / Pacific", artemis: "Orion capsule splashdown (Pacific)" },
];

const ApolloArtemisComparison = () => {
  const { language } = useLanguage();
  const rows = language === "fr" ? rows_fr : rows_en;

  return (
    <section className="scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {language === "fr" ? "Apollo vs Artemis" : "Apollo vs Artemis"}
        </h2>
      </div>

      {/* Summary blurb */}
      <div className="mb-6 p-5 rounded-xl bg-primary/5 border border-primary/15 text-[14px] text-foreground/75 leading-relaxed">
        {language === "fr" ? (
          <>
            <span className="font-bold text-primary">Apollo</span> a posé les bases de l'exploration lunaire dans un contexte de Guerre froide, avec des moyens colossaux et une ambition unique : marcher sur la Lune.{" "}
            <span className="font-bold text-primary">Artemis II</span> n'est pas un retour nostalgique, mais une étape d'une vision bien plus grande : établir une présence humaine durable dans l'espace cislunaire, préparer un alunissage (Artemis III) et ouvrir la voie vers Mars.
          </>
        ) : (
          <>
            <span className="font-bold text-primary">Apollo</span> laid the foundation for lunar exploration during the Cold War, driven by geopolitical ambition and a singular goal: land on the Moon.{" "}
            <span className="font-bold text-primary">Artemis II</span> is not a nostalgic replay — it is a stepping stone in a much grander vision: establishing sustainable human presence in cislunar space, paving the way for a Moon landing (Artemis III), and ultimately reaching Mars.
          </>
        )}
      </div>

      {/* Comparison Table */}
      <div className="bg-glass rounded-2xl glow-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left py-3 px-4 text-[10px] uppercase tracking-widest text-foreground/40 font-bold w-1/4">
                  {language === "fr" ? "Aspect" : "Aspect"}
                </th>
                <th className="text-left py-3 px-4 text-[10px] uppercase tracking-widest font-bold w-[37.5%]">
                  <span className="text-amber-400/80">🚀 Apollo</span>
                </th>
                <th className="text-left py-3 px-4 text-[10px] uppercase tracking-widest font-bold w-[37.5%]">
                  <span className="text-primary">🌕 Artemis II</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.aspect}
                  className={`border-b border-white/5 transition-colors hover:bg-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    }`}
                >
                  <td className="py-3 px-4 text-[11px] uppercase tracking-wider text-foreground/35 font-bold align-top">
                    {row.aspect}
                  </td>
                  <td className="py-3 px-4 text-foreground/65 leading-snug align-top">
                    {row.apollo}
                  </td>
                  <td className="py-3 px-4 text-primary/80 leading-snug align-top font-medium">
                    {row.artemis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Caption */}
      <p className="mt-3 text-center text-[11px] text-foreground/30 tracking-wide">
        {language === "fr"
          ? "Sources : NASA, ESA, Agence Spatiale Canadienne"
          : "Sources: NASA, ESA, Canadian Space Agency"}
      </p>
    </section>
  );
};

export default ApolloArtemisComparison;
