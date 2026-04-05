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
}

const CrewCard = ({ member }: { member: CrewMember }) => {
  return (
    <div className="bg-glass rounded-lg p-5 glow-border hover:glow-border-active hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-heading font-bold text-foreground text-lg">{member.name}</h4>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {member.role}
          </span>
        </div>
        <span className="text-2xl">{member.flag}</span>
      </div>
      <div className="space-y-1.5 text-sm text-muted-foreground">
        <p><span className="text-foreground/70">Né(e) :</span> {member.birthDate} ({member.age} ans)</p>
        <p><span className="text-foreground/70">Formation :</span> {member.formation}</p>
        <p><span className="text-foreground/70">Expérience :</span> {member.experience}</p>
        <p><span className="text-foreground/70">Agence :</span> {member.agency}</p>
      </div>
    </div>
  );
};

export default CrewCard;
