
// Telemetry.tsx
// Artemis II — Mission Control Dashboard

import { useState, useEffect, useCallback, useRef } from "react";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useStaticTelemetry, useLiveTelemetry } from "../hooks/useHorizons";
import {
    getCurrentMET,
    getCurrentPhase,
    MISSION_PHASES,
    PROXY_URL,
    type TelemetryPoint,
} from "../services/HorizonsService";

// ── Recharts defs re-export workaround ──────────────────────
// recharts exports defs/linearGradient/stop as named exports
// but TypeScript may not see them — import via namespace if needed
import * as Recharts from "recharts";
const { defs: RDefs, linearGradient: RLinearGradient, stop: RStop } = Recharts as unknown as {
    defs: React.FC<React.SVGProps<SVGDefsElement>>;
    linearGradient: React.FC<React.SVGProps<SVGLinearGradientElement> & { id: string }>;
    stop: React.FC<React.SVGProps<SVGStopElement>>;
};

// ── Constants ────────────────────────────────────────────────

const MILESTONES = [
    { met: 0, label: "Lancement", labelShort: "T+0", color: "#f59e0b" },
    { met: 7.5, label: "TLI", labelShort: "TLI", color: "#06b6d4" },
    { met: 120.4, label: "Survol lunaire", labelShort: "Flyby", color: "#a855f7" },
    { met: 194.5, label: "RTC-3", labelShort: "RTC-3", color: "#f97316" },
    { met: 212, label: "Rentrée atm.", labelShort: "Rentrée", color: "#ef4444" },
    { met: 216, label: "Amerrissage", labelShort: "Splash", color: "#22c55e" },
];

const ROWS_PER_PAGE = 20;

// ── Utility formatters ───────────────────────────────────────

function fmtKm(km: number): string {
    if (km >= 1_000_000) return `${(km / 1_000_000).toFixed(3)} M km`;
    if (km >= 1_000) return `${(km / 1_000).toFixed(1)}k km`;
    return `${km.toFixed(0)} km`;
}

function fmtKmAxis(value: number): string {
    return `${(value / 1000).toFixed(0)}k`;
}

