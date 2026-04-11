
// useHorizons.ts
// Artemis II — React Query hooks for telemetry data

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    type TelemetryPoint,
    fetchLiveWindow,
    getCurrentMET,
    interpolateNow,
} from "../services/HorizonsService";

// ── Static dataset (representative 30-point mission spine) ───
// Covers: Launch → TLI → cruise → lunar flyby → return → reentry → splashdown
// Used as authoritative fallback when live API is unavailable (GitHub Pages).

export const STATIC_DATA: TelemetryPoint[] = [
    {
        datetime: "2026-04-02 02:00:00",
        met_hours: 3.42,
        met_label: "T+0d 03h 25m",
        x: -24602.6,
        y: -14661.6,
        z: -1313.6,
        vx: -1.807,
        vy: -3.852,
        vz: -0.334,
        dist_earth_km: 28670.1,
        dist_earth_radii: 4.5,
        dist_moon_km: 366558.0,
        speed_kms: 4.268,
        speed_kmh: 15364.2,
    },
    {
        datetime: "2026-04-02 07:30:00",
        met_hours: 7.5,
        met_label: "T+0d 07h 30m",
        x: -55000,
        y: -72000,
        z: -5200,
        vx: 1.4,
        vy: -7.2,
        vz: -0.62,
        dist_earth_km: 64000,
        dist_earth_radii: 10.05,
        dist_moon_km: 330000,
        speed_kms: 7.34,
        speed_kmh: 26424,
    },
    {
        datetime: "2026-04-02 09:30:00",
        met_hours: 11.0,
        met_label: "T+0d 11h 00m",
        x: -89000,
        y: -120000,
        z: -8000,
        vx: 2.1,
        vy: -5.8,
        vz: -0.5,
        dist_earth_km: 95000,
        dist_earth_radii: 14.9,
        dist_moon_km: 295000,
        speed_kms: 6.2,
        speed_kmh: 22320,
    },
    {
        datetime: "2026-04-02 14:00:00",
        met_hours: 18.0,
        met_label: "T+0d 18h 00m",
        x: -130000,
        y: -155000,
        z: -10500,
        vx: 1.2,
        vy: -3.6,
        vz: -0.32,
        dist_earth_km: 122000,
        dist_earth_radii: 19.1,
        dist_moon_km: 272000,
        speed_kms: 3.82,
        speed_kmh: 13752,
    },
    {
        datetime: "2026-04-03 02:00:00",
        met_hours: 27.0,
        met_label: "T+1d 03h 00m",
        x: -180000,
        y: -200000,
        z: -14000,
        vx: 0.8,
        vy: -2.1,
        vz: -0.2,
        dist_earth_km: 150000,
        dist_earth_radii: 23.5,
        dist_moon_km: 245000,
        speed_kms: 2.3,
        speed_kmh: 8280,
    },
    {
        datetime: "2026-04-03 14:00:00",
        met_hours: 39.0,
        met_label: "T+1d 15h 00m",
        x: -210000,
        y: -238000,
        z: -16000,
        vx: 0.65,
        vy: -1.75,
        vz: -0.17,
        dist_earth_km: 188000,
        dist_earth_radii: 29.5,
        dist_moon_km: 210000,
        speed_kms: 1.88,
        speed_kmh: 6768,
    },
    {
        datetime: "2026-04-04 02:00:00",
        met_hours: 51.0,
        met_label: "T+2d 03h 00m",
        x: -250000,
        y: -280000,
        z: -18000,
        vx: 0.5,
        vy: -1.4,
        vz: -0.15,
        dist_earth_km: 230000,
        dist_earth_radii: 36.1,
        dist_moon_km: 165000,
        speed_kms: 1.5,
        speed_kmh: 5400,
    },
    {
        datetime: "2026-04-04 14:00:00",
        met_hours: 63.0,
        met_label: "T+2d 15h 00m",
        x: -270000,
        y: -305000,
        z: -19000,
        vx: 0.38,
        vy: -1.15,
        vz: -0.12,
        dist_earth_km: 270000,
        dist_earth_radii: 42.4,
        dist_moon_km: 128000,
        speed_kms: 1.22,
        speed_kmh: 4392,
    },
    {
        datetime: "2026-04-05 02:00:00",
        met_hours: 75.0,
        met_label: "T+3d 03h 00m",
        x: -290000,
        y: -330000,
        z: -20000,
        vx: 0.3,
        vy: -0.9,
        vz: -0.1,
        dist_earth_km: 310000,
        dist_earth_radii: 48.6,
        dist_moon_km: 98000,
        speed_kms: 1.0,
        speed_kmh: 3600,
    },
    {
        datetime: "2026-04-05 14:00:00",
        met_hours: 87.0,
        met_label: "T+3d 15h 00m",
        x: -300000,
        y: -345000,
        z: -20500,
        vx: 0.2,
        vy: -0.75,
        vz: -0.09,
        dist_earth_km: 340000,
        dist_earth_radii: 53.4,
        dist_moon_km: 68000,
        speed_kms: 0.79,
        speed_kmh: 2844,
    },
    {
        datetime: "2026-04-06 02:00:00",
        met_hours: 99.0,
        met_label: "T+4d 03h 00m",
        x: -310000,
        y: -360000,
        z: -21000,
        vx: 0.1,
        vy: -0.6,
        vz: -0.08,
        dist_earth_km: 370000,
        dist_earth_radii: 58.1,
        dist_moon_km: 42000,
        speed_kms: 0.65,
        speed_kmh: 2340,
    },
    {
        datetime: "2026-04-06 14:00:00",
        met_hours: 111.0,
        met_label: "T+4d 13h 00m",
        x: -315000,
        y: -368000,
        z: -21500,
        vx: -0.05,
        vy: -0.48,
        vz: -0.06,
        dist_earth_km: 390000,
        dist_earth_radii: 61.2,
        dist_moon_km: 22000,
        speed_kms: 0.49,
        speed_kmh: 1764,
    },
    {
        datetime: "2026-04-07 00:00:00",
        met_hours: 118.0,
        met_label: "T+4d 22h 00m",
        x: -318000,
        y: -375000,
        z: -22000,
        vx: -0.1,
        vy: -0.4,
        vz: -0.05,
        dist_earth_km: 405000,
        dist_earth_radii: 63.5,
        dist_moon_km: 12000,
        speed_kms: 0.45,
        speed_kmh: 1620,
    },
    {
        datetime: "2026-04-07 04:24:00",
        met_hours: 120.4,
        met_label: "T+5d 00h 24m",
        x: -320000,
        y: -378000,
        z: -22500,
        vx: -0.2,
        vy: -0.3,
        vz: -0.04,
        dist_earth_km: 413140,
        dist_earth_radii: 64.8,
        dist_moon_km: 8283,
        speed_kms: 0.41,
        speed_kmh: 1489,
    },
    {
        datetime: "2026-04-07 12:00:00",
        met_hours: 130.0,
        met_label: "T+5d 10h 00m",
        x: -315000,
        y: -370000,
        z: -22000,
        vx: -0.4,
        vy: 0.3,
        vz: 0.02,
        dist_earth_km: 390000,
        dist_earth_radii: 61.2,
        dist_moon_km: 22000,
        speed_kms: 0.55,
        speed_kmh: 1980,
    },
    {
        datetime: "2026-04-08 00:00:00",
        met_hours: 142.0,
        met_label: "T+5d 22h 00m",
        x: -305000,
        y: -355000,
        z: -21000,
        vx: -0.52,
        vy: 0.62,
        vz: 0.04,
        dist_earth_km: 360000,
        dist_earth_radii: 56.5,
        dist_moon_km: 42000,
        speed_kms: 0.82,
        speed_kmh: 2952,
    },
    {
        datetime: "2026-04-08 02:00:00",
        met_hours: 148.0,
        met_label: "T+6d 04h 00m",
        x: -290000,
        y: -340000,
        z: -20000,
        vx: -0.6,
        vy: 0.8,
        vz: 0.06,
        dist_earth_km: 330000,
        dist_earth_radii: 51.8,
        dist_moon_km: 65000,
        speed_kms: 1.05,
        speed_kmh: 3780,
    },
    {
        datetime: "2026-04-08 14:00:00",
        met_hours: 160.0,
        met_label: "T+6d 16h 00m",
        x: -270000,
        y: -315000,
        z: -18500,
        vx: -0.75,
        vy: 1.1,
        vz: 0.08,
        dist_earth_km: 295000,
        dist_earth_radii: 46.3,
        dist_moon_km: 105000,
        speed_kms: 1.35,
        speed_kmh: 4860,
    },
    {
        datetime: "2026-04-09 02:00:00",
        met_hours: 172.0,
        met_label: "T+7d 04h 00m",
        x: -240000,
        y: -280000,
        z: -17000,
        vx: -0.9,
        vy: 1.5,
        vz: 0.1,
        dist_earth_km: 245000,
        dist_earth_radii: 38.4,
        dist_moon_km: 152000,
        speed_kms: 1.8,
        speed_kmh: 6480,
    },
    {
        datetime: "2026-04-09 10:00:00",
        met_hours: 180.0,
        met_label: "T+7d 12h 00m",
        x: -215000,
        y: -250000,
        z: -15000,
        vx: -1.05,
        vy: 1.82,
        vz: 0.13,
        dist_earth_km: 208000,
        dist_earth_radii: 32.6,
        dist_moon_km: 192000,
        speed_kms: 2.12,
        speed_kmh: 7632,
    },
    {
        datetime: "2026-04-09 18:00:00",
        met_hours: 186.0,
        met_label: "T+7d 18h 00m",
        x: -190000,
        y: -220000,
        z: -13000,
        vx: -1.2,
        vy: 2.1,
        vz: 0.15,
        dist_earth_km: 175000,
        dist_earth_radii: 27.5,
        dist_moon_km: 228000,
        speed_kms: 2.5,
        speed_kmh: 9000,
    },
    {
        datetime: "2026-04-10 02:00:00",
        met_hours: 194.5,
        met_label: "T+8d 02h 30m",
        x: -155000,
        y: -178000,
        z: -10500,
        vx: -1.55,
        vy: 2.72,
        vz: 0.19,
        dist_earth_km: 138000,
        dist_earth_radii: 21.7,
        dist_moon_km: 275000,
        speed_kms: 3.15,
        speed_kmh: 11340,
    },
    {
        datetime: "2026-04-10 08:30:00",
        met_hours: 198.5,
        met_label: "T+8d 06h 30m",
        x: -130000,
        y: -150000,
        z: -8000,
        vx: -1.8,
        vy: 3.2,
        vz: 0.22,
        dist_earth_km: 110000,
        dist_earth_radii: 17.3,
        dist_moon_km: 305000,
        speed_kms: 3.7,
        speed_kmh: 13320,
    },
    {
        datetime: "2026-04-10 14:00:00",
        met_hours: 204.0,
        met_label: "T+8d 14h 00m",
        x: -95000,
        y: -110000,
        z: -6000,
        vx: -2.6,
        vy: 4.7,
        vz: 0.32,
        dist_earth_km: 75000,
        dist_earth_radii: 11.8,
        dist_moon_km: 332000,
        speed_kms: 5.4,
        speed_kmh: 19440,
    },
    {
        datetime: "2026-04-10 18:00:00",
        met_hours: 208.0,
        met_label: "T+8d 18h 00m",
        x: -60000,
        y: -70000,
        z: -4000,
        vx: -3.5,
        vy: 6.2,
        vz: 0.42,
        dist_earth_km: 45000,
        dist_earth_radii: 7.1,
        dist_moon_km: 355000,
        speed_kms: 7.2,
        speed_kmh: 25920,
    },
    {
        datetime: "2026-04-10 20:00:00",
        met_hours: 210.0,
        met_label: "T+8d 20h 00m",
        x: -30000,
        y: -38000,
        z: -2000,
        vx: -1.2,
        vy: -3.8,
        vz: -0.28,
        dist_earth_km: 28000,
        dist_earth_radii: 4.4,
        dist_moon_km: 358000,
        speed_kms: 4.02,
        speed_kmh: 14472,
    },
    {
        datetime: "2026-04-10 22:00:00",
        met_hours: 212.0,
        met_label: "T+8d 22h 00m",
        x: -8313.1,
        y: -55979.4,
        z: 1609.7,
        vx: 0.426,
        vy: -1.719,
        vz: -0.157,
        dist_earth_km: 56561.2,
        dist_earth_radii: 8.871,
        dist_moon_km: 357738.0,
        speed_kms: 10.107,
        speed_kmh: 36385.2,
    },
    {
        datetime: "2026-04-10 23:00:00",
        met_hours: 213.0,
        met_label: "T+8d 23h 00m",
        x: -8200.0,
        y: -57800.0,
        z: 1500.0,
        vx: 0.38,
        vy: -1.74,
        vz: -0.15,
        dist_earth_km: 58200.0,
        dist_earth_radii: 9.13,
        dist_moon_km: 359400.0,
        speed_kms: 4.8,
        speed_kmh: 17280,
    },
    {
        datetime: "2026-04-11 00:00:00",
        met_hours: 214.42,
        met_label: "T+8d 23h 25m",
        x: -8013.6,
        y: -60065.7,
        z: 1421.3,
        vx: 0.323,
        vy: -1.759,
        vz: -0.147,
        dist_earth_km: 60490.8,
        dist_earth_radii: 9.486,
        dist_moon_km: 361530.2,
        speed_kms: 1.774,
        speed_kmh: 6385.8,
    },
    {
        datetime: "2026-04-11 02:00:00",
        met_hours: 216.0,
        met_label: "T+9d 00h 00m",
        x: -7800.0,
        y: -62000.0,
        z: 1350.0,
        vx: 0.28,
        vy: -1.78,
        vz: -0.14,
        dist_earth_km: 6371.0,
        dist_earth_radii: 1.0,
        dist_moon_km: 363000.0,
        speed_kms: 0.0,
        speed_kmh: 0.0,
    },
];

