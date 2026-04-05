const parts = [
  {
    name: "Module d'équipage (Crew Module)",
    description: "Capsule pressurisée de 9 m³ habitables (20 m³ total) abritant les 4 astronautes. Contient les systèmes de contrôle, les écrans, les sièges, le système de survie (oxygène, CO₂, température), et le WC spatial. Conçue pour résister à la rentrée atmosphérique à plus de 40 000 km/h.",
    manufacturer: "Lockheed Martin",
    country: "États-Unis 🇺🇸",
    icon: "🛡️",
  },
  {
    name: "Bouclier thermique (Heat Shield)",
    description: "Le plus grand bouclier thermique jamais construit (5 mètres de diamètre). Composé d'AVCOAT, un matériau ablatif qui se consume progressivement pour dissiper la chaleur (jusqu'à 2 760°C) lors de la rentrée atmosphérique. Protège l'équipage des températures extrêmes.",
    manufacturer: "Lockheed Martin",
    country: "États-Unis 🇺🇸",
    icon: "🔥",
  },
  {
    name: "Module de service européen (ESM)",
    description: "Fournit la propulsion principale (moteur OMS-E de la navette spatiale réutilisé), l'électricité via 4 panneaux solaires (11 kW), le stockage d'eau, d'oxygène et d'azote, ainsi que le contrôle thermique. Il est largué juste avant la rentrée atmosphérique.",
    manufacturer: "Airbus Defence and Space",
    country: "Europe 🇪🇺 (assemblé à Brême, Allemagne 🇩🇪)",
    icon: "⚡",
  },
  {
    name: "Panneaux solaires (Solar Array Wings)",
    description: "4 ailes déployables de 7 mètres chacune, fournissant 11,1 kW d'électricité. Ils portent également des caméras GoPro modifiées à leurs extrémités pour filmer le vaisseau de l'extérieur. Leur légère vibration explique le tremblement visible sur les images du live.",
    manufacturer: "Airbus Defence and Space",
    country: "Europe 🇪🇺 (Pays-Bas 🇳🇱)",
    icon: "☀️",
  },
  {
    name: "Moteur principal OMS-E",
    description: "Moteur Orbital Maneuvering System recyclé du programme de la navette spatiale. Produit 26,7 kN de poussée. Utilisé pour les corrections de trajectoire majeures (burns OTC et RTC). Alimenté par des ergols stockables (MMH/MON-3).",
    manufacturer: "Aerojet Rocketdyne",
    country: "États-Unis 🇺🇸",
    icon: "🔧",
  },
  {
    name: "Système de communication laser O2O",
    description: "Orion Artemis II Optical Communications System. Transmet des vidéos 4K à un débit de 260 Mbps via un faisceau laser infrarouge pointé vers des stations au sol. Première utilisation opérationnelle de la communication laser pour un vol habité en espace lointain.",
    manufacturer: "MIT Lincoln Laboratory / NASA",
    country: "États-Unis 🇺🇸",
    icon: "📡",
  },
  {
    name: "Système d'abandon au lancement (LAS)",
    description: "Tour de sauvetage de 13 mètres montée au sommet de la capsule pendant le décollage. En cas d'urgence dans les premières minutes du vol, ses moteurs-fusées éjectent le module d'équipage loin de la fusée en quelques secondes. Larguée après avoir atteint une altitude sûre.",
    manufacturer: "Lockheed Martin / Northrop Grumman",
    country: "États-Unis 🇺🇸",
    icon: "🚨",
  },
  {
    name: "Parachutes de récupération",
    description: "Système de 11 parachutes au total : 2 mortar-deployed drogue chutes pour stabiliser la capsule, puis 3 parachutes principaux de 35 mètres de diamètre chacun. Ils ralentissent la capsule de 480 km/h à environ 30 km/h pour l'amerrissage.",
    manufacturer: "Airborne Systems",
    country: "États-Unis 🇺🇸",
    icon: "🪂",
  },
  {
    name: "Adaptateur de module d'équipage (CMA)",
    description: "Structure qui connecte le module d'équipage au module de service européen. Contient de l'électronique de puissance, les contrôleurs de réaction (petits propulseurs) et le système de séparation pyrotechnique utilisé juste avant la rentrée atmosphérique.",
    manufacturer: "Lockheed Martin",
    country: "États-Unis 🇺🇸",
    icon: "🔗",
  },
  {
    name: "Lanceur SLS (Space Launch System)",
    description: "La fusée qui propulse Orion vers la Lune. Hauteur : 98 mètres. Poussée au décollage : 39 500 kN (la plus puissante fusée en service). Composée d'un étage central avec 4 moteurs RS-25 et de 2 boosters à poudre latéraux. Capable d'envoyer 27 tonnes vers la Lune.",
    manufacturer: "Boeing (étage central) / Northrop Grumman (boosters)",
    country: "États-Unis 🇺🇸",
    icon: "🚀",
  },
  {
    name: "Étage supérieur cryogénique (ICPS)",
    description: "Interim Cryogenic Propulsion Stage. Propulsé par un moteur RL-10, il fournit la poussée finale pour envoyer Orion sur sa trajectoire lunaire (TLI — Trans-Lunar Injection). Largué après la mise sur trajectoire lunaire.",
    manufacturer: "United Launch Alliance (ULA)",
    country: "États-Unis 🇺🇸",
    icon: "❄️",
  },
];

const OrionSpacecraft = () => {
  return (
    <section id="vaisseau" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Le vaisseau Orion
        </h2>
      </div>

      <p className="text-muted-foreground mb-6 text-[14px] leading-relaxed">
        Le vaisseau spatial Orion est une collaboration internationale. Voici ses principaux composants, les entreprises qui les fabriquent, et leurs pays d'origine.
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
                  <strong className="text-foreground/70">Fabricant :</strong>{" "}
                  {part.manufacturer}
                </span>
                <span>
                  <strong className="text-foreground/70">Pays :</strong>{" "}
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
