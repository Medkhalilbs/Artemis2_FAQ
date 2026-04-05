import { useLanguage } from "@/contexts/LanguageContext";

const getParts = (lang: string) => [
  {
    name: lang === 'fr' ? "Module d'équipage (Crew Module)" : "Crew Module",
    description: lang === 'fr' 
      ? "Capsule pressurisée de 9 m³ habitables (20 m³ total) abritant les 4 astronautes. Contient les systèmes de contrôle, les écrans, les sièges, le système de survie (oxygène, CO₂, température), et le WC spatial. Conçue pour résister à la rentrée atmosphérique à plus de 40 000 km/h."
      : "Pressurized capsule with 9 m³ habitable volume (20 m³ total) housing the 4 astronauts. Contains control systems, displays, seats, life support (oxygen, CO₂, temp), and the space toilet. Designed to withstand atmospheric reentry at over 40,000 km/h.",
    manufacturer: "Lockheed Martin",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "🛡️",
  },
  {
    name: lang === 'fr' ? "Bouclier thermique (Heat Shield)" : "Heat Shield",
    description: lang === 'fr'
      ? "Le plus grand bouclier thermique jamais construit (5 mètres de diamètre). Composé d'AVCOAT, un matériau ablatif qui se consume progressivement pour dissiper la chaleur (jusqu'à 2 760°C) lors de la rentrée atmosphérique. Protège l'équipage des températures extrêmes."
      : "The largest heat shield ever built (5 meters in diameter). Made of AVCOAT, an ablative material that burns away gradually to dissipate heat (up to 2,760°C) during atmospheric reentry. Protects the crew from extreme temperatures.",
    manufacturer: "Lockheed Martin",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "🔥",
  },
  {
    name: lang === 'fr' ? "Module de service européen (ESM)" : "European Service Module (ESM)",
    description: lang === 'fr'
      ? "Fournit la propulsion principale (moteur OMS-E de la navette spatiale réutilisé), l'électricité via 4 panneaux solaires (11 kW), le stockage d'eau, d'oxygène et d'azote, ainsi que le contrôle thermique. Il est largué juste avant la rentrée atmosphérique."
      : "Provides main propulsion (repurposed Space Shuttle OMS-E engine), electricity via 4 solar arrays (11 kW), storage for water, oxygen, and nitrogen, as well as thermal control. It is jettisoned just before atmospheric reentry.",
    manufacturer: "Airbus Defence and Space",
    country: lang === 'fr' ? "Europe 🇪🇺 (assemblé à Brême, Allemagne 🇩🇪)" : "Europe 🇪🇺 (assembled in Bremen, Germany 🇩🇪)",
    icon: "⚡",
  },
  {
    name: lang === 'fr' ? "Panneaux solaires (Solar Array Wings)" : "Solar Array Wings",
    description: lang === 'fr'
      ? "4 ailes déployables de 7 mètres chacune, fournissant 11,1 kW d'électricité. Ils portent également des caméras GoPro modifiées à leurs extrémités pour filmer le vaisseau de l'extérieur. Leur légère vibration explique le tremblement visible sur les images du live."
      : "4 deployable wings of 7 meters each, providing 11.1 kW of electricity. They also carry modified GoPro cameras at their tips to film the spacecraft from the outside. Their slight vibration explains the shaking visible on the live feed.",
    manufacturer: "Airbus Defence and Space",
    country: lang === 'fr' ? "Europe 🇪🇺 (Pays-Bas 🇳🇱)" : "Europe 🇪🇺 (Netherlands 🇳🇱)",
    icon: "☀️",
  },
  {
    name: lang === 'fr' ? "Moteur principal OMS-E" : "OMS-E Main Engine",
    description: lang === 'fr'
      ? "Moteur Orbital Maneuvering System recyclé du programme de la navette spatiale. Produit 26,7 kN de poussée. Utilisé pour les corrections de trajectoire majeures (burns OTC et RTC). Alimenté par des ergols stockables (MMH/MON-3)."
      : "Recycled Orbital Maneuvering System engine from the Space Shuttle program. Produces 26.7 kN of thrust. Used for major trajectory corrections (OTC and RTC burns). Powered by storable propellants (MMH/MON-3).",
    manufacturer: "Aerojet Rocketdyne",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "🔧",
  },
  {
    name: lang === 'fr' ? "Système de communication laser O2O" : "O2O Laser Communication System",
    description: lang === 'fr'
      ? "Orion Artemis II Optical Communications System. Transmet des vidéos 4K à un débit de 260 Mbps via un faisceau laser infrarouge pointé vers des stations au sol. Première utilisation opérationnelle de la communication laser pour un vol habité en espace lointain."
      : "Orion Artemis II Optical Communications System. Transmits 4K videos at 260 Mbps via an infrared laser beam pointed at ground stations. First operational use of laser comms for a crewed deep space flight.",
    manufacturer: "MIT Lincoln Laboratory / NASA",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "📡",
  },
  {
    name: lang === 'fr' ? "Système d'abandon au lancement (LAS)" : "Launch Abort System (LAS)",
    description: lang === 'fr'
      ? "Tour de sauvetage de 13 mètres montée au sommet de la capsule pendant le décollage. En cas d'urgence dans les premières minutes du vol, ses moteurs-fusées éjectent le module d'équipage loin de la fusée en quelques secondes. Larguée après avoir atteint une altitude sûre."
      : "13-meter escape tower mounted on top of the capsule during launch. In an emergency in the first minutes of flight, its rocket motors eject the crew module away from the rocket in seconds. Jettisoned after reaching a safe altitude.",
    manufacturer: "Lockheed Martin / Northrop Grumman",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "🚨",
  },
  {
    name: lang === 'fr' ? "Parachutes de récupération" : "Recovery Parachutes",
    description: lang === 'fr'
      ? "Système de 11 parachutes au total : 2 mortar-deployed drogue chutes pour stabiliser la capsule, puis 3 parachutes principaux de 35 mètres de diamètre chacun. Ils ralentissent la capsule de 480 km/h à environ 30 km/h pour l'amerrissage."
      : "System of 11 parachutes in total: 2 mortar-deployed drogue chutes to stabilize the capsule, then 3 main parachutes of 35 meters in diameter each. They slow the capsule from 480 km/h to about 30 km/h for splashdown.",
    manufacturer: "Airborne Systems",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "🪂",
  },
  {
    name: lang === 'fr' ? "Adaptateur de module d'équipage (CMA)" : "Crew Module Adapter (CMA)",
    description: lang === 'fr'
      ? "Structure qui connecte le module d'équipage au module de service européen. Contient de l'électronique de puissance, les contrôleurs de réaction (petits propulseurs) et le système de séparation pyrotechnique utilisé juste avant la rentrée atmosphérique."
      : "Structure connecting the crew module to the European service module. Contains power electronics, reaction controllers (small thrusters), and the pyrotechnic separation system used right before atmospheric reentry.",
    manufacturer: "Lockheed Martin",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "🔗",
  },
  {
    name: lang === 'fr' ? "Lanceur SLS (Space Launch System)" : "SLS Rocket",
    description: lang === 'fr'
      ? "La fusée qui propulse Orion vers la Lune. Hauteur : 98 mètres. Poussée au décollage : 39 500 kN (la plus puissante fusée en service). Composée d'un étage central avec 4 moteurs RS-25 et de 2 boosters à poudre latéraux. Capable d'envoyer 27 tonnes vers la Lune."
      : "The rocket that propels Orion to the Moon. Height: 98 meters. Liftoff thrust: 39,500 kN (the most powerful rocket in service). Composed of a core stage with 4 RS-25 engines and 2 solid rocket boosters. Capable of sending 27 tons to the Moon.",
    manufacturer: "Boeing / Northrop Grumman",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "🚀",
  },
  {
    name: lang === 'fr' ? "Étage supérieur cryogénique (ICPS)" : "Interim Cryogenic Propulsion Stage (ICPS)",
    description: lang === 'fr'
      ? "Interim Cryogenic Propulsion Stage. Propulsé par un moteur RL-10, il fournit la poussée finale pour envoyer Orion sur sa trajectoire lunaire (TLI — Trans-Lunar Injection). Largué après la mise sur trajectoire lunaire."
      : "Interim Cryogenic Propulsion Stage. Powered by an RL-10 engine, it provides the final thrust to send Orion on its lunar trajectory (TLI — Trans-Lunar Injection). Jettisoned after insertion.",
    manufacturer: "United Launch Alliance (ULA)",
    country: lang === 'fr' ? "États-Unis 🇺🇸" : "United States 🇺🇸",
    icon: "❄️",
  },
];