function fmtUTC(date: Date): string {
    return date.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function fmtMET(metHours: number): string {
    const totalMin = Math.floor(metHours * 60);
    const d = Math.floor(totalMin / 1440);
    const h = Math.floor((totalMin % 1440) / 60);
    const m = totalMin % 60;
    return `T+${d}j ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;
}

function earthColor(km: number): string {
    if (km < 100_000) return "#22c55e";
    if (km < 300_000) return "#f59e0b";
    return "#ef4444";
}

function milestoneStatus(met: number, currentMET: number): "past" | "current" | "future" {
    if (currentMET > met + 6) return "past";
    if (Math.abs(currentMET - met) <= 6) return "current";
    return "future";
}

function statusIcon(s: "past" | "current" | "future"): string {
    if (s === "past") return "✅";
    if (s === "current") return "🔵";
    return "⏳";
}

// ── Custom tooltip ───────────────────────────────────────────

interface TooltipPayload {
    name: string;
    value: number;
    color: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: number;
}

function DistanceTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div className="bg-card/60 backdrop-blur-md border border-border/60 rounded-lg p-3 text-xs shadow-xl">
            <p className="text-muted-foreground mb-1">MET: {fmtMET(label ?? 0)}</p>
            {payload.map((p) => (
                <p key={p.name} style={{ color: p.color }}>
                    {p.name}: {fmtKm(p.value)}
                </p>
            ))}
        </div>
    );
}

function SpeedTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div className="bg-card/60 backdrop-blur-md border border-border/60 rounded-lg p-3 text-xs shadow-xl">
            <p className="text-muted-foreground mb-1">MET: {fmtMET(label ?? 0)}</p>
            {payload.map((p) => (
                <p key={p.name} style={{ color: p.color }}>
                    {p.name}: {typeof p.value === "number" ? p.value.toFixed(3) : p.value}
                </p>
            ))}
        </div>
    );
}

// ── CSV export ───────────────────────────────────────────────

function exportCSV(data: TelemetryPoint[]): void {
    const headers = [
        "datetime", "met_hours", "met_label",
        "x", "y", "z", "vx", "vy", "vz",
        "dist_earth_km", "dist_earth_radii", "dist_moon_km",
        "speed_kms", "speed_kmh",
    ];
    const rows = data.map((p) =>
        [
            p.datetime, p.met_hours.toFixed(4), p.met_label,
            p.x.toFixed(2), p.y.toFixed(2), p.z.toFixed(2),
            p.vx.toFixed(4), p.vy.toFixed(4), p.vz.toFixed(4),
            p.dist_earth_km.toFixed(2), p.dist_earth_radii.toFixed(4), p.dist_moon_km.toFixed(2),
            p.speed_kms.toFixed(4), p.speed_kmh.toFixed(2),
        ].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "artemis2_telemetry.csv";
    a.click();
    URL.revokeObjectURL(url);
}

// ── Tab type ─────────────────────────────────────────────────

type TabId = "distances" | "vitesse" | "trajectoire" | "donnees";

const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: "distances", label: "DISTANCES", icon: "📡" },
    { id: "vitesse", label: "VITESSE", icon: "🚀" },
    { id: "trajectoire", label: "TRAJECTOIRE", icon: "🧭" },
    { id: "donnees", label: "DONNÉES", icon: "📋" },
];

// ── Main component ───────────────────────────────────────────

export default function Telemetry() {
    const [activeTab, setActiveTab] = useState<TabId>("distances");
    const [nowUTC, setNowUTC] = useState(new Date());
    const [metNow, setMetNow] = useState(getCurrentMET());
    const [page, setPage] = useState(0);

    // Tick every second for live clock
    useEffect(() => {
        const id = setInterval(() => {
            setNowUTC(new Date());
            setMetNow(getCurrentMET());
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const { data, currentPoint, missionProgress, isComplete } = useStaticTelemetry();
    const { isLive, isLoading: liveLoading, isError: liveError, lastRefresh, currentLivePoint } =
        useLiveTelemetry();

    // Prefer live point if available
    const displayPoint = currentLivePoint ?? currentPoint;
    const phase = displayPoint ? getCurrentPhase(displayPoint.met_hours) : MISSION_PHASES[0];

    // Pagination
    const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
    const pageData = data.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

    // Stats for speed tab
    const speeds = data.map((p) => p.speed_kms);
    const maxSpeed = Math.max(...speeds);
    const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
    const maxSpeedPoint = data.find((p) => p.speed_kms === maxSpeed);

    // Trajectory data: x vs y
    const trajectoryData = data.map((p) => ({ x: p.x, y: p.y, met: p.met_hours }));

    // Current position for trajectory
    const currentX = displayPoint?.x ?? 0;
    const currentY = displayPoint?.y ?? 0;

    // Moon approximate position (at flyby point)
    const moonX = -320000;
    const moonY = -378000;

    // ── Render ─────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background text-foreground font-mono">

            {}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 backdrop-blur-md border-b border-border/40">
                <div className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                    {/* Back & Logo */}
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/" 
                            className="flex items-center justify-center p-2 rounded-full bg-muted/40 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/30"
                            title="Retour à l'accueil"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] text-2xl font-bold tracking-widest">◈</span>
                            <div>
                                <div className="text-foreground font-bold text-lg tracking-wider">ARTEMIS II</div>
                                <div className="text-muted-foreground text-xs tracking-widest">MISSION CONTROL</div>
                            </div>
                        </div>
                    </div>

                    {/* Clocks */}
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="text-primary text-sm font-light tracking-widest tabular-nums">{fmtUTC(nowUTC)}</div>
                        <div className="text-accent text-xs tabular-nums">
                            MET {fmtMET(metNow)}
                        </div>
                        <div className="text-muted-foreground/80 text-xs">
                            {isComplete ? "Mission terminée" : `Progression: ${(missionProgress * 100).toFixed(1)}%`}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="absolute right-4 top-4 sm:static sm:mb-2">
                            <ThemeToggle />
                        </div>
                        <div className="flex items-center gap-2">
                            {isLive ? (
                                <>
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                                    </span>
                                    <span className="text-destructive text-xs font-bold tracking-widest">EN DIRECT</span>
                                </>
                            ) : (
                                <>
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                    <span className="text-accent text-xs font-bold tracking-widest">STATIQUE</span>
                                </>
                            )}
                        </div>
                        {lastRefresh && (
                            <div className="text-muted-foreground/80 text-xs">
                                Màj: {lastRefresh.toLocaleTimeString("fr-FR")}
                            </div>
                        )}
                        {liveLoading && (
                            <div className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] text-xs animate-pulse">Connexion…</div>
                        )}
                        {liveError && (
                            <div className="text-accent text-xs">Données statiques</div>
                        )}

                    </div>
                </div>

                {/* Mission progress bar */}
                <div className="h-1 bg-muted/50 w-full">
                    <div
                        className="h-1 bg-gradient-to-r from-primary via-accent to-destructive transition-all duration-1000"
                        style={{ width: `${missionProgress * 100}%` }}
                    />
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-4 py-6 space-y-6">

                {}
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Distance Terre */}
                    <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4 space-y-1">
                        <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium">Distance Terre</div>
                        <div
                            className="text-2xl font-bold tabular-nums"
                            style={{ color: earthColor(displayPoint?.dist_earth_km ?? 0) }}
                        >
                            {displayPoint ? fmtKm(displayPoint.dist_earth_km) : "—"}
                        </div>
                        <div className="text-muted-foreground/80 text-xs">
                            {displayPoint ? `${displayPoint.dist_earth_radii.toFixed(1)} R⊕` : ""}
                        </div>
                    </div>

                    {/* Distance Lune */}
                    <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4 space-y-1">
                        <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium">Distance Lune</div>
                        <div className="text-2xl font-bold tabular-nums text-accent">
                            {displayPoint ? fmtKm(displayPoint.dist_moon_km) : "—"}
                        </div>
                        <div className="text-muted-foreground/80 text-xs">
                            {displayPoint && displayPoint.dist_moon_km < 10000
                                ? "🌕 Survol proche!"
                                : ""}
                        </div>
                    </div>

                    {/* Vitesse */}
                    <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4 space-y-1">
                        <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium">Vitesse</div>
                        <div className="text-2xl font-bold tabular-nums text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]">
                            {displayPoint ? `${displayPoint.speed_kms.toFixed(3)} km/s` : "—"}
                        </div>
                        <div className="text-muted-foreground/80 text-xs">
                            {displayPoint ? `${displayPoint.speed_kmh.toFixed(0)} km/h` : ""}
                        </div>
                    </div>

                    {/* Phase */}
                    <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4 space-y-1">
                        <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium">Phase Mission</div>
                        <div className="text-lg font-bold" style={{ color: phase.color }}>
                            {phase.labelFr}
                        </div>
                        <div className="text-muted-foreground/80 text-xs tabular-nums">
                            {displayPoint ? fmtMET(displayPoint.met_hours) : ""}
                        </div>
                    </div>
                </section>

                {}
                <nav className="flex gap-1 bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold tracking-widest transition-all duration-200 ${activeTab === tab.id
                                ? "bg-primary/20 hover:bg-primary/30 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] border border-primary/50"
                                : "text-muted-foreground/80 hover:text-foreground/90 hover:bg-muted/50"
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                {}
                {activeTab === "distances" && (
                    <section className="space-y-6">
                        <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4">
                            <h2 className="text-primary text-sm font-light tracking-widest tracking-widest mb-4 uppercase">
                                Distances Terre & Lune — Mission complète
                            </h2>
                            <ResponsiveContainer width="100%" height={420}>
                                <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="met_hours"
                                        stroke="hsl(var(--muted-foreground))"
                                        tick={{ fill: "#6b7280", fontSize: 11 }}
                                        label={{ value: "MET (heures)", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 11 }}
                                    />
                                    <YAxis
                                        stroke="hsl(var(--muted-foreground))"
                                        tick={{ fill: "#6b7280", fontSize: 11 }}
                                        tickFormatter={fmtKmAxis}
                                        label={{ value: "km", angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 11 }}
                                    />
                                    <Tooltip content={<DistanceTooltip />} />
                                    <Legend
                                        wrapperStyle={{ color: "#9ca3af", fontSize: 12 }}
                                    />

                                    {/* Milestone reference lines */}
                                    {MILESTONES.map((m) => (
                                        <ReferenceLine
                                            key={m.met}
                                            x={m.met}
                                            stroke={m.color}
                                            strokeDasharray="4 4"
                                            strokeOpacity={0.6}
                                            label={{ value: m.labelShort, position: "top", fill: m.color, fontSize: 10 }}
                                        />
                                    ))}

                                    {/* Current time */}
                                    <ReferenceLine
                                        x={metNow}
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        label={{ value: "MAINTENANT", position: "top", fill: "#ef4444", fontSize: 10 }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="dist_earth_km"
                                        name="Dist. Terre (km)"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4, fill: "#06b6d4" }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="dist_moon_km"
                                        name="Dist. Lune (km)"
                                        stroke="hsl(var(--accent))"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4, fill: "#f59e0b" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Milestone cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            {MILESTONES.map((m) => {
                                const status = milestoneStatus(m.met, metNow);
                                return (
                                    <div
                                        key={m.met}
                                        className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-3 space-y-1"
                                        style={{ borderColor: status === "current" ? m.color : undefined }}
                                    >
                                        <div className="text-lg">{statusIcon(status)}</div>
                                        <div className="text-xs font-bold" style={{ color: m.color }}>
                                            {m.label}
                                        </div>
                                        <div className="text-muted-foreground/80 text-xs tabular-nums">
                                            {fmtMET(m.met)}
                                        </div>
                                        <div className="text-muted-foreground/60 text-xs capitalize">{status}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {}
                {activeTab === "vitesse" && (
                    <section className="space-y-6">
                        <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4">
                            <h2 className="text-primary text-sm font-light tracking-widest tracking-widest mb-4 uppercase">
                                Profil de Vitesse — Mission complète
                            </h2>
                            <ResponsiveContainer width="100%" height={420}>
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                    <defs>
                                        <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="speedKmsGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="met_hours"
                                        stroke="hsl(var(--muted-foreground))"
                                        tick={{ fill: "#6b7280", fontSize: 11 }}
                                        label={{ value: "MET (heures)", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 11 }}
                                    />
                                    <YAxis
                                        stroke="hsl(var(--muted-foreground))"
                                        tick={{ fill: "#6b7280", fontSize: 11 }}
                                        tickFormatter={(v: number) => `${v.toFixed(1)}`}
                                        label={{ value: "km/h (÷1000)", angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 10 }}
                                    />
                                    <Tooltip content={<SpeedTooltip />} />
                                    <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />

                                    {/* Milestones */}
                                    {MILESTONES.map((m) => (
                                        <ReferenceLine
                                            key={m.met}
                                            x={m.met}
                                            stroke={m.color}
                                            strokeDasharray="4 4"
                                            strokeOpacity={0.5}
                                            label={{ value: m.labelShort, position: "top", fill: m.color, fontSize: 10 }}
                                        />
                                    ))}

                                    {/* Max speed */}
                                    {maxSpeedPoint && (
                                        <ReferenceLine
                                            x={maxSpeedPoint.met_hours}
                                            stroke="#ef4444"
                                            strokeWidth={2}
                                            label={{ value: `MAX ${maxSpeed.toFixed(2)} km/s`, position: "insideTopRight", fill: "#ef4444", fontSize: 10 }}
                                        />
                                    )}

                                    {/* Current time */}
                                    <ReferenceLine
                                        x={metNow}
                                        stroke="hsl(var(--foreground))"
                                        strokeWidth={1.5}
                                        strokeDasharray="2 2"
                                        label={{ value: "MAINTENANT", position: "top", fill: "#ffffff", fontSize: 10 }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="speed_kmh"
                                        name="Vitesse (km/h)"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        fill="url(#speedGradient)"
                                        dot={false}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="speed_kms"
                                        name="Vitesse (km/s)"
                                        stroke="hsl(var(--accent))"
                                        strokeWidth={1.5}
                                        fill="url(#speedKmsGradient)"
                                        dot={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Speed stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4">
                                <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium mb-1">Vitesse max</div>
                                <div className="text-xl font-bold text-destructive tabular-nums">{maxSpeed.toFixed(3)} km/s</div>
                                <div className="text-muted-foreground/80 text-xs">{maxSpeedPoint ? fmtMET(maxSpeedPoint.met_hours) : ""}</div>
                            </div>
                            <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4">
                                <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium mb-1">Vitesse moy.</div>
                                <div className="text-xl font-bold text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] tabular-nums">{avgSpeed.toFixed(3)} km/s</div>
                                <div className="text-muted-foreground/80 text-xs">{(avgSpeed * 3600).toFixed(0)} km/h</div>
                            </div>
                            <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4">
                                <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium mb-1">Vitesse actuelle</div>
                                <div className="text-xl font-bold text-accent tabular-nums">
                                    {displayPoint ? `${displayPoint.speed_kms.toFixed(3)} km/s` : "—"}
                                </div>
                                <div className="text-muted-foreground/80 text-xs">
                                    {displayPoint ? `${displayPoint.speed_kmh.toFixed(0)} km/h` : ""}
                                </div>
                            </div>
                            <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4">
                                <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium mb-1">Phase actuelle</div>
                                <div className="text-lg font-bold" style={{ color: phase.color }}>{phase.labelFr}</div>
                                <div className="text-muted-foreground/80 text-xs">{phase.label}</div>
                            </div>
                        </div>
                    </section>
                )}

                {}
                {activeTab === "trajectoire" && (
                    <section className="space-y-6">
                        <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-4">
                            <h2 className="text-primary text-sm font-light tracking-widest tracking-widest mb-1 uppercase">
                                Trajectoire Orion — Plan écliptique (X/Y)
                            </h2>
                            <p className="text-muted-foreground/80 text-xs mb-4">
                                Coordonnées géocentriques J2000 · Unité: km · Terre à l'origine (0,0)
                            </p>
                            <ResponsiveContainer width="100%" height={500}>
                                <ScatterChart margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        type="number"
                                        dataKey="x"
                                        name="X"
                                        stroke="hsl(var(--muted-foreground))"
                                        tick={{ fill: "#6b7280", fontSize: 10 }}
                                        tickFormatter={fmtKmAxis}
                                        label={{ value: "X (km)", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 11 }}
                                        domain={["auto", "auto"]}
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="y"
                                        name="Y"
                                        stroke="hsl(var(--muted-foreground))"
                                        tick={{ fill: "#6b7280", fontSize: 10 }}
                                        tickFormatter={fmtKmAxis}
                                        label={{ value: "Y (km)", angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 11 }}
                                        domain={["auto", "auto"]}
                                    />
                                    <Tooltip
                                        cursor={{ strokeDasharray: "3 3" }}
                                        content={({ active, payload }) => {
                                            if (!active || !payload || payload.length === 0) return null;
                                            const d = payload[0]?.payload as { x: number; y: number; met: number };
                                            return (
                                                <div className="bg-card/60 backdrop-blur-md border border-border/60 rounded-lg p-3 text-xs">
                                                    <p className="text-muted-foreground">MET: {fmtMET(d.met)}</p>
                                                    <p className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]">X: {fmtKm(d.x)}</p>
                                                    <p className="text-accent">Y: {fmtKm(d.y)}</p>
                                                </div>
                                            );
                                        }}
                                    />

                                    {/* Orion trajectory */}
                                    <Scatter
                                        name="Trajectoire Orion"
                                        data={trajectoryData}
                                        fill="hsl(var(--primary))"
                                        fillOpacity={0.7}
                                        line={{ stroke: "#06b6d4", strokeWidth: 1.5, strokeOpacity: 0.5 }}
                                        lineType="joint"
                                        shape={(props: Record<string, unknown>) => {
                                            const cx = props.cx as number;
                                            const cy = props.cy as number;
                                            const met = (props.payload as { met: number }).met;
                                            const isCurrent = Math.abs(met - metNow) < 3;
                                            if (isCurrent) {
                                                return (
                                                    <circle
                                                        cx={cx}
                                                        cy={cy}
                                                        r={8}
                                                        fill="hsl(var(--primary))"
                                                        stroke="hsl(var(--foreground))"
                                                        strokeWidth={2}
                                                    />
                                                );
                                            }
                                            return <circle cx={cx} cy={cy} r={2} fill="hsl(var(--primary))" fillOpacity={0.5} />;
                                        }}
                                    />

                                    {/* Earth at origin */}
                                    <Scatter
                                        name="Terre"
                                        data={[{ x: 0, y: 0, met: 0 }]}
                                        fill="#3b82f6"
                                        shape={(props: Record<string, unknown>) => {
                                            const cx = props.cx as number;
                                            const cy = props.cy as number;
                                            return (
                                                <g>
                                                    <circle cx={cx} cy={cy} r={12} fill="#1d4ed8" stroke="#3b82f6" strokeWidth={2} />
                                                    <text x={cx} y={cy - 16} textAnchor="middle" fill="#3b82f6" fontSize={10} fontWeight="bold">
                                                        TERRE
                                                    </text>
                                                </g>
                                            );
                                        }}
                                    />

                                    {/* Moon approximate position */}
                                    <Scatter
                                        name="Lune (survol)"
                                        data={[{ x: moonX, y: moonY, met: 120.4 }]}
                                        fill="hsl(var(--accent))"
                                        shape={(props: Record<string, unknown>) => {
                                            const cx = props.cx as number;
                                            const cy = props.cy as number;
                                            return (
                                                <g>
                                                    <circle cx={cx} cy={cy} r={8} fill="#92400e" stroke="hsl(var(--accent))" strokeWidth={2} />
                                                    <text x={cx} y={cy - 14} textAnchor="middle" fill="hsl(var(--accent))" fontSize={10} fontWeight="bold">
                                                        LUNE
                                                    </text>
                                                </g>
                                            );
                                        }}
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-blue-600 border border-blue-400" />
                                    TERRE (origine)
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-amber-700 border border-amber-400" />
                                    LUNE (pos. survol)
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-primary" />
                                    Trajectoire Orion
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white" />
                                    Position actuelle
                                </div>
                            </div>
                        </div>

                        {/* Current position card */}
                        {displayPoint && (
                            <div className="bg-card/60 backdrop-blur-md border border-primary/50 rounded-xl p-4">
                                <h3 className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] tracking-widest uppercase mb-3">
                                    Position actuelle — Vecteurs d'état
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                    {[
                                        { label: "X", value: `${displayPoint.x.toFixed(1)} km`, color: "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" },
                                        { label: "Y", value: `${displayPoint.y.toFixed(1)} km`, color: "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" },
                                        { label: "Z", value: `${displayPoint.z.toFixed(1)} km`, color: "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" },
                                        { label: "Vx", value: `${displayPoint.vx.toFixed(4)} km/s`, color: "text-accent" },
                                        { label: "Vy", value: `${displayPoint.vy.toFixed(4)} km/s`, color: "text-accent" },
                                        { label: "Vz", value: `${displayPoint.vz.toFixed(4)} km/s`, color: "text-accent" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between border-b border-border/40 pb-1">
                                            <span className="text-muted-foreground/80">{item.label}</span>
                                            <span className={`font-bold tabular-nums ${item.color}`}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {}
                {activeTab === "donnees" && (
                    <section className="space-y-4">

                        {/* Summary stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                {
                                    label: "Dist. Terre max",
                                    value: fmtKm(Math.max(...data.map((p) => p.dist_earth_km))),
                                    color: "text-destructive",
                                },
                                {
                                    label: "Dist. Lune min",
                                    value: fmtKm(Math.min(...data.map((p) => p.dist_moon_km))),
                                    color: "text-accent",
                                },
                                {
                                    label: "Vitesse max",
                                    value: `${maxSpeed.toFixed(3)} km/s`,
                                    color: "text-destructive",
                                },
                                {
                                    label: "Points de données",
                                    value: `${data.length}`,
                                    color: "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]",
                                },
                            ].map((s) => (
                                <div key={s.label} className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl p-3">
                                    <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{s.label}</div>
                                    <div className={`text-lg font-bold tabular-nums ${s.color}`}>{s.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Table controls */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-primary text-sm font-light tracking-widest tracking-widest uppercase">
                                Données Télémétriques
                            </h2>
                            <button
                                onClick={() => exportCSV(data)}
                                className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] hover:bg-primary/20 hover:bg-primary/30 transition-colors rounded-lg px-4 py-2 text-xs font-bold tracking-widest"
                            >
                                ⬇ EXPORTER CSV
                            </button>
                        </div>

                        {/* Table */}
                        <div className="bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-lg hover:bg-card/60 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-border/40 bg-background">
                                            {[
                                                "Datetime", "MET", "Dist. Terre", "Dist. Lune",
                                                "Vitesse", "X", "Y", "Z",
                                            ].map((h) => (
                                                <th
                                                    key={h}
                                                    className="px-3 py-3 text-left text-muted-foreground font-bold tracking-widest uppercase whitespace-nowrap"
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageData.map((pt, idx) => {
                                            const globalIdx = page * ROWS_PER_PAGE + idx;
                                            const isCurrent =
                                                displayPoint !== null &&
                                                Math.abs(pt.met_hours - (displayPoint?.met_hours ?? -999)) < 1;
                                            return (
                                                <tr
                                                    key={pt.datetime}
                                                    className={`border-b border-border/30 transition-colors ${isCurrent
                                                        ? "bg-primary/20 hover:bg-primary/30 border-primary/50"
                                                        : globalIdx % 2 === 0
                                                            ? "bg-card/60 backdrop-blur-md"
                                                            : "bg-muted/30 backdrop-blur-md"
                                                        }`}
                                                >
                                                    <td className="px-3 py-2 text-foreground/90 whitespace-nowrap tabular-nums">
                                                        {isCurrent && (
                                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 animate-pulse" />
                                                        )}
                                                        {pt.datetime}
                                                    </td>
                                                    <td className="px-3 py-2 text-accent whitespace-nowrap tabular-nums">
                                                        {pt.met_label}
                                                    </td>
                                                    <td
                                                        className="px-3 py-2 whitespace-nowrap tabular-nums font-bold"
                                                        style={{ color: earthColor(pt.dist_earth_km) }}
                                                    >
                                                        {fmtKm(pt.dist_earth_km)}
                                                    </td>
                                                    <td className="px-3 py-2 text-accent whitespace-nowrap tabular-nums">
                                                        {fmtKm(pt.dist_moon_km)}
                                                    </td>
                                                    <td className="px-3 py-2 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] whitespace-nowrap tabular-nums">
                                                        {pt.speed_kms.toFixed(3)} km/s
                                                    </td>
                                                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap tabular-nums">
                                                        {pt.x.toFixed(0)}
                                                    </td>
                                                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap tabular-nums">
                                                        {pt.y.toFixed(0)}
                                                    </td>
                                                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap tabular-nums">
                                                        {pt.z.toFixed(0)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                                <span className="text-muted-foreground/80 text-xs">
                                    Page {page + 1} / {totalPages} · {data.length} points total
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                                        disabled={page === 0}
                                        className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-lg text-xs disabled:opacity-30 hover:bg-gray-700 transition-colors"
                                    >
                                        ← Préc.
                                    </button>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const pageNum = Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${pageNum === page
                                                    ? "bg-primary/20 hover:bg-primary/30 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] border border-primary/50"
                                                    : "bg-muted/50 text-muted-foreground hover:bg-gray-700"
                                                    }`}
                                            >
                                                {pageNum + 1}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                        disabled={page >= totalPages - 1}
                                        className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-lg text-xs disabled:opacity-30 hover:bg-gray-700 transition-colors"
                                    >
                                        Suiv. →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {}
                <footer className="border-t border-border/40 pt-6 pb-4 text-center space-y-2">
                    <p className="text-muted-foreground/80 text-xs">
                        Source: NASA/JPL Horizons API · Proxy: Cloudflare Workers · Données toutes les 30 min
                    </p>
                    <p className="text-muted-foreground/60 text-xs">
                        Dernière mise à jour: {fmtUTC(nowUTC)}
                    </p>
                </footer>
            </main>
        </div>
    );
}
