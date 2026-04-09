import { useLanguage } from "@/contexts/LanguageContext";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, BookOpen, Rocket, Shield, Globe2, Moon, Camera, Settings, Users, Book } from "lucide-react";
import React, { useMemo } from "react";

import { basesItems, vieABordItems, imagesItems, diversItems, survolItems, bouclierItems, retourItems, lexiqueItems } from "@/data/faqData";
import { basesItemsEN, vieABordItemsEN, imagesItemsEN, diversItemsEN, survolItemsEN, bouclierItemsEN, retourItemsEN, lexiqueItemsEN } from "@/data/faqDataEN";

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  category?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: FAQItem) => void;
}

const CommandPalette = ({ open, onOpenChange, onSelect }: CommandPaletteProps) => {
  const { language } = useLanguage();

  const data = useMemo(() => {
    const isFr = language === 'fr';
    return [
      { id: "bases", label: isFr ? "Bases" : "Basics", icon: <Rocket className="w-4 h-4 text-blue-500" />, items: isFr ? basesItems : basesItemsEN },
      { id: "survol", label: isFr ? "Survol" : "Flyby", icon: <Moon className="w-4 h-4 text-gray-300" />, items: isFr ? survolItems : survolItemsEN },
      { id: "bouclier", label: isFr ? "Bouclier" : "Radiation Shield", icon: <Shield className="w-4 h-4 text-red-400" />, items: isFr ? bouclierItems : bouclierItemsEN },
      { id: "retour", label: isFr ? "Retour" : "Return", icon: <Globe2 className="w-4 h-4 text-green-500" />, items: isFr ? retourItems : retourItemsEN },
      { id: "equipage", label: isFr ? "Équipage/Vie" : "Crew/Life", icon: <Users className="w-4 h-4 text-purple-400" />, items: isFr ? vieABordItems : vieABordItemsEN },
      { id: "images", label: isFr ? "Média" : "Media", icon: <Camera className="w-4 h-4 text-yellow-400" />, items: isFr ? imagesItems : imagesItemsEN },
      { id: "divers", label: isFr ? "Divers" : "Misc", icon: <Settings className="w-4 h-4 text-gray-400" />, items: isFr ? diversItems : diversItemsEN },
      { id: "lexique", label: isFr ? "Lexique" : "Lexicon", icon: <Book className="w-4 h-4 text-orange-400" />, items: isFr ? lexiqueItems : lexiqueItemsEN },
    ];
  }, [language]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="relative">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl z-[-1]" />
        <CommandInput placeholder={language === 'fr' ? "Chercher une question, concept, ou procédure..." : "Search a question, concept, or procedure..."} />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty className="py-8 text-center text-muted-foreground flex flex-col items-center gap-3">
            <Search className="w-8 h-8 opacity-20" />
            <p>{language === 'fr' ? "Aucun signal d'information trouvé." : "No information signal found."}</p>
          </CommandEmpty>
          
          {data.map((category) => (
            <CommandGroup key={category.id} heading={category.label}>
              {category.items.map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    const elemId = `accordion-${category.id}-${index}`;
                    const elem = document.getElementById(elemId);
                    if (elem) {
                      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      const trigger = elem.querySelector('button');
                      if (trigger && trigger.getAttribute('data-state') !== 'open') {
                        trigger.click();
                      }
                    }
                    if (onSelect) {
                      onSelect({ ...item, category: category.label });
                    }
                    onOpenChange(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 cursor-pointer data-[selected=true]:bg-primary/20 data-[selected=true]:text-primary transition-colors"
                >
                  <div className="shrink-0 opacity-80">{category.icon}</div>
                  <span className="flex-1 font-medium leading-relaxed">{item.question}</span>
                  <BookOpen className="w-4 h-4 opacity-0 scale-75 group-data-[selected=true]:opacity-100 group-data-[selected=true]:scale-100 transition-all shrink-0 text-primary" />
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </div>
    </CommandDialog>
  );
};

export default CommandPalette;
