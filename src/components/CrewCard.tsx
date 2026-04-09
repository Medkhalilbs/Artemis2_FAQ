import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt configuration
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates from -0.5 to 0.5 relative to center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-glass rounded-2xl overflow-hidden glow-border hover:glow-border-active transition-all duration-300 hover:shadow-[0_20px_40px_rgba(var(--primary),0.15)] flex flex-col relative z-10"
    >
      {/* 3D Depth translation container */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full bg-background/40">
        {/* Portrait Banner */}
        {member.image ? (
          <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              style={{ objectPosition: "center 15%" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
            {/* Name + role overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="font-heading font-bold text-white text-xl leading-tight drop-shadow-xl">
                    {member.name}
                  </h4>
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/20 backdrop-blur-md border border-primary/40 px-2.5 py-0.5 rounded-md shadow-lg">
                    {member.role}
                  </span>
                </div>
                <span className="text-3xl drop-shadow-2xl">{member.flag}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback if no image */
          <div className="relative w-full p-5 border-b border-white/5 flex items-center justify-between pointer-events-none">
            <div>
              <h4 className="font-heading font-bold text-foreground text-xl">{member.name}</h4>
              <span className="inline-block mt-1 text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md shadow-lg">
                {member.role}
              </span>
            </div>
            <span className="text-3xl">{member.flag}</span>
          </div>
        )}

        {/* Info Section */}
        <div className="p-4 flex flex-col gap-3 pointer-events-none">
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
    </motion.div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] uppercase tracking-widest font-bold text-foreground/30">
      {label}
    </span>
    <p className="text-[13px] text-foreground/80 leading-snug font-medium">{value}</p>
  </div>
);

export default CrewCard;
