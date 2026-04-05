import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

// User-provided real NASA metrics as anchor
const ANCHOR_TIMESTAMP = new Date("2026-04-05T23:14:14+01:00").getTime();
const ANCHOR_ELAPSED_SEC = 3 * 86400 + 23 * 60 + 38; // 3 days, 23 min, 38 sec
const ANCHOR_VELOCITY_MPH = 1502;
const ANCHOR_DISTANCE_EARTH = 223687;
const ANCHOR_DISTANCE_MOON = 52887;

function formatNumber(num: number): string {
  return new Intl.NumberFormat("fr-FR").format(Math.floor(num));
}

const MissionDashboard = () => {
  const { language } = useLanguage();
  const [now, setNow] = useState(Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 100); 
    return () => clearInterval(interval);
  }, []);

  const deltaSecs = (now - ANCHOR_TIMESTAMP) / 1000;
  
  // Current elapsed time
  const totalElapsedSecs = ANCHOR_ELAPSED_SEC + deltaSecs;

  // Velocity is around 1502 mph. That's about 0.4172 miles per second.
  const velocityMps = ANCHOR_VELOCITY_MPH / 3600;
  
  // Real-time extrapolated distances
  const distanceEarth = ANCHOR_DISTANCE_EARTH + (deltaSecs * velocityMps);
  const distanceMoon = ANCHOR_DISTANCE_MOON - (deltaSecs * velocityMps);

  // Formatting Elapsed Time
  const days = Math.floor(totalElapsedSecs / 86400);
  const hours = Math.floor((totalElapsedSecs % 86400) / 3600);
  const minutes = Math.floor((totalElapsedSecs % 3600) / 60);
  const seconds = Math.floor(totalElapsedSecs % 60);
  
  const missionTimeStr = `T+ ${days}${language === 'fr' ? 'j' : 'd'} ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;

  // Convert to Metric (EU) scale if French
  const velocityDisp = language === 'fr' ? ANCHOR_VELOCITY_MPH * 1.60934 : ANCHOR_VELOCITY_MPH;
  const distanceEarthDisp = language === 'fr' ? distanceEarth * 1.60934 : distanceEarth;
  const distanceMoonDisp = language === 'fr' ? distanceMoon * 1.60934 : distanceMoon;

  // Progress bar based loosely on total distance (in miles or km, ratio is same)
  const totalDistance = distanceEarth + distanceMoon;
  const progress = distanceEarth / totalDistance;

  return (
    <AnimatedSection className="max-w-4xl mx-auto px-6 -mt-10 relative z-20" delay={200}>
      <div className="bg-glass rounded-xl p-6 glow-border backdrop-blur-2xl">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <h2 className="font-heading font-bold uppercase tracking-wider text-sm text-primary">
              {language === 'fr' ? 'Télémétrie en direct (NASA Real Time)' : 'Live Telemetry (NASA Real Time)'}
            </h2>
          </div>
          <span className="font-mono text-sm tracking-widest text-foreground bg-primary/10 px-3 py-1 rounded">
            {missionTimeStr}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs uppercase tracking-widest">{language === 'fr' ? 'Vitesse' : 'Velocity'}</p>
            <p className="text-3xl font-heading font-bold text-foreground">
              {formatNumber(velocityDisp)} <span className="text-lg text-muted-foreground">{language === 'fr' ? 'km/h' : 'mph'}</span>
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs uppercase tracking-widest">{language === 'fr' ? 'Distance de la Terre' : 'Distance from Earth'}</p>
            <p className="text-3xl font-heading font-bold text-foreground">
              {formatNumber(distanceEarthDisp)} <span className="text-lg text-muted-foreground">{language === 'fr' ? 'km' : 'miles'}</span>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground text-xs uppercase tracking-widest">{language === 'fr' ? 'Distance de la Lune' : 'Distance to Moon'}</p>
            <p className="text-3xl font-heading font-bold text-foreground">
              {formatNumber(distanceMoonDisp)} <span className="text-lg text-muted-foreground">{language === 'fr' ? 'km' : 'miles'}</span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{language === 'fr' ? 'Terre' : 'Earth'}</span>
            <span>Orion</span>
            <span>{language === 'fr' ? 'Lune' : 'Moon'}</span>
          </div>
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-100 linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
            {language === 'fr' 
              ? <>Ces valeurs sont une estimation mathématique basée sur des points de repère NASA.{" "}<br className="hidden sm:block" /> Pour la télémétrie exacte certifiée en temps réel, consultez la plateforme officielle :{" "}</>
              : <>These values are mathematical estimations based on NASA raw data points.{" "}<br className="hidden sm:block" /> For exact certified real-time telemetry, check the official platform:{" "}</>
            }
            <a 
              href="https://www.nasa.gov/missions/artemis-ii/arow" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline hover:text-primary/80 transition-colors inline-block mt-1"
            >
              nasa.gov/missions/artemis-ii/arow
            </a>
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default MissionDashboard;
