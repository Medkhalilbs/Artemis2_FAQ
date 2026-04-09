import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useLanguage } from "@/contexts/LanguageContext";

interface PartInfo {
  label: string;
  description: string;
  manufacturer: string;
  country: string;
}

const getPartData = (lang: string): Record<string, PartInfo> => ({
  crew: {
    label: lang === 'fr' ? "Module d'équipage" : "Crew Module",
    description: lang === 'fr' ? "Capsule pressurisée abritant les 4 astronautes. Volume habitable de 9 m³. Contient les systèmes de contrôle, sièges et survie." : "Pressurized capsule housing the 4 astronauts. Habitable volume of 9 m³. Contains control systems, seats and life support.",
    manufacturer: "Lockheed Martin",
    country: lang === 'fr' ? "🇺🇸 États-Unis" : "🇺🇸 United States",
  },
  heatshield: {
    label: lang === 'fr' ? "Bouclier thermique" : "Heat Shield",
    description: lang === 'fr' ? "5 m de diamètre, en AVCOAT ablatif. Résiste à 2 760°C lors de la rentrée atmosphérique à 40 000 km/h." : "5m in diameter, made of ablative AVCOAT. Withstands 2,760°C during atmospheric reentry at 40,000 km/h.",
    manufacturer: "Lockheed Martin",
    country: lang === 'fr' ? "🇺🇸 États-Unis" : "🇺🇸 United States",
  },
  adapter: {
    label: lang === 'fr' ? "Adaptateur (CMA)" : "Adapter (CMA)",
    description: lang === 'fr' ? "Connecte le module d'équipage au module de service. Contient l'électronique de puissance et les propulseurs de réaction." : "Connects the crew module to the service module. Contains power electronics and reaction thrusters.",
    manufacturer: "Lockheed Martin",
    country: lang === 'fr' ? "🇺🇸 États-Unis" : "🇺🇸 United States",
  },
  service: {
    label: lang === 'fr' ? "Module de service (ESM)" : "Service Module (ESM)",
    description: lang === 'fr' ? "Fournit propulsion, électricité (11 kW), eau, oxygène et contrôle thermique. Largué avant la rentrée." : "Provides propulsion, electricity (11 kW), water, oxygen and thermal control. Jettisoned before reentry.",
    manufacturer: "Airbus Defence & Space",
    country: lang === 'fr' ? "🇪🇺 Europe (Brême, 🇩🇪)" : "🇪🇺 Europe (Bremen, 🇩🇪)",
  },
  engine: {
    label: lang === 'fr' ? "Moteur OMS-E" : "OMS-E Engine",
    description: lang === 'fr' ? "Moteur recyclé de la navette spatiale. 26,7 kN de poussée pour les corrections de trajectoire majeures." : "Recycled Space Shuttle engine. 26.7 kN of thrust for major trajectory corrections.",
    manufacturer: "Aerojet Rocketdyne",
    country: lang === 'fr' ? "🇺🇸 États-Unis" : "🇺🇸 United States",
  },
  solar: {
    label: lang === 'fr' ? "Panneaux solaires" : "Solar Arrays",
    description: lang === 'fr' ? "4 ailes de 7 m chacune produisant 11,1 kW. Portent des caméras GoPro à leurs extrémités." : "4 wings measuring 7m each, producing 11.1 kW. They carry GoPro cameras on their tips.",
    manufacturer: "Airbus Defence & Space",
    country: lang === 'fr' ? "🇪🇺 Europe (🇳🇱 Pays-Bas)" : "🇪🇺 Europe (🇳🇱 Netherlands)",
  },
});

const partColors: Record<string, string> = {
  crew: "#d4d4d8",
  heatshield: "#8B4513",
  adapter: "#a1a1aa",
  service: "#d4af37",
  engine: "#71717a",
  solar: "#1e3a5f",
};

/* ── Procedural textures ─────────────────────────────── */

function useCrewTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    // Base white/silver
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "#e8e8ec");
    grad.addColorStop(0.3, "#d4d4d8");
    grad.addColorStop(0.7, "#c0c0c8");
    grad.addColorStop(1, "#b0b0b8");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    // Panel lines
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 32 + 16);
      ctx.lineTo(512, i * 32 + 16);
      ctx.stroke();
    }
    // Vertical seams
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 64, 0);
      ctx.lineTo(i * 64, 512);
      ctx.stroke();
    }
    // Window spots
    ctx.fillStyle = "rgba(100,160,255,0.3)";
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(128 + i * 80, 180, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);
}

function useHeatshieldTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    // Ablative brown/charred surface
    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
    grad.addColorStop(0, "#5a2d0c");
    grad.addColorStop(0.5, "#8B4513");
    grad.addColorStop(1, "#6b3410");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    // Honeycomb-like pattern
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 0.8;
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const ox = x * 16 + (y % 2) * 8;
        const oy = y * 14;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const angle = (Math.PI / 3) * k - Math.PI / 6;
          const px = ox + 7 * Math.cos(angle);
          const py = oy + 7 * Math.sin(angle);
          k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);
}

function useServiceTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    // Gold foil MLI
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, "#c9a227");
    grad.addColorStop(0.25, "#e6c74c");
    grad.addColorStop(0.5, "#d4af37");
    grad.addColorStop(0.75, "#b8961f");
    grad.addColorStop(1, "#c9a227");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    // Crinkle texture
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40);
      ctx.stroke();
    }
    // ESA/NASA text bands
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 200, 512, 3);
    ctx.fillRect(0, 310, 512, 3);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);
}

function useSolarTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    // Dark blue base
    ctx.fillStyle = "#0a1e3d";
    ctx.fillRect(0, 0, 256, 256);
    // Solar cell grid
    const cellW = 32;
    const cellH = 32;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const shade = 15 + Math.random() * 20;
        ctx.fillStyle = `rgb(${shade}, ${shade + 20}, ${shade + 60})`;
        ctx.fillRect(x * cellW + 1, y * cellH + 1, cellW - 2, cellH - 2);
      }
    }
    // Thin silver grid lines
    ctx.strokeStyle = "rgba(180,200,220,0.4)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellW, 0);
      ctx.lineTo(i * cellW, 256);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellH);
      ctx.lineTo(256, i * cellH);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);
}

/* ── Interactive Part ─────────────────────────────── */

