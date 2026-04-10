import { useState, useEffect, useMemo } from "react";

/**
 * Mission waypoints: [missionElapsedHours, distanceFromEarthKm, speedKmH, phase]
 * Based on Artemis 2 trajectory data (free-return lunar flyby).
 * Launch: April 2, 2026 ~18:00 UTC (20:00 Paris)
 * TLI: ~April 3 ~18:00 UTC
 * Closest approach: April 7, ~00:54 Paris → ~22:54 UTC April 6
 * Splashdown: April 11, ~02:06 Paris → ~00:06 UTC April 11
 */
const LAUNCH_UTC = new Date("2026-04-02T02:00:00Z").getTime(); // ✅ séparation ICCS réelle
const EARTH_MOON_KM = 384_400;

interface Waypoint {
  hoursFromLaunch: number;
  distanceKm: number;
  speedKmh: number;
  phase: string;
}
const waypoints: Waypoint[] = [
  { hoursFromLaunch: 0, distanceKm: 7_675, speedKmh: 14_219, phase: "Séparation ICCS 🚀" },
  { hoursFromLaunch: 7.5, distanceKm: 19_637, speedKmh: 27_719, phase: "Injection translunaire (TLI) 🔥" },
  { hoursFromLaunch: 12, distanceKm: 33_000, speedKmh: 18_500, phase: "Transit Terre → Lune" },
  { hoursFromLaunch: 25.4, distanceKm: 55_000, speedKmh: 36_385, phase: "Vitesse maximale ⚡" },
  { hoursFromLaunch: 48, distanceKm: 140_000, speedKmh: 6_552, phase: "Transit Terre → Lune" },
  { hoursFromLaunch: 72, distanceKm: 242_000, speedKmh: 5_292, phase: "Transit Terre → Lune" },
  { hoursFromLaunch: 96, distanceKm: 347_000, speedKmh: 3_600, phase: "Approche sphère lunaire 🌑" },
  { hoursFromLaunch: 110, distanceKm: 393_000, speedKmh: 1_800, phase: "Approche maximale" },
  { hoursFromLaunch: 120.4, distanceKm: 413_140, speedKmh: 1_489, phase: "Distance max · Survol Lune 🌕" },
  { hoursFromLaunch: 130, distanceKm: 388_000, speedKmh: 2_500, phase: "Retour vers la Terre 🌍" },
  { hoursFromLaunch: 150, distanceKm: 320_000, speedKmh: 3_800, phase: "Transit Lune → Terre" },
  { hoursFromLaunch: 170, distanceKm: 240_000, speedKmh: 5_200, phase: "Transit Lune → Terre" },
  { hoursFromLaunch: 190, distanceKm: 150_000, speedKmh: 7_800, phase: "Transit Lune → Terre" },
  { hoursFromLaunch: 194.5, distanceKm: 120_000, speedKmh: 9_200, phase: "Burn de retour RTC-3 🔥" },
  { hoursFromLaunch: 205, distanceKm: 50_000, speedKmh: 22_000, phase: "Approche terrestre" },
  { hoursFromLaunch: 212, distanceKm: 15_000, speedKmh: 36_000, phase: "Rentrée atmosphérique 🔥" },
  { hoursFromLaunch: 214, distanceKm: 400, speedKmh: 2_000, phase: "Sous parachutes 🪂" },
  { hoursFromLaunch: 215.0, distanceKm: 0, speedKmh: 30, phase: "Amerrissage ! 🌊" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getPositionAtTime(now: number) {
  const hoursElapsed = (now - LAUNCH_UTC) / (1000 * 60 * 60);

  if (hoursElapsed < 0) {
    return {
      distanceKm: 0,
      speedKmh: 0,
      phase: "Avant le lancement",
      hoursElapsed,
      progress: 0,
      missionActive: false,
      beforeLaunch: true,
      afterSplash: false,
    };
  }

  const lastWp = waypoints[waypoints.length - 1];
  if (hoursElapsed >= lastWp.hoursFromLaunch) {
    return {
      distanceKm: 0,
      speedKmh: 0,
      phase: "Mission terminée ✅",
      hoursElapsed,
      progress: 0,
      missionActive: false,
      beforeLaunch: false,
      afterSplash: true,
    };
  }

  // Find surrounding waypoints
  let i = 0;
  while (i < waypoints.length - 1 && waypoints[i + 1].hoursFromLaunch <= hoursElapsed) {
    i++;
  }

  const wp1 = waypoints[i];
  const wp2 = waypoints[Math.min(i + 1, waypoints.length - 1)];
  const segDuration = wp2.hoursFromLaunch - wp1.hoursFromLaunch;
  const t = segDuration > 0 ? (hoursElapsed - wp1.hoursFromLaunch) / segDuration : 0;

  const distanceKm = Math.round(lerp(wp1.distanceKm, wp2.distanceKm, t));
  const speedKmh = Math.round(lerp(wp1.speedKmh, wp2.speedKmh, t));
  const phase = t > 0.5 ? wp2.phase : wp1.phase;

  // Progress as fraction of max distance for visual
  const maxDist = 413_140;  // ✅ valeur réelle JPL
  const progress = Math.min(distanceKm / maxDist, 1);

  return {
    distanceKm,
    speedKmh,
    phase,
    hoursElapsed,
    progress,
    missionActive: true,
    beforeLaunch: false,
    afterSplash: false,
  };
}

function formatCountdown(ms: number) {
  const totalSec = Math.abs(Math.floor(ms / 1000));
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}j`);
  parts.push(`${String(h).padStart(2, "0")}h`);
  parts.push(`${String(m).padStart(2, "0")}m`);
  parts.push(`${String(s).padStart(2, "0")}s`);
  return parts.join(" ");
}

function formatNumber(n: number) {
  return n.toLocaleString("fr-FR");
}

const MissionTracker = () => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const data = useMemo(() => getPositionAtTime(now), [now]);
  const countdown = LAUNCH_UTC - now;

  // Visual positions on the track
  const trackProgress = data.missionActive
    ? data.progress
    : data.beforeLaunch
      ? 0
      : 0;

  return (
    <section id="tracker" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Position en temps réel
        </h2>
      </div>

      <div className="bg-glass rounded-xl glow-border overflow-hidden">
        {/* Status bar */}
        <div className="px-5 py-3 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${data.missionActive ? "bg-green-500 animate-pulse" : data.beforeLaunch ? "bg-yellow-500 animate-pulse" : "bg-muted-foreground"}`} />
            <span className="text-sm font-medium text-foreground">{data.phase}</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {data.beforeLaunch
              ? `T- ${formatCountdown(countdown)}`
              : data.missionActive
                ? `T+ ${formatCountdown(data.hoursElapsed * 3600 * 1000)}`
                : "Mission complétée"}
          </span>
        </div>

        {/* Visual track */}
        <div className="px-5 py-8">
          <div className="relative">
            {/* Track line */}
            <div className="relative h-1 bg-secondary/50 rounded-full mx-8">
              {/* Progress fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${trackProgress * 100}%`,
                  background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.4))",
                }}
              />

              {/* Halfway marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-border/50 rounded-full" />

              {/* Orion capsule indicator */}
              {data.missionActive && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
                  style={{ left: `${trackProgress * 100}%`, transform: `translateX(-50%) translateY(-50%)` }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 border-2 border-primary-foreground" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/50 animate-ping" />
                  </div>
                </div>
              )}
            </div>

            {/* Earth */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "radial-gradient(circle at 30% 30%, #4488ff, #1144aa, #0a2266)", boxShadow: "0 0 15px rgba(68,136,255,0.4)" }}>
                🌍
              </div>
              <span className="text-[10px] text-muted-foreground font-medium mt-1">Terre</span>
            </div>

            {/* Moon */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xl"
                style={{ background: "radial-gradient(circle at 35% 35%, #e8e8e0, #aaa89a, #888880)", boxShadow: "0 0 10px rgba(200,200,180,0.3)" }}>
                🌑
              </div>
              <span className="text-[10px] text-muted-foreground font-medium mt-1">Lune</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20">
          <StatBox
            label="Distance de la Terre"
            value={data.missionActive ? `${formatNumber(data.distanceKm)} km` : "—"}
            sub={data.missionActive ? `${formatNumber(Math.round(data.distanceKm * 0.621371))} miles` : ""}
          />
          <StatBox
            label="Vitesse"
            value={data.missionActive ? `${formatNumber(data.speedKmh)} km/h` : "—"}
            sub={data.missionActive ? `${formatNumber(Math.round(data.speedKmh / 3.6))} m/s` : ""}
          />
          <StatBox
            label="Distance de la Lune"
            value={data.missionActive ? `${formatNumber(Math.max(0, EARTH_MOON_KM - data.distanceKm))} km` : "—"}
            sub=""
          />
          <StatBox
            label="Progression"
            value={data.missionActive ? `${Math.round(data.progress * 100)}%` : data.afterSplash ? "100%" : "0%"}
            sub={data.missionActive ? `du trajet aller` : ""}
          />
        </div>

        {/* Disclaimer */}
        <div className="px-5 py-3 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground/60 text-center">
            ⚠️ Positions approximatives basées sur la trajectoire théorique. Les données réelles peuvent varier selon les corrections de trajectoire effectuées par la NASA.
          </p>
        </div>
      </div>
    </section>
  );
};

function StatBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-background/30 p-4 text-center">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1">{label}</p>
      <p className="text-lg md:text-xl font-heading font-bold text-foreground tabular-nums">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground/50 mt-0.5">{sub}</p>}
    </div>
  );
}

export default MissionTracker;