const OrionSpacecraft = () => {
  const { language } = useLanguage();
  const parts = getParts(language);
  return (
    <section id="vaisseau" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {language === 'fr' ? "Le vaisseau Orion" : "Orion Spacecraft"}
        </h2>
      </div>

      <p className="text-muted-foreground mb-6 text-[14px] leading-relaxed">
        {language === 'fr'
          ? "Le vaisseau spatial Orion est une collaboration internationale. Voici ses principaux composants, les entreprises qui les fabriquent, et leurs pays d'origine."
          : "The Orion spacecraft is an international collaboration. Here are its main components, the companies that manufacture them, and their countries of origin."}
      </p>

      <div className="space-y-3">
        {parts.map((part, index) => (
          <details
            key={index}
            className="group bg-glass rounded-lg glow-border overflow-hidden"
          >
            <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none text-foreground font-medium hover:text-primary transition-colors text-[15px] leading-relaxed">
              <span className="text-lg shrink-0">{part.icon}</span>
              <span className="flex-1">{part.name}</span>
              <svg
                className="w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 space-y-3 text-[14px] text-muted-foreground leading-relaxed">
              <p>{part.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
                <span>
                  <strong className="text-foreground/70">{language === 'fr' ? 'Fabricant :' : 'Manufacturer:'}</strong>{" "}
                  {part.manufacturer}
                </span>
                <span>
                  <strong className="text-foreground/70">{language === 'fr' ? 'Pays :' : 'Country:'}</strong>{" "}
                  {part.country}
                </span>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default OrionSpacecraft;