function InteractivePart({
  geometry,
  position,
  rotation,
  color,
  partKey,
  activePart,
  setActivePart,
  map,
  metalness = 0.5,
  roughness = 0.4,
}: {
  geometry: React.ReactNode;
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  partKey: string;
  activePart: string | null;
  setActivePart: (key: string | null) => void;
  map?: THREE.Texture | null;
  metalness?: number;
  roughness?: number;
}) {
  const { language } = useLanguage();
  const partData = getPartData(language);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = activePart === partKey;
  const outlineRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const targetEmissive = isActive ? 0.35 : hovered ? 0.15 : 0;
      mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.1;
    }
    if (outlineRef.current) {
      outlineRef.current.visible = isActive || hovered;
    }
  });

  return (
    <group>
      {/* Selection outline */}
      <mesh
        ref={outlineRef}
        position={position}
        rotation={rotation || [0, 0, 0]}
        scale={[1.03, 1.03, 1.03]}
        visible={false}
      >
        {geometry}
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.3} />
      </mesh>

      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation || [0, 0, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        onClick={(e) => { e.stopPropagation(); setActivePart(isActive ? null : partKey); }}
      >
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={activePart && !isActive ? 0.25 : 1}
          map={map || undefined}
        />
        {isActive && (
          <Html distanceFactor={10} position={[0, 1.5, 0]} center>
            <div
              className="bg-background/95 backdrop-blur-xl border border-primary/40 rounded-xl p-4 w-64 shadow-2xl pointer-events-none"
              style={{ animation: "fadeIn 0.3s ease-out" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-primary font-heading font-bold text-sm">{partData[partKey].label}</p>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed mb-3">{partData[partKey].description}</p>
              <div className="text-[10px] text-foreground/60 space-y-1 border-t border-border/30 pt-2">
                <p><span className="text-foreground/80 font-medium">{language === 'fr' ? 'Fabricant:' : 'Manufacturer:'}</span> {partData[partKey].manufacturer}</p>
                <p><span className="text-foreground/80 font-medium">{language === 'fr' ? 'Pays:' : 'Country:'}</span> {partData[partKey].country}</p>
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

/* ── Solar Panel ─────────────────────────────── */

function SolarPanel({ position, rotation, activePart, setActivePart, solarTex }: {
  position: [number, number, number];
  rotation: [number, number, number];
  activePart: string | null;
  setActivePart: (key: string | null) => void;
  solarTex: THREE.Texture;
}) {
  const isActive = activePart === "solar";
  return (
    <group position={position} rotation={rotation}>
      {/* Arm with hinge */}
      <mesh position={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 8]} />
        <meshStandardMaterial color="#666" metalness={0.9} roughness={0.15} transparent opacity={activePart && !isActive ? 0.25 : 1} />
      </mesh>
      <mesh position={[0, 0, 1.5]}>
        <boxGeometry args={[0.06, 0.06, 2.5]} />
        <meshStandardMaterial color="#777" metalness={0.85} roughness={0.2} transparent opacity={activePart && !isActive ? 0.25 : 1} />
      </mesh>
      {/* Panel */}
      <InteractivePart
        geometry={<boxGeometry args={[0.9, 0.03, 2.8]} />}
        position={[0, 0, 3.3]}
        color="#1a3a6a"
        partKey="solar"
        activePart={activePart}
        setActivePart={setActivePart}
        map={solarTex}
        metalness={0.3}
        roughness={0.6}
      />
      {/* Camera at tip */}
      <mesh position={[0, 0.08, 4.6]}>
        <boxGeometry args={[0.12, 0.1, 0.15]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} transparent opacity={activePart && !isActive ? 0.25 : 1} />
      </mesh>
    </group>
  );
}

/* ── Engine Exhaust Glow ─────────────────────────────── */

function EngineGlow() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.intensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });
  return <pointLight ref={ref} position={[0, -6.8, 0]} color="#ff6a00" intensity={0.3} distance={5} />;
}

/* ── Main Scene ─────────────────────────────── */

function OrionScene() {
  const [activePart, setActivePart] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const crewTex = useCrewTexture();
  const heatTex = useHeatshieldTexture();
  const serviceTex = useServiceTexture();
  const solarTex = useSolarTexture();

  const targetRef = useRef({ rot: 0, pitch: 0, y: 0 });

  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY || 0;
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = scrollY / scrollMax;

      targetRef.current.rot = progress * Math.PI * 6; // Spin 3 times down the page
      targetRef.current.pitch = (progress - 0.5) * 0.8;
      targetRef.current.y = -progress * 2;

      // Smoothly interpolate towards the target positions based on scroll
      groupRef.current.rotation.y += (targetRef.current.rot + Math.sin(state.clock.elapsedTime * 0.12) * 0.3 - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (targetRef.current.pitch - groupRef.current.rotation.x) * 0.08;
      groupRef.current.position.y += (targetRef.current.y - groupRef.current.position.y) * 0.08;
    }
  });

  return (
    <>
      {/* Starfield */}
      <Stars radius={100} depth={60} count={4000} factor={4} saturation={0.1} fade speed={0.5} />

      <group ref={groupRef}>
        {/* LAS tower top (small cone) */}
        <mesh position={[0, 3, 0]}>
          <coneGeometry args={[0.08, 2.5, 8]} />
          <meshStandardMaterial color="#aaa" metalness={0.7} roughness={0.3} transparent opacity={activePart ? 0.15 : 0.6} />
        </mesh>
        {/* LAS support struts */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (Math.PI / 2) * i;
          return (
            <mesh key={`strut-${i}`} position={[Math.cos(angle) * 0.3, 2.2, Math.sin(angle) * 0.3]} rotation={[0, 0, Math.cos(angle) * 0.15]}>
              <cylinderGeometry args={[0.02, 0.02, 1.5, 6]} />
              <meshStandardMaterial color="#999" metalness={0.7} roughness={0.3} transparent opacity={activePart ? 0.15 : 0.5} />
            </mesh>
          );
        })}

        {/* Crew Module */}
        <InteractivePart
          geometry={<coneGeometry args={[2.5, 3.2, 32]} />}
          position={[0, 0.1, 0]}
          color="#d4d4d8"
          partKey="crew"
          activePart={activePart}
          setActivePart={setActivePart}
          map={crewTex}
          metalness={0.4}
          roughness={0.5}
        />

        {/* Heat Shield */}
        <InteractivePart
          geometry={<cylinderGeometry args={[2.52, 2.52, 0.18, 32]} />}
          position={[0, -1.6, 0]}
          color="#8B4513"
          partKey="heatshield"
          activePart={activePart}
          setActivePart={setActivePart}
          map={heatTex}
          metalness={0.2}
          roughness={0.8}
        />

        {/* Adapter CMA - with reaction thrusters */}
        <InteractivePart
          geometry={<cylinderGeometry args={[2.5, 2.25, 0.9, 32]} />}
          position={[0, -2.15, 0]}
          color="#a1a1aa"
          partKey="adapter"
          activePart={activePart}
          setActivePart={setActivePart}
          metalness={0.6}
          roughness={0.35}
        />
        {/* RCS thruster nubs on adapter */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (Math.PI / 3) * i;
          const isAdapterActive = activePart === "adapter";
          return (
            <mesh key={`rcs-${i}`} position={[Math.cos(angle) * 2.4, -2.15, Math.sin(angle) * 2.4]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.15, 0.15, 0.1]} />
              <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} transparent opacity={activePart && !isAdapterActive ? 0.25 : 1} />
            </mesh>
          );
        })}

        {/* Service Module (ESM) */}
        <InteractivePart
          geometry={<cylinderGeometry args={[2.2, 2.2, 3, 32]} />}
          position={[0, -4.1, 0]}
          color="#d4af37"
          partKey="service"
          activePart={activePart}
          setActivePart={setActivePart}
          map={serviceTex}
          metalness={0.6}
          roughness={0.35}
        />
        {/* Service module detail rings */}
        <mesh position={[0, -2.65, 0]}>
          <torusGeometry args={[2.22, 0.04, 8, 32]} />
          <meshStandardMaterial color="#b8961f" metalness={0.7} roughness={0.3} transparent opacity={activePart && activePart !== "service" ? 0.25 : 1} />
        </mesh>
        <mesh position={[0, -5.55, 0]}>
          <torusGeometry args={[2.22, 0.04, 8, 32]} />
          <meshStandardMaterial color="#b8961f" metalness={0.7} roughness={0.3} transparent opacity={activePart && activePart !== "service" ? 0.25 : 1} />
        </mesh>

        {/* Engine nozzle */}
        <InteractivePart
          geometry={<coneGeometry args={[0.9, 1.4, 24, 1, true]} />}
          position={[0, -6.3, 0]}
          rotation={[Math.PI, 0, 0]}
          color="#555"
          partKey="engine"
          activePart={activePart}
          setActivePart={setActivePart}
          metalness={0.8}
          roughness={0.2}
        />
        {/* Inner nozzle */}
        <mesh position={[0, -6.3, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.7, 1.2, 24, 1, true]} />
          <meshStandardMaterial color="#ff4400" emissive="#ff2200" emissiveIntensity={0.15} metalness={0.3} roughness={0.6} side={THREE.BackSide}
            transparent opacity={activePart && activePart !== "engine" ? 0.25 : 0.8} />
        </mesh>

        <EngineGlow />

        {/* Auxiliary thrusters on service module */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (Math.PI / 2) * i + Math.PI / 4;
          const isEngineActive = activePart === "engine";
          return (
            <mesh key={`aux-${i}`} position={[Math.cos(angle) * 2.1, -5.6, Math.sin(angle) * 2.1]} rotation={[Math.PI * 0.5, 0, -angle]}>
              <coneGeometry args={[0.12, 0.3, 8, 1, true]} />
              <meshStandardMaterial color="#666" metalness={0.7} roughness={0.3} transparent opacity={activePart && !isEngineActive ? 0.25 : 1} />
            </mesh>
          );
        })}

        {/* Solar Panels */}
        <SolarPanel position={[0, -4.1, 0]} rotation={[0, 0, 0]} activePart={activePart} setActivePart={setActivePart} solarTex={solarTex} />
        <SolarPanel position={[0, -4.1, 0]} rotation={[0, Math.PI / 2, 0]} activePart={activePart} setActivePart={setActivePart} solarTex={solarTex} />
        <SolarPanel position={[0, -4.1, 0]} rotation={[0, Math.PI, 0]} activePart={activePart} setActivePart={setActivePart} solarTex={solarTex} />
        <SolarPanel position={[0, -4.1, 0]} rotation={[0, -Math.PI / 2, 0]} activePart={activePart} setActivePart={setActivePart} solarTex={solarTex} />
      </group>
    </>
  );
}

