import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-background/50 backdrop-blur border border-white/10 p-2 flex items-center justify-center rounded-full text-foreground hover:bg-primary/20 hover:text-primary transition-all glow-border"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? (
        <Sun size={18} className="animate-in fade-in zoom-in duration-300" />
      ) : (
        <Moon size={18} className="animate-in fade-in zoom-in duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
