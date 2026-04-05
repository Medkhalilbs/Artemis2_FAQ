interface TimelineDay {
  date: string;
  events: { time: string; label: string; highlight?: boolean }[];
}

const timelineData: TimelineDay[] = [
  {
    date: "4 Avril 2026",
    events: [
      { time: "00:32", label: "OTC-1 BURN" },
      { time: "02:44", label: "NASA PAO EVENT (SAW CAMERA \"SELFIE\")" },
      { time: "05:00", label: "LUNAR FLYBY CABIN CONFIGURATION" },
      { time: "06:59", label: "CSA PAO EVENT" },
      { time: "09:54", label: "Fin de journée des astronautes 🌙" },
      { time: "18:24", label: "Réveil des astronautes ☀️" },
      { time: "20:49", label: "NASA PAO EVENT" },
      { time: "22:34", label: "NASA PAO EVENT" },
      { time: "23:15", label: "MISSION STATUS BRIEFING" },
    ],
  },
  {
    date: "5 Avril 2026",
    events: [
      { time: "01:32", label: "OTC-2 BURN" },
      { time: "02:59", label: "MANUAL PILOTING FLIGHT TEST" },
      { time: "03:29", label: "LUNAR IMAGING REVIEW" },
      { time: "06:14", label: "CSA VIP Call" },
      { time: "09:09", label: "Fin de journée des astronautes 🌙" },
      { time: "17:39", label: "Réveil des astronautes ☀️" },
      { time: "20:09", label: "OCSS SUIT FLIGHT TEST" },
      { time: "21:30", label: "MISSION STATUS BRIEFING" },
    ],
  },
  {
    date: "6 Avril 2026",
    events: [
      { time: "04:53", label: "OTC-3 BURN" },
      { time: "06:30", label: "INTEGRITY ENTRE DANS LA SPHÈRE D'INFLUENCE LUNAIRE", highlight: true },
      { time: "08:09", label: "Fin de journée des astronautes 🌙" },
      { time: "16:39", label: "Réveil des astronautes ☀️" },
      { time: "19:45", label: "DÉPASSE LE RECORD DE DISTANCE D'APOLLO 13", highlight: true },
      { time: "20:04", label: "CONFIGURATION CABINE POUR SURVOL" },
      { time: "20:34", label: "DÉBUT OBSERVATION LUNAIRE (SURVOL)", highlight: true },
    ],
  },
  {
    date: "7 Avril 2026",
    events: [
      { time: "00:36", label: "PERTE DE COMMUNICATION (DERRIÈRE LA LUNE)", highlight: true },
      { time: "00:54", label: "APPROCHE MINIMALE DE LA LUNE 🌕", highlight: true },
      { time: "00:58", label: "DISTANCE MAXIMALE DE LA TERRE", highlight: true },
      { time: "01:16", label: "ACQUISITION DU SIGNAL" },
      { time: "01:24", label: "VUES INTÉRIEURES DE L'ÉQUIPAGE" },
      { time: "03:30", label: "FIN DE L'OBSERVATION LUNAIRE" },
      { time: "07:54", label: "Fin de journée des astronautes 🌙" },
      { time: "17:24", label: "Réveil des astronautes ☀️" },
      { time: "19:17", label: "SORTIE DE LA SPHÈRE LUNAIRE", highlight: true },
      { time: "20:29", label: "APPEL ISS SHIP-TO-SHIP" },
      { time: "21:19", label: "DÉBUT PÉRIODE DE REPOS" },
    ],
  },
  {
    date: "8 Avril 2026",
    events: [
      { time: "04:39", label: "NASA PAO EVENT" },
      { time: "08:54", label: "Fin de journée des astronautes 🌙" },
      { time: "17:24", label: "Réveil des astronautes ☀️" },
      { time: "21:30", label: "MISSION STATUS BRIEFING" },
      { time: "23:09", label: "CSA PAO EVENT" },
    ],
  },
  {
    date: "9 Avril 2026",
    events: [
      { time: "00:04", label: "DÉMONSTRATION BLINDAGE RADIATION" },
      { time: "02:44", label: "MANUAL PILOTING FLIGHT TEST" },
      { time: "08:54", label: "Fin de journée des astronautes 🌙" },
      { time: "17:24", label: "Réveil des astronautes ☀️" },
      { time: "21:30", label: "MISSION STATUS BRIEFING" },
      { time: "23:59", label: "CONFÉRENCE DE PRESSE ÉQUIPAGE" },
    ],
  },
  {
    date: "10 Avril 2026",
    events: [
      { time: "01:54", label: "NASA PAO EVENT" },
      { time: "04:53", label: "RTC-2 BURN" },
      { time: "08:54", label: "Fin de journée des astronautes 🌙" },
      { time: "17:24", label: "Réveil des astronautes ☀️" },
      { time: "19:39", label: "CONFIGURATION CABINE POUR RENTRÉE" },
      { time: "20:53", label: "RTC-3 BURN" },
      { time: "22:54", label: "CHECKLIST DE RENTRÉE" },
    ],
  },
  {
    date: "11 Avril 2026",
    events: [
      { time: "01:33", label: "SÉPARATION MODULE ÉQUIPAGE / SERVICE" },
      { time: "01:53", label: "INTERFACE DE RENTRÉE", highlight: true },
      { time: "02:06", label: "AMERRISSAGE 🎉", highlight: true },
      { time: "03:05", label: "EXTRACTION DE L'ÉQUIPAGE" },
      { time: "03:35", label: "ÉQUIPAGE SUR LE NAVIRE DE RÉCUPÉRATION" },
      { time: "04:35", label: "CONFÉRENCE DE PRESSE POST-AMERRISSAGE" },
    ],
  },
];

const MissionTimeline = () => {
  return (
    <section id="planning" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Planning de mission
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Horaires en heure de France métropolitaine. Pour le Québec, retirez 6 heures.
        Les horaires peuvent varier.
      </p>
      <div className="space-y-6">
        {timelineData.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-glass rounded-lg glow-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border/50 bg-primary/5">
              <h3 className="font-heading font-semibold text-foreground">{day.date}</h3>
            </div>
            <div className="p-4 space-y-2">
              {day.events.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`flex items-start gap-3 py-1.5 px-2 rounded text-sm ${
                    event.highlight ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  <span className="font-mono text-xs mt-0.5 min-w-[45px] text-foreground/60">
                    {event.time}
                  </span>
                  <span className="leading-snug">{event.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionTimeline;
