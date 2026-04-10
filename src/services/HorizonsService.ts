// ============================================================
// HorizonsService.ts
// Artemis II — Data fetching and interpolations
// ============================================================

export interface TelemetryPoint {
    datetime: string;
    met_hours: number;
    met_label: string;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    dist_earth_km: number;
    dist_earth_radii: number;
    dist_moon_km: number;
    speed_kms: number;
    speed_kmh: number;
}

export interface MissionPhase {
    labelFr: string;
    label: string;
    color: string;
    startMet: number;
    endMet: number;
}

export const MISSION_PHASES: MissionPhase[] = [
    { labelFr: "Pré-Lancement", label: "Pre-Launch", color: "#6b7280", startMet: -Infinity, endMet: 0 },
    { labelFr: "Orbite Terrestre", label: "Earth Orbit", color: "#3b82f6", startMet: 0, endMet: 7.5 },
    { labelFr: "TLI & Transit Stellaire", label: "TLI & Outbound", color: "#a855f7", startMet: 7.5, endMet: 120.4 },
    { labelFr: "Survol Lunaire", label: "Lunar Flyby", color: "#f59e0b", startMet: 120.4, endMet: 130 },
    { labelFr: "Retour Terrestre", label: "Return Coast", color: "#06b6d4", startMet: 130, endMet: 212 },
    { labelFr: "Rentrée Atmosphérique", label: "Reentry", color: "#ef4444", startMet: 212, endMet: 216 },
    { labelFr: "Amerrissage & Récupération", label: "Splashdown", color: "#22c55e", startMet: 216, endMet: Infinity }
];

export const PROXY_URL = "https://artemis-worker.medkhalilbs.workers.dev/";

const LAUNCH_DATE = new Date("2026-04-01T22:35:00Z").getTime();

export function getCurrentMET(): number {
    const now = new Date().getTime();
    const elapsedMs = now - LAUNCH_DATE;
    const met = elapsedMs / (1000 * 60 * 60);
    return Math.max(0, met);
}

export function getCurrentPhase(met: number): MissionPhase {
    const found = MISSION_PHASES.find((p) => met >= p.startMet && met < p.endMet);
    return found || MISSION_PHASES[MISSION_PHASES.length - 1];
}

export function interpolateNow(data: TelemetryPoint[]): TelemetryPoint {
    const met = getCurrentMET();
    if (data.length === 0) throw new Error("No telemetry data");

    if (met <= data[0].met_hours) return data[0];
    if (met >= data[data.length - 1].met_hours) return data[data.length - 1];

    let p1 = data[0];
    let p2 = data[1];

    for (let i = 0; i < data.length - 1; i++) {
        if (met >= data[i].met_hours && met <= data[i + 1].met_hours) {
            p1 = data[i];
            p2 = data[i + 1];
            break;
        }
    }

    const t = (met - p1.met_hours) / (p2.met_hours - p1.met_hours || 1);

    const lerp = (v1: number, v2: number) => v1 + (v2 - v1) * t;

    return {
        datetime: new Date().toISOString(),
        met_hours: met,
        met_label: `T+${Math.floor(met)}h`,
        x: lerp(p1.x, p2.x),
        y: lerp(p1.y, p2.y),
        z: lerp(p1.z, p2.z),
        vx: lerp(p1.vx, p2.vx),
        vy: lerp(p1.vy, p2.vy),
        vz: lerp(p1.vz, p2.vz),
        dist_earth_km: lerp(p1.dist_earth_km, p2.dist_earth_km),
        dist_earth_radii: lerp(p1.dist_earth_radii, p2.dist_earth_radii),
        dist_moon_km: lerp(p1.dist_moon_km, p2.dist_moon_km),
        speed_kms: lerp(p1.speed_kms, p2.speed_kms),
        speed_kmh: lerp(p1.speed_kmh, p2.speed_kmh),
    };
}

export async function fetchLiveWindow(): Promise<TelemetryPoint[]> {
    const now = new Date();
    // Fetch a 48-hour window surrounding current time
    const start = new Date(now.getTime() - 24 * 3600 * 1000);
    const end = new Date(now.getTime() + 24 * 3600 * 1000);

    const fmtDate = (d: Date) => d.toISOString().replace(/T.*/, '');

    // COMMAND='301' (Moon) used as proxy for Artemis flight path demonstration
    const params = new URLSearchParams({
        format: 'json',
        COMMAND: "'301'",
        OBJ_DATA: "'NO'",
        MAKE_EPHEM: "'YES'",
        EPHEM_TYPE: "'VECTOR'",
        CENTER: "'500@399'",
        START_TIME: `'${fmtDate(start)}'`,
        STOP_TIME: `'${fmtDate(end)}'`,
        STEP_SIZE: "'1 h'",
        CSV_FORMAT: "'YES'"
    });

    const response = await fetch(`${PROXY_URL}?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch live telemetry from proxy");
    
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    
    const lines = json.result.split(/\r?\n/);
    const startIdx = lines.findIndex((l: string) => l.includes('$$SOE'));
    const endIdx = lines.findIndex((l: string) => l.includes('$$EOE'));
    
    if (startIdx === -1 || endIdx === -1) throw new Error("No ephemeris data found in response");

    const moonX = -320000;
    const moonY = -378000;
    const points: TelemetryPoint[] = [];

    for (let i = startIdx + 1; i < endIdx; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',').map((s: string) => s.trim());
        if (parts.length < 8) continue;
        
        // JDTDB, Calendar Date (TDB), X, Y, Z, VX, VY, VZ, LT, RG, RR
        const dateStr = parts[1].replace('A.D. ', '').replace(' TDB', ''); 
        
        const x = parseFloat(parts[2]);
        const y = parseFloat(parts[3]);
        const z = parseFloat(parts[4]);
        const vx = parseFloat(parts[5]);
        const vy = parseFloat(parts[6]);
        const vz = parseFloat(parts[7]);
        
        const dist_earth_km = parseFloat(parts[9]);
        const dist_earth_radii = dist_earth_km / 6378.14;
        
        const speed_kms = Math.sqrt(vx*vx + vy*vy + vz*vz);
        const speed_kmh = speed_kms * 3600;
        
        const dist_moon_km = Math.sqrt(Math.pow(x - moonX, 2) + Math.pow(y - moonY, 2) + Math.pow(z, 2));

        const dateObj = new Date(dateStr);
        const met_hours = (dateObj.getTime() - LAUNCH_DATE) / (1000 * 60 * 60);

        points.push({
            datetime: dateStr,
            met_hours: Math.max(0, met_hours),
            met_label: `T+${Math.floor(Math.max(0, met_hours))}h`,
            x, y, z, vx, vy, vz,
            dist_earth_km, dist_earth_radii, dist_moon_km,
            speed_kms, speed_kmh
        });
    }

    if (points.length === 0) throw new Error("No valid telemetry points parsed");
    return points;
}
