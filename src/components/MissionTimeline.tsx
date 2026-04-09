import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineDay {
  date: string;
  events: { time: string; label: string; highlight?: boolean }[];
}

const getTimelineData = (lang: string): TimelineDay[] => [
  {
    date: lang === 'fr' ? "4 Avril 2026" : "April 4, 2026",
    events: [
      { time: "00:32", label: "OTC-1 BURN" },
      { time: "02:44", label: "NASA PAO EVENT (SAW CAMERA \"SELFIE\")" },
      { time: "05:00", label: "LUNAR FLYBY CABIN CONFIGURATION" },
      { time: "06:59", label: "CSA PAO EVENT" },
      { time: "09:54", label: lang === 'fr' ? "Fin de journée des astronautes 🌙" : "Crew sleep period begins 🌙" },
      { time: "18:24", label: lang === 'fr' ? "Réveil des astronautes ☀️" : "Crew wake up ☀️" },
      { time: "20:49", label: "NASA PAO EVENT" },
      { time: "22:34", label: "NASA PAO EVENT" },
      { time: "23:15", label: "MISSION STATUS BRIEFING" },
    ],
  },
  {
    date: lang === 'fr' ? "5 Avril 2026" : "April 5, 2026",
    events: [
      { time: "01:32", label: "OTC-2 BURN" },
      { time: "02:59", label: "MANUAL PILOTING FLIGHT TEST" },
      { time: "03:29", label: "LUNAR IMAGING REVIEW" },
      { time: "06:14", label: "CSA VIP Call" },
      { time: "09:09", label: lang === 'fr' ? "Fin de journée des astronautes 🌙" : "Crew sleep period begins 🌙" },
      { time: "17:39", label: lang === 'fr' ? "Réveil des astronautes ☀️" : "Crew wake up ☀️" },
      { time: "20:09", label: "OCSS SUIT FLIGHT TEST" },
      { time: "21:30", label: "MISSION STATUS BRIEFING" },
    ],
  },
  {
    date: lang === 'fr' ? "6 Avril 2026" : "April 6, 2026",
    events: [
      { time: "04:53", label: "OTC-3 BURN" },
      { time: "06:30", label: lang === 'fr' ? "INTEGRITY ENTRE DANS LA SPHÈRE D'INFLUENCE LUNAIRE" : "INTEGRITY ENTERS LUNAR SPHERE OF INFLUENCE", highlight: true },
      { time: "08:09", label: lang === 'fr' ? "Fin de journée des astronautes 🌙" : "Crew sleep period begins 🌙" },
      { time: "16:39", label: lang === 'fr' ? "Réveil des astronautes ☀️" : "Crew wake up ☀️" },
      { time: "19:45", label: lang === 'fr' ? "DÉPASSE LE RECORD DE DISTANCE D'APOLLO 13" : "BREAKS APOLLO 13 DISTANCE RECORD", highlight: true },
      { time: "19:59", label: lang === 'fr' ? "L'ÉQUIPAGE RECONNAÎT LE RECORD DE DISTANCE (AUDIO)" : "CREW ACKNOWLEDGES DISTANCE RECORD (AUDIO)" },
      { time: "20:04", label: lang === 'fr' ? "CONFIGURATION CABINE POUR SURVOL" : "FLYBY CABIN CONFIGURATION" },
      { time: "20:34", label: lang === 'fr' ? "DÉBUT OBSERVATION LUNAIRE (SURVOL)" : "LUNAR OBSERVATION BEGINS (FLYBY)", highlight: true },
    ],
  },
  {
    date: lang === 'fr' ? "7 Avril 2026" : "April 7, 2026",
    events: [
      { time: "00:36", label: lang === 'fr' ? "PERTE DE COMMUNICATION PLANIFIÉE (DERRIÈRE LA LUNE)" : "PLANNED LOSS OF COMMUNICATION (BEHIND MOON)", highlight: true },
      { time: "00:54", label: lang === 'fr' ? "APPROCHE MINIMALE DE LA LUNE (6 500 km) 🌕" : "CLOSEST APPROACH OVER THE MOON (6,500 km) 🌕", highlight: true },
      { time: "00:58", label: lang === 'fr' ? "DISTANCE MAXIMALE DE LA TERRE (406 771 km)" : "MAXIMUM DISTANCE FROM EARTH (406,771 km)", highlight: true },
      { time: "01:16", label: lang === 'fr' ? "ACQUISITION DU SIGNAL PRÉVUE" : "PLANNED SIGNAL ACQUISITION" },
      { time: "01:24", label: lang === 'fr' ? "VUES INTÉRIEURES DE L'ÉQUIPAGE" : "CREW INTERIOR VIEWS" },
      { time: "03:30", label: lang === 'fr' ? "FIN DE L'OBSERVATION LUNAIRE" : "LUNAR OBSERVATION ENDS" },
      { time: "07:54", label: lang === 'fr' ? "Fin de journée des astronautes 🌙" : "Crew sleep period begins 🌙" },
      { time: "17:24", label: lang === 'fr' ? "Réveil des astronautes ☀️" : "Crew wake up ☀️" },
      { time: "19:17", label: lang === 'fr' ? "SORTIE DE LA SPHÈRE LUNAIRE" : "EXIT LUNAR SPHERE", highlight: true },
      { time: "20:29", label: "APPEL ISS SHIP-TO-SHIP" },
      { time: "20:49", label: lang === 'fr' ? "DÉBRIEFING DE L'ÉQUIPAGE APRÈS SURVOL" : "CREW POST-FLYBY DEBRIEF" },
      { time: "21:19", label: lang === 'fr' ? "DÉBUT PÉRIODE DE REPOS" : "REST PERIOD BEGINS" },
    ],
  },
  {
    date: lang === 'fr' ? "8 Avril 2026" : "April 8, 2026",
    events: [
      { time: "04:39", label: "NASA PAO EVENT" },
      { time: "08:54", label: lang === 'fr' ? "Fin de journée des astronautes 🌙" : "Crew sleep period begins 🌙" },
      { time: "17:24", label: lang === 'fr' ? "Réveil des astronautes ☀️" : "Crew wake up ☀️" },
      { time: "21:30", label: "MISSION STATUS BRIEFING" },
      { time: "23:09", label: "CSA PAO EVENT" },
    ],
  },
  {
    date: lang === 'fr' ? "9 Avril 2026" : "April 9, 2026",
    events: [
      { time: "00:04", label: lang === 'fr' ? "DÉMONSTRATION BLINDAGE RADIATION" : "RADIATION SHIELD DEMONSTRATION" },
      { time: "02:44", label: "MANUAL PILOTING FLIGHT TEST" },
      { time: "08:54", label: lang === 'fr' ? "Fin de journée des astronautes 🌙" : "Crew sleep period begins 🌙" },
      { time: "17:24", label: lang === 'fr' ? "Réveil des astronautes ☀️" : "Crew wake up ☀️" },
      { time: "21:30", label: "MISSION STATUS BRIEFING" },
      { time: "23:59", label: lang === 'fr' ? "CONFÉRENCE DE PRESSE ÉQUIPAGE" : "CREW NEWS CONFERENCE" },
    ],
  },
  {
    date: lang === 'fr' ? "10 Avril 2026" : "April 10, 2026",
    events: [
      { time: "01:54", label: "NASA PAO EVENT" },
      { time: "04:53", label: "RTC-2 BURN" },
      { time: "08:54", label: lang === 'fr' ? "Fin de journée des astronautes 🌙" : "Crew sleep period begins 🌙" },
      { time: "17:24", label: lang === 'fr' ? "Réveil des astronautes ☀️" : "Crew wake up ☀️" },
      { time: "19:39", label: lang === 'fr' ? "CONFIGURATION CABINE POUR RENTRÉE" : "REENTRY CABIN CONFIGURATION" },
      { time: "20:53", label: "RTC-3 BURN" },
      { time: "21:09", label: lang === 'fr' ? "CONTINUATION CONFIG. CABINE POUR RENTRÉE" : "CONTINUE CABIN CONFIGURATION FOR REENTRY" },
      { time: "22:54", label: lang === 'fr' ? "CHECKLIST DE RENTRÉE" : "REENTRY CHECKLIST" },
    ],
  },
  {
    date: lang === 'fr' ? "11 Avril 2026" : "April 11, 2026",
    events: [
      { time: "01:33", label: lang === 'fr' ? "SÉPARATION MODULE ÉQUIPAGE / SERVICE" : "CREW/SERVICE MODULE SEPARATION" },
      { time: "01:36", label: lang === 'fr' ? "MANŒUVRE D'ÉLÉVATION DU MODULE DE COMMANDE" : "CREW MODULE RAISE BURN" },
      { time: "01:53", label: lang === 'fr' ? "INTERFACE DE RENTRÉE" : "ENTRY INTERFACE", highlight: true },
      { time: "02:06", label: lang === 'fr' ? "AMERRISSAGE 🎉" : "SPLASHDOWN 🎉", highlight: true },
      { time: "02:21", label: lang === 'fr' ? "COUPURE DE L'ALIMENTATION (VARIABLE)" : "POWER DOWN (TIME VARIES)" },
      { time: "03:05", label: lang === 'fr' ? "EXTRACTION DE L'ÉQUIPAGE" : "CREW EXTRACTION" },
      { time: "03:35", label: lang === 'fr' ? "ÉQUIPAGE SUR LE NAVIRE DE RÉCUPÉRATION" : "CREW ON RECOVERY SHIP" },
      { time: "04:35", label: lang === 'fr' ? "CONFÉRENCE DE PRESSE POST-AMERRISSAGE" : "POST-SPLASHDOWN NEWS CONFERENCE" },
    ],
  },
];

const MissionTimeline = () => {
  const { language } = useLanguage();
  const timelineData = getTimelineData(language);

  return (
    <section id="planning" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {language === 'fr' ? "Planning de mission" : "Mission Timeline"}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {language === 'fr' 
          ? "Horaires en heure de France métropolitaine. Pour le Québec, retirez 6 heures. Les horaires peuvent varier."
          : "Times shown in Central European Time (CET). For EDT, subtract 6 hours. Times are subject to change."}
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
