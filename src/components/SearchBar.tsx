import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface SearchBarProps {
  onClick: () => void;
}

const SearchBar = ({ onClick }: SearchBarProps) => {
  const { language } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-xl mx-auto group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-glow-blue rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
      <button
        onClick={onClick}
        className="relative flex items-center w-full pl-12 pr-4 py-4 rounded-xl bg-background/80 backdrop-blur-sm border border-white/10 text-foreground shadow-xl transition-all hover:bg-background/95 hover:border-primary/50 text-left"
      >
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        <span className="text-muted-foreground flex-1 text-base">
          {language === 'fr' ? "Rechercher une question, concept..." : "Search a question, concept..."}
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 bg-background/50 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest shadow-sm pointer-events-none">
          <span className="text-xs">Ctrl</span> F
        </kbd>
      </button>
    </motion.div>
  );
};

export default SearchBar;