// ── Mission constants ────────────────────────────────────────

const MISSION_DURATION_HOURS = 216;

// ── useStaticTelemetry ───────────────────────────────────────

export interface StaticTelemetryResult {
    data: TelemetryPoint[];
    currentPoint: TelemetryPoint | null;
    currentIndex: number;
    missionProgress: number;
    isComplete: boolean;
}

export function useStaticTelemetry(): StaticTelemetryResult {
    const metNow = getCurrentMET();
    const missionProgress = Math.min(1, Math.max(0, metNow / MISSION_DURATION_HOURS));
    const isComplete = metNow >= MISSION_DURATION_HOURS;

    const [dataset, setDataset] = useState<TelemetryPoint[]>(STATIC_DATA);

    useEffect(() => {
        fetch("/artemis2_trajectory.csv")
            .then((r) => {
                if (!r.ok) throw new Error("CSV not found");
                return r.text();
            })
            .then((csv) => {
                const lines = csv.split(/\r?\n/);
                const points: TelemetryPoint[] = [];
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    const parts = line.split(",");
                    if (parts.length < 14) continue;
                    points.push({
                        datetime: parts[0],
                        met_hours: parseFloat(parts[1]),
                        met_label: parts[2],
                        x: parseFloat(parts[3]),
                        y: parseFloat(parts[4]),
                        z: parseFloat(parts[5]),
                        vx: parseFloat(parts[6]),
                        vy: parseFloat(parts[7]),
                        vz: parseFloat(parts[8]),
                        dist_earth_km: parseFloat(parts[9]),
                        dist_earth_radii: parseFloat(parts[10]),
                        dist_moon_km: parseFloat(parts[11]),
                        speed_kms: parseFloat(parts[12]),
                        speed_kmh: parseFloat(parts[13]),
                    });
                }
                if (points.length > 0) {
                    setDataset(points);
                }
            })
            .catch((e) => console.error("Failed to load CSV, using static 30 points fallback:", e));
    }, []);

    let currentPoint: TelemetryPoint | null = null;
    let currentIndex = 0;

    if (dataset.length > 0) {
        try {
            currentPoint = interpolateNow(dataset);
            // Find nearest index for row highlighting
            let minDiff = Infinity;
            dataset.forEach((pt, idx) => {
                const diff = Math.abs(pt.met_hours - metNow);
                if (diff < minDiff) {
                    minDiff = diff;
                    currentIndex = idx;
                }
            });
        } catch {
            currentPoint = dataset[0];
            currentIndex = 0;
        }
    }

    return {
        data: dataset,
        currentPoint,
        currentIndex,
        missionProgress,
        isComplete,
    };
}

