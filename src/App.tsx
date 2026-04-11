
// App.tsx
// Artemis II — Root application with routing and floating Live button

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Telemetry from "./pages/Telemetry";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// ── React Query client ───────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1_800_000,   // 30 minutes — matches telemetry refresh cadence
      gcTime: 3_600_000,      // 1 hour cache retention
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
    },
  },
});

// ── Floating Live button ─────────────────────────────────────
// Visible on all routes EXCEPT /telemetry.
// Uses useLocation so it must live inside <HashRouter>.

function FloatingLiveButton() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on the telemetry page itself
  if (location.pathname === "/telemetry") return null;

  return (
    <button
      onClick={() => navigate("/telemetry")}
      aria-label="Ouvrir le tableau de bord de télémétrie en direct"
      className={[
        "fixed bottom-6 right-6 z-50",
        "flex items-center gap-2",
        "bg-gray-900 border border-cyan-500/60 text-cyan-400",
        "hover:bg-cyan-500/10 hover:border-cyan-400",
        "active:scale-95",
        "transition-all duration-200",
        "rounded-full px-5 py-3",
        "text-sm font-bold tracking-widest",
        "shadow-lg shadow-cyan-500/10",
      ].join(" ")}
    >
      {/* Pulsing red dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
      </span>
      <span>📡 Live</span>
    </button>
  );
}

// ── App shell ────────────────────────────────────────────────

function AppShell() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/telemetry" element={<Telemetry />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Floating button — hidden on /telemetry via internal check */}
      <FloatingLiveButton />
    </>
  );
}

// ── Root export ──────────────────────────────────────────────

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <AppShell />
          </HashRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
