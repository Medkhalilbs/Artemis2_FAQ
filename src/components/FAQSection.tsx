import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  List,
  Copy,
  Check,
  X,
  AlignLeft,
  AlignJustify,
  Clock,
  Play,
  Pause,
  Search,
  Home,
  ChevronsRight,
  Moon,
  Sun,
  Keyboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
  id: string;
  searchQuery?: string;
}

/* ─────────────────────────────────────────────────────────
   Highlight helper
───────────────────────────────────────────────────────── */
function highlightQuery(
  node: React.ReactNode,
  query?: string
): React.ReactNode {
  if (!query || !query.trim()) return node;
  const qStr = query.trim();

  if (typeof node === "string") {
    const parts = node.split(new RegExp(`(${qStr})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === qStr.toLowerCase() ? (
        <span
          key={i}
          className="bg-primary/40 text-white px-0.5 rounded shadow-[0_0_10px_rgba(var(--primary),0.5)] font-bold"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  if (Array.isArray(node)) {
    return React.Children.map(node, (n) => highlightQuery(n, query));
  }

  if (React.isValidElement(node)) {
    return React.cloneElement(node as React.ReactElement<any>, {
      ...node.props,
      children: highlightQuery(node.props.children, query),
    });
  }

  return node;
}

/* ─────────────────────────────────────────────────────────
   Reading time helper (~200 wpm)
───────────────────────────────────────────────────────── */
function getReadingTime(answer: string | React.ReactNode): string {
  let text = "";
  if (typeof answer === "string") {
    text = answer;
  } else {
    // extract text from React nodes
    const extract = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(extract).join(" ");
      if (React.isValidElement(node))
        return extract((node.props as any).children);
      return "";
    };
    text = extract(answer);
  }
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return mins === 1 ? "~1 min read" : `~${mins} min read`;
}

/* ─────────────────────────────────────────────────────────
   Font size config
───────────────────────────────────────────────────────── */
const FONT_SIZES = [
  { label: "XS", prose: "prose-sm",   bodySize: "text-sm",   lineH: "leading-relaxed" },
  { label: "S",  prose: "prose-base", bodySize: "text-base",  lineH: "leading-loose"   },
  { label: "M",  prose: "prose-lg",   bodySize: "text-lg",   lineH: "leading-[1.85]"  },
  { label: "L",  prose: "prose-xl",   bodySize: "text-xl",   lineH: "leading-[1.9]"   },
];

/* ─────────────────────────────────────────────────────────
   Icon tooltip wrapper
───────────────────────────────────────────────────────── */
function ToolBtn({
  onClick,
  label,
  title,
  active = false,
  disabled = false,
  danger = false,
  children,
}: {
  onClick?: () => void;
  label: string;
  title?: string;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  // Light: slate palette · Dark: navy/slate palette
  const base = "relative group/tb p-2 rounded-full border transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none";
  const cls = danger
    ? `${base} bg-red-50 border-red-200 text-red-400 hover:bg-red-100 hover:text-red-500 hover:border-red-300 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400/70 dark:hover:bg-red-500/20 dark:hover:text-red-400 dark:hover:border-red-500/40`
    : active
    ? `${base} bg-blue-100 border-blue-300 text-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.25)] dark:bg-blue-500/20 dark:border-blue-400/50 dark:text-blue-400 dark:shadow-[0_0_12px_rgba(59,130,246,0.2)]`
    : `${base} bg-slate-100 border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 dark:hover:border-blue-600/40`;
  return (
    <button onClick={onClick} aria-label={label} title={title ?? label} disabled={disabled} className={cls}>
      {children}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 px-2 py-0.5 opacity-0 group-hover/tb:opacity-100 transition-opacity duration-150 z-[9999] shadow-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
        {title ?? label}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   Slide direction type
───────────────────────────────────────────────────────── */
type Dir = "left" | "right" | "none";

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
const FAQSection = ({ title, icon, items, id, searchQuery = "" }: FAQSectionProps) => {
  const [activeLectureIndex, setActiveLectureIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<Dir>("none");
  const [fontSizeIdx, setFontSizeIdx] = useState(2); // default "M"
  const [justify, setJustify] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showList, setShowList] = useState(false);
  const [listSearch, setListSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const listRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const listSearchRef = useRef<HTMLInputElement>(null);

  const fs = FONT_SIZES[fontSizeIdx];

  /* ── Navigate with direction awareness ── */
  const navigate = useCallback((nextIdx: number, dir: Dir) => {
    setDirection(dir);
    setActiveLectureIndex(nextIdx);
  }, []);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (activeLectureIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveLectureIndex((i) => {
          if (i === null) return null;
          const next = Math.min(items.length - 1, i + 1);
          if (next !== i) { setDirection("left"); return next; }
          return i;
        });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveLectureIndex((i) => {
          if (i === null) return null;
          const next = Math.max(0, i - 1);
          if (next !== i) { setDirection("right"); return next; }
          return i;
        });
      } else if (e.key === "Home") {
        e.preventDefault();
        setDirection("right");
        setActiveLectureIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setDirection("left");
        setActiveLectureIndex(items.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeLectureIndex, items.length]);

  /* ── Reset on index change ── */
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setCopied(false);
    setShowList(false);
    setListSearch("");
    setScrollPct(0);
  }, [activeLectureIndex]);

  /* ── Scroll progress tracker ── */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = () => {
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? (el.scrollTop / max) * 100 : 100);
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [activeLectureIndex]);

  /* ── Close list when clicking outside ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setShowList(false);
      }
    };
    if (showList) {
      document.addEventListener("mousedown", handler);
      setTimeout(() => listSearchRef.current?.focus(), 80);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [showList]);

  /* ── Auto-play ── */
  useEffect(() => {
    if (!autoPlay || activeLectureIndex === null) return;
    autoRef.current = setInterval(() => {
      setActiveLectureIndex((i) => {
        if (i === null) return null;
        if (i < items.length - 1) { setDirection("left"); return i + 1; }
        setAutoPlay(false);
        return i;
      });
    }, 8000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [autoPlay, activeLectureIndex, items.length]);

  /* ── Copy ── */
  const handleCopy = useCallback(() => {
    if (activeLectureIndex === null) return;
    const item = items[activeLectureIndex];
    const text =
      typeof item.answer === "string"
        ? item.answer
        : document.getElementById(`lecture-answer-${id}`)?.innerText ?? "";
    navigator.clipboard.writeText(`Q: ${item.question}\n\nA: ${text}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activeLectureIndex, items, id]);

  /* ── Filtered list for search ── */
  const filteredList = useMemo(
    () =>
      items
        .map((item, i) => ({ item, i }))
        .filter(({ item }) =>
          listSearch.trim()
            ? item.question.toLowerCase().includes(listSearch.trim().toLowerCase())
            : true
        ),
    [items, listSearch]
  );

  const progress =
    activeLectureIndex !== null
      ? ((activeLectureIndex + 1) / items.length) * 100
      : 0;

  /* ── Slide animation variants (direction-aware) ── */
  const slideVariants = {
    enter: (dir: Dir) => ({
      opacity: 0,
      x: dir === "left" ? 48 : dir === "right" ? -48 : 0,
      scale: 0.97,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: Dir) => ({
      opacity: 0,
      x: dir === "left" ? -48 : dir === "right" ? 48 : 0,
      scale: 0.97,
    }),
  };

  /* ═══════════════════════════════════════════════════
     Render
  ═══════════════════════════════════════════════════ */
  return (
    <section id={id} className="scroll-mt-24">

      {/* ══════════════════════════════════════════════
          Lecture Mode Dialog
      ══════════════════════════════════════════════ */}
      <Dialog
        open={activeLectureIndex !== null}
        onOpenChange={(open) => !open && setActiveLectureIndex(null)}
      >
        {activeLectureIndex !== null && (
          <DialogContent
            className={[
              "max-w-5xl max-h-[94vh] overflow-hidden p-0 rounded-3xl flex flex-col gap-0",
              "border shadow-[0_24px_64px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.7)]",
              focusMode
                ? "bg-[#FDFBF7] border-slate-200/50 dark:bg-[#02040A] dark:border-slate-800"
                : "bg-white border-slate-200 dark:bg-[#0f1219] dark:border-slate-700/60",
            ].join(" ")}
          >
            {/* ── Ambient glow ring ── */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-blue-400/10 dark:ring-blue-400/8 z-50" />

            {/* ── Top progress bar (overall) ── */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-200 dark:bg-slate-800 z-50 rounded-t-3xl overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 22 }}
              />
            </div>

            {/* ── Scroll progress bar ── */}
            <div className="absolute top-[3px] left-0 right-0 h-[2px] bg-transparent z-50 overflow-hidden">
              <motion.div
                className="h-full bg-blue-400/50"
                animate={{ width: `${scrollPct}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>

            {/* ════════════════════════════════
                Reading Toolbar
            ════════════════════════════════ */}
            <div
              className={[
                "relative z-50 flex items-center justify-between gap-3",
                "px-5 sm:px-7 pt-7 pb-4 shrink-0 flex-wrap transition-opacity duration-500",
                focusMode
                  ? "bg-transparent border-transparent opacity-20 hover:opacity-100 focus-within:opacity-100"
                  : "border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#161c26] opacity-100",
              ].join(" ")}
            >
              {/* ── Left: section badge + counter ── */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-blue-500 dark:text-blue-400 flex-shrink-0">{icon}</span>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] font-mono uppercase tracking-widest truncate hidden sm:block">
                  {title}
                </span>
                <span className="ml-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/25 rounded-full px-3 py-0.5 tabular-nums flex-shrink-0">
                  {activeLectureIndex + 1} / {items.length}
                </span>
                {/* Reading time */}
                <span className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  <Clock className="w-3 h-3" />
                  {getReadingTime(items[activeLectureIndex].answer)}
                </span>
              </div>

              {/* ── Right: tools ── */}
              <div className="flex items-center gap-1.5 flex-wrap justify-end">

                {/* Font size controls */}
                <div className="flex items-center gap-0.5 bg-white dark:bg-slate-800 rounded-full px-2 py-1 border border-slate-200 dark:border-slate-700">
                  <button
                    aria-label="Decrease font size"
                    disabled={fontSizeIdx === 0}
                    onClick={() => setFontSizeIdx((v) => Math.max(0, v - 1))}
                    title="Smaller text"
                    className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 w-5 text-center select-none">
                    {fs.label}
                  </span>
                  <button
                    aria-label="Increase font size"
                    disabled={fontSizeIdx === FONT_SIZES.length - 1}
                    onClick={() => setFontSizeIdx((v) => Math.min(FONT_SIZES.length - 1, v + 1))}
                    title="Larger text"
                    className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Text align */}
                <ToolBtn
                  label="Toggle text alignment"
                  title={justify ? "Left align" : "Justify text"}
                  active={justify}
                  onClick={() => setJustify((v) => !v)}
                >
                  {justify ? <AlignJustify className="w-4 h-4" /> : <AlignLeft className="w-4 h-4" />}
                </ToolBtn>

                {/* Focus / night mode */}
                <ToolBtn
                  label="Toggle focus mode"
                  title={focusMode ? "Exit focus mode" : "Focus mode (dim)"}
                  active={focusMode}
                  onClick={() => setFocusMode((v) => !v)}
                >
                  {focusMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </ToolBtn>

                {/* Auto-play */}
                <ToolBtn
                  label="Toggle auto-advance"
                  title={autoPlay ? "Pause auto-advance" : "Auto-advance (8s)"}
                  active={autoPlay}
                  onClick={() => setAutoPlay((v) => !v)}
                >
                  {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </ToolBtn>

                {/* Copy */}
                <ToolBtn
                  label="Copy Q&A"
                  title="Copy question & answer"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </ToolBtn>

                {/* Question list */}
                <div className="relative" ref={listRef}>
                  <ToolBtn
                    label="Show all questions"
                    title="Browse all questions"
                    active={showList}
                    onClick={() => setShowList((v) => !v)}
                  >
                    <List className="w-4 h-4" />
                  </ToolBtn>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {showList && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 top-full mt-2 w-80 sm:w-[26rem] rounded-2xl bg-white dark:bg-[#161c26] border border-slate-200 dark:border-slate-700 shadow-2xl z-[9999] overflow-hidden"
                      >
                        {/* Search inside list */}
                        <div className="flex items-center gap-2 px-3 pt-3 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                          <input
                            ref={listSearchRef}
                            value={listSearch}
                            onChange={(e) => setListSearch(e.target.value)}
                            placeholder="Search questions…"
                            className="flex-1 bg-transparent text-[13px] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none border-none"
                          />
                          {listSearch && (
                            <button
                              onClick={() => setListSearch("")}
                              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        {/* List */}
                        <div className="max-h-64 overflow-y-auto p-2">
                          {filteredList.length === 0 ? (
                            <p className="py-6 text-center text-[12px] text-slate-400 dark:text-slate-600">
                              No matches
                            </p>
                          ) : (
                            filteredList.map(({ item, i }) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setDirection(i > activeLectureIndex ? "left" : "right");
                                  setActiveLectureIndex(i);
                                  setShowList(false);
                                }}
                                className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] leading-snug transition-all duration-200 flex items-start gap-3 ${
                                  i === activeLectureIndex
                                    ? "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100"
                                }`}
                              >
                                <span
                                  className={`tabular-nums text-[11px] font-mono mt-0.5 shrink-0 ${
                                    i === activeLectureIndex
                                      ? "text-blue-500 dark:text-blue-400"
                                      : "text-slate-400 dark:text-slate-600"
                                  }`}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="line-clamp-2">{item.question}</span>
                              </button>
                            ))
                          )}
                        </div>
                        <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
                          <span className="text-[10px] text-slate-400 dark:text-slate-600 font-mono">
                            {filteredList.length} of {items.length}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => { setDirection("right"); setActiveLectureIndex(0); setShowList(false); }}
                              className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <Home className="w-3 h-3" /> First
                            </button>
                            <button
                              onClick={() => { setDirection("left"); setActiveLectureIndex(items.length - 1); setShowList(false); }}
                              className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              Last <ChevronsRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shortcuts hint toggle */}
                <ToolBtn
                  label="Keyboard shortcuts"
                  title="Show keyboard shortcuts"
                  active={showShortcuts}
                  onClick={() => setShowShortcuts((v) => !v)}
                >
                  <Keyboard className="w-4 h-4" />
                </ToolBtn>

                {/* Separator */}
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

                {/* Close */}
                <ToolBtn
                  label="Close lecture mode"
                  title="Close (Esc)"
                  danger
                  onClick={() => setActiveLectureIndex(null)}
                >
                  <X className="w-4 h-4" />
                </ToolBtn>
              </div>
            </div>

            {/* ── Shortcuts panel ── */}
            <AnimatePresence>
              {showShortcuts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden shrink-0 border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="flex flex-wrap gap-x-6 gap-y-1 px-7 py-3 text-[11px] text-slate-500 dark:text-slate-500 font-mono">
                    {[
                      ["← / →",   "Previous / Next"],
                      ["Home",    "First question"],
                      ["End",     "Last question"],
                      ["Esc",     "Close"],
                    ].map(([key, desc]) => (
                      <span key={key} className="flex items-center gap-1.5">
                        <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                          {key}
                        </kbd>
                        <span>{desc}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ════════════════════════════════
                Prev / Next Arrows (desktop)
            ════════════════════════════════ */}
            <div className={`absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-50 hidden sm:block transition-all duration-500 ${focusMode ? 'opacity-15 hover:opacity-100' : 'opacity-100'}`}>
              <button
                onClick={() => navigate(Math.max(0, activeLectureIndex - 1), "right")}
                disabled={activeLectureIndex === 0}
                className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-600/40 disabled:opacity-20 disabled:pointer-events-none transition-all hover:scale-110 shadow-lg dark:shadow-slate-900/50"
                title="Previous (←)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className={`absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-50 hidden sm:block transition-all duration-500 ${focusMode ? 'opacity-15 hover:opacity-100' : 'opacity-100'}`}>
              <button
                onClick={() => navigate(Math.min(items.length - 1, activeLectureIndex + 1), "left")}
                disabled={activeLectureIndex === items.length - 1}
                className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-600/40 disabled:opacity-20 disabled:pointer-events-none transition-all hover:scale-110 shadow-lg dark:shadow-slate-900/50"
                title="Next (→)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* ════════════════════════════════
                Scrollable Content Area
            ════════════════════════════════ */}
            <div
              ref={contentRef}
              className="overflow-y-auto flex-1 px-8 sm:px-28 relative"
            >
              {/* ── Question header ── */}
              <DialogHeader className="pt-10 pb-6 shrink-0">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`q-${activeLectureIndex}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
                  >
                    <DialogTitle
                      className={[
                        "text-xl sm:text-3xl font-heading font-bold leading-[1.4] tracking-tight text-center",
                        focusMode
                          ? "text-slate-800 dark:text-slate-400"
                          : "text-slate-900 dark:text-slate-50",
                      ].join(" ")}
                    >
                      {highlightQuery(items[activeLectureIndex].question, searchQuery)}
                    </DialogTitle>

                    {/* Decorative divider */}
                    <div className={`flex items-center gap-3 mt-6 mb-0 transition-opacity duration-500 ${focusMode ? 'opacity-20' : 'opacity-100'}`}>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/40 dark:via-blue-500/25 to-transparent" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500/60 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/40 dark:via-blue-500/25 to-transparent" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </DialogHeader>

              {/* ── Answer body ── */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`a-${activeLectureIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, delay: 0.04, ease: [0.32, 0, 0.67, 0] }}
                  className="pb-12"
                >
                  <div
                    id={`lecture-answer-${id}`}
                    className={[
                      "prose max-w-none font-body",
                      "prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline-offset-2",
                      "prose-strong:text-slate-900 dark:prose-strong:text-slate-100",
                      "prose-headings:text-slate-900 dark:prose-headings:text-slate-100",
                      "prose-p:text-slate-600 dark:prose-p:text-slate-300",
                      "prose-li:text-slate-600 dark:prose-li:text-slate-300",
                      "marker:text-blue-500 dark:marker:text-blue-400",
                      "prose-code:text-blue-700 dark:prose-code:text-blue-300",
                      fs.lineH, fs.prose, fs.bodySize,
                      justify ? "text-justify" : "text-left",
                    ].join(" ")}
                  >
                    {highlightQuery(items[activeLectureIndex].answer, searchQuery)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ════════════════════════════════
                Mobile Footer Navigation
            ════════════════════════════════ */}
            <div className="flex sm:hidden items-center justify-between gap-2 p-3 border-t border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#161c26] shrink-0">
              <button
                onClick={() => navigate(Math.max(0, activeLectureIndex - 1), "right")}
                disabled={activeLectureIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums font-mono">
                {activeLectureIndex + 1} / {items.length}
              </span>
              <button
                onClick={() => navigate(Math.min(items.length - 1, activeLectureIndex + 1), "left")}
                disabled={activeLectureIndex === items.length - 1}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-sm font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all hover:bg-blue-700 dark:hover:bg-blue-400"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* ── Auto-play indicator bar ── */}
            {autoPlay && (
              <motion.div
                key="autoplay-bar"
                className="h-[3px] bg-primary/70 shrink-0"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
            )}
          </DialogContent>
        )}
      </Dialog>

      {/* ══════════════════════════════════════════════
          Section Header
      ══════════════════════════════════════════════ */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center w-12 h-12 shadow-[0_0_20px_rgba(var(--primary),0.3)] rounded-xl bg-primary/10 text-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 blur-md" />
          <span className="relative z-10">{icon}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
          {title}
        </h2>
      </div>

      {/* ══════════════════════════════════════════════
          Accordion Cards
      ══════════════════════════════════════════════ */}
      <Accordion type="single" collapsible className="space-y-5 w-full">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              layout
              key={item.question}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.5,
                delay: (index % 10) * 0.05,
                type: "spring",
                stiffness: 90,
              }}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/0 to-glow-blue/0 group-hover:from-primary/20 group-hover:via-glow-blue/15 group-hover:to-primary/0 rounded-3xl blur-xl transition duration-700 opacity-0 group-hover:opacity-100" />

              {/* Lecture Mode button */}
              <div className="absolute right-14 top-[18px] sm:top-[20px] z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection("none");
                    setActiveLectureIndex(index);
                  }}
                  className="group/btn flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 hover:bg-primary/30 hover:border-primary/50 text-primary transition-all duration-500 opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-[0_0_15px_rgba(var(--primary),0.1)] hover:shadow-[0_0_25px_rgba(var(--primary),0.3)] hover:-translate-y-0.5 pointer-events-none group-hover:pointer-events-auto"
                  title="Open in Lecture Mode"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest hidden sm:block opacity-0 group-hover/btn:opacity-100 transition-all whitespace-nowrap overflow-hidden max-w-0 group-hover/btn:max-w-[120px] duration-500 ease-out">
                    Lecture
                  </span>
                </button>
              </div>

              <AccordionItem
                id={`accordion-${id}-${index}`}
                value={`${id}-${index}`}
                className="relative bg-background/50 backdrop-blur-2xl rounded-2xl border border-border/40 shadow-lg hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 data-[state=open]:border-primary/30 data-[state=open]:bg-gradient-to-b data-[state=open]:from-primary/10 data-[state=open]:to-transparent data-[state=open]:shadow-[0_0_40px_rgba(var(--primary),0.15)] transition-all duration-500 overflow-hidden pr-3"
              >
                <AccordionTrigger className="px-6 py-6 sm:py-7 text-left text-foreground hover:text-primary transition-all duration-300 hover:no-underline group/trigger">
                  <span className="flex items-center gap-5 relative z-10 w-full pr-14 sm:pr-32">
                    <span className="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-primary/30 group-hover/trigger:bg-primary group-hover/trigger:scale-[1.3] group-hover/trigger:shadow-[0_0_15px_rgba(var(--primary),0.8)] transition-all duration-500" />
                    <span className="text-[16px] sm:text-[18px] font-semibold leading-relaxed text-foreground/80 group-hover/trigger:text-foreground transition-colors mix-blend-plus-lighter">
                      {highlightQuery(item.question, searchQuery)}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 sm:px-12 pb-8 text-muted-foreground/80 text-[15.5px] leading-loose">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {highlightQuery(item.answer, searchQuery)}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Accordion>
    </section>
  );
};

export default FAQSection;