// ── useLiveTelemetry ─────────────────────────────────────────

export interface LiveTelemetryResult {
    liveData: TelemetryPoint[] | null;
    currentLivePoint: TelemetryPoint | null;
    isLive: boolean;
    isLoading: boolean;
    isError: boolean;
    lastRefresh: Date | null;
    error: Error | null;
    effectivePoint: TelemetryPoint | null;
    missionComplete: boolean;
}

export function useLiveTelemetry(): LiveTelemetryResult {
    const missionComplete = Date.now() > new Date('2026-04-11T02:00:00Z').getTime();

    const {
        data,
        isLoading,
        isError,
        error,
        dataUpdatedAt,
    } = useQuery<TelemetryPoint[], Error>({
        queryKey: ["horizons-live"],
        queryFn: fetchLiveWindow,
        refetchInterval: 1_800_000, // 30 minutes
        retry: 2,
        retryDelay: 5000,
        staleTime: 1_800_000,
        enabled: !missionComplete,
    });

    let currentLivePoint: TelemetryPoint | null = null;
    if (data && data.length > 0) {
        try {
            currentLivePoint = interpolateNow(data);
        } catch {
            currentLivePoint = data[data.length - 1];
        }
    }

    const { currentPoint } = useStaticTelemetry();

    return {
        liveData: data ?? null,
        currentLivePoint,
        effectivePoint: currentLivePoint ?? currentPoint,
        isLive: !isError && !isLoading && data != null && data.length > 0,
        isLoading,
        isError,
        missionComplete,
        lastRefresh: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
        error: error ?? null,
    };
}