/* ── Component ─────────────────────────────── */

const OrionModel3D = () => {
  const { language } = useLanguage();
  const partData = getPartData(language);
  return (
    <section id="modele-3d" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {language === 'fr' ? 'Modèle 3D — Vaisseau Orion' : '3D Model — Orion Spacecraft'}
        </h2>
      </div>

      <p className="text-muted-foreground mb-4 text-[14px] leading-relaxed">
        {language === 'fr' 
          ? "Cliquez sur chaque partie du vaisseau pour découvrir son rôle, son fabricant et son pays d'origine. Faites glisser pour tourner, scrollez pour zoomer."
          : "Click on each part of the spacecraft to discover its role, manufacturer, and country of origin. Drag to rotate, scroll to zoom."}
      </p>

      <div className="bg-glass rounded-xl glow-border overflow-hidden">
        <div className="h-[550px] w-full relative" style={{ background: "radial-gradient(ellipse at center, #0a0e1a 0%, #000005 100%)" }}>
          <Canvas
            camera={{ position: [10, 3, 14], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <fog attach="fog" args={["#000010", 30, 80]} />
            <ambientLight intensity={0.25} />
            <directionalLight position={[15, 12, 8]} intensity={1.2} color="#fff8f0" castShadow />
            <directionalLight position={[-8, -4, -6]} intensity={0.2} color="#4488ff" />
            <pointLight position={[0, 8, 0]} intensity={0.3} color="#3B82F6" />
            <Suspense fallback={null}>
              <OrionScene />
            </Suspense>
            <OrbitControls
              enablePan={false}
              minDistance={8}
              maxDistance={30}
              autoRotate
              autoRotateSpeed={0.4}
              maxPolarAngle={Math.PI * 0.85}
              minPolarAngle={Math.PI * 0.15}
            />
          </Canvas>
        </div>

        {/* Legend */}
        <div className="border-t border-border/30 p-4 bg-background/50">
          <p className="text-[10px] text-muted-foreground/60 mb-2 uppercase tracking-wider font-medium">
            {language === 'fr' ? 'Légende — Cliquez sur une pièce' : 'Legend — Click on a part'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {Object.entries(partData).map(([key, info]) => (
              <div key={key} className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="w-3 h-3 rounded-sm shrink-0 border border-white/10"
                  style={{ backgroundColor: partColors[key] }}
                />
                <span>{info.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrionModel3D;
