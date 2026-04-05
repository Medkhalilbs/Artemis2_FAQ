const sections = [
  
  { id: "bases", label: "Les bases", icon: "🚀" },
  { id: "modele-3d", label: "Modèle 3D", icon: "🛰️" },
  { id: "vaisseau", label: "Vaisseau", icon: "🛸" },
  { id: "equipage", label: "Équipage", icon: "👨‍🚀" },
  { id: "vie-a-bord", label: "Vie à bord", icon: "🛏️" },
  { id: "images", label: "Images", icon: "📷" },
  { id: "divers", label: "Divers", icon: "❓" },
  { id: "planning", label: "Planning", icon: "📅" },
];

const SideNav = () => {
  return (
    <nav className="hidden lg:block fixed top-1/2 -translate-y-1/2 left-6 z-50">
      <div className="bg-glass rounded-xl p-2 space-y-1 glow-border">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            title={section.label}
          >
            <span>{section.icon}</span>
            <span className="hidden xl:inline">{section.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;
