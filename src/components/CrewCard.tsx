import { useLanguage } from "@/contexts/LanguageContext";

interface CrewMember {
  name: string;
  role: string;
  birthDate: string;
  age: number;
  nationality: string;
  formation: string;
  experience: string;
  agency: string;
  flag: string;
  image?: string;
}

const CrewCard = ({ member }: { member: CrewMember }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-glass rounded-2xl overflow-hidden glow-border hover:glow-border-active transition-all duration-300 hover:scale-[1.01] flex flex-col">
      {/* Portrait Banner */}
      {member.image ? (
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ objectPosition: "center 15%" }}
          />
          {/* Gradient overlay — only at the bottom so face stays bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          {/* Name + role overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between">
              <div>
                <h4 className="font-heading font-bold text-white text-xl leading-tight drop-shadow-lg">
                  {member.name}
                </h4>
                <span className="inline-block mt-1 text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/20 backdrop-blur-sm border border-primary/30 px-2.5 py-0.5 rounded-md">
                  {member.role}
                </span>
              </div>
              <span className="text-3xl drop-shadow-xl">{member.flag}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback if no image */
        <div className="relative w-full p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h4 className="font-heading font-bold text-foreground text-xl">{member.name}</h4>
            <span className="inline-block mt-1 text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md">
              {member.role}
            </span>
          </div>
          <span className="text-3xl">{member.flag}</span>
        </div>
      )}

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-3">
        {/* Agency badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {member.agency}
          </span>
          <span className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] text-muted-foreground">{member.nationality}</span>
        </div>

        {/* Fields */}
        <div className="grid gap-2.5">
          <InfoRow
            label={language === "fr" ? "Né(e)" : "Born"}
            value={`${member.birthDate} (${member.age} ${language === "fr" ? "ans" : "yo"})`}
          />
          <InfoRow
            label={language === "fr" ? "Formation" : "Background"}
            value={member.formation}
          />
          <InfoRow
            label={language === "fr" ? "Expérience" : "Experience"}
            value={member.experience}
          />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] uppercase tracking-widest font-bold text-foreground/30">
      {label}
    </span>
    <p className="text-[13px] text-foreground/75 leading-snug">{value}</p>
  </div>
);

export default CrewCard;
