import { useState } from "react";

interface Training {
  title: string;
  duration: string;
  level: string;
  description: string;
  image?: string;
  link?: string;
  buttonText?: string;
  details?: {
    outline: string;
    competencies: string;
    targetOffices: string;
    mode: string;
    cost: string;
    contact: string;
    deadline: string;
    trainingDate?: string;
    competencyType?: string;
  };
}

interface TrainingData {
  [key: string]: Training[];
}

const trainings: TrainingData = {
  "in-house": [
    {
      title: "Leadership Excellence Program",
      duration: "3 Days",
      level: "Mid-Level",
      description: "Develop essential leadership skills for supervisors and division chiefs within the DOTr.",
      details: {
        outline: "This program focuses on strategic thinking, team management, conflict resolution, and decision-making frameworks for DOTr leaders.",
        competencies: "Leadership, Management, Strategic Planning",
        targetOffices: "All DOTr Offices",
        mode: "Face-to-Face, DOTr Training Center",
        cost: "Free (In-House)",
        contact: "HRDD - hrdd@dotr.gov.ph",
        deadline: "TBA",
        trainingDate: "TBA",
        competencyType: "leadership",
      },
    },
    {
      title: "Public Service Values & Ethics",
      duration: "1 Day",
      level: "All Levels",
      description: "Reinforce public service values, ethics, and accountability standards.",
      details: {
        outline: "Covers RA 6713, Code of Conduct and Ethical Standards for Public Officials, workplace integrity practices.",
        competencies: "Core, Ethics, Integrity",
        targetOffices: "All DOTr Personnel",
        mode: "Hybrid",
        cost: "Free (In-House)",
        contact: "HRDD",
        deadline: "TBA",
        competencyType: "core",
      },
    },
  ],
  "out-house": [
    {
      title: "Advanced Data Analytics",
      duration: "5 Days",
      level: "Advanced",
      description: "Master data analytics tools and techniques for evidence-based policy-making.",
      details: {
        outline: "Python/R for data analysis, visualization dashboards, statistical methods for transport data.",
        competencies: "Functional, Technical, Analytical",
        targetOffices: "Planning & IT Divisions",
        mode: "Online via Zoom",
        cost: "₱15,000",
        contact: "training-provider@example.com",
        deadline: "TBA",
        competencyType: "functional",
      },
    },
  ],
  "self-paced": [
    {
      title: "Microsoft Office Mastery",
      duration: "Self-Paced",
      level: "Beginner to Advanced",
      description: "Comprehensive guide to Excel, Word, PowerPoint, and Outlook for office productivity.",
      link: "https://learn.microsoft.com",
      buttonText: "Open Course",
    },
    {
      title: "Project Management Fundamentals",
      duration: "Self-Paced",
      level: "Beginner",
      description: "Learn the fundamentals of project planning, execution, monitoring, and closure.",
      link: "https://www.coursera.org",
      buttonText: "Open Course",
    },
  ],
};

const colorThemes: Record<string, { gradient: string; text: string; button: string }> = {
  "in-house": {
    gradient: "linear-gradient(145deg, #1e3a5f, #0d1b2a)",
    text: "#67e8f9",
    button: "linear-gradient(135deg, #4facfe, #00f2fe)",
  },
  "out-house": {
    gradient: "linear-gradient(145deg, #2d1b4e, #1a0a2e)",
    text: "#c084fc",
    button: "linear-gradient(135deg, #a855f7, #ec4899)",
  },
  "self-paced": {
    gradient: "linear-gradient(145deg, #1a3c34, #0d1f1a)",
    text: "#6ee7b7",
    button: "linear-gradient(135deg, #10b981, #14b8a6)",
  },
};

export default function LDInterventions() {
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const quarters = [
    { title: "First Quarter", gradient: "linear-gradient(145deg, #1e3a5f, #0d1b2a)", glow: "#4facfe" },
    { title: "Second Quarter", gradient: "linear-gradient(145deg, #2d1b4e, #1a0a2e)", glow: "#a855f7" },
    { title: "Third Quarter", gradient: "linear-gradient(145deg, #1a3c34, #0d1f1a)", glow: "#10b981" },
    { title: "Fourth Quarter", gradient: "linear-gradient(145deg, #4a2c1a, #2d1810)", glow: "#f59e0b" },
  ];

  const learningTypes = [
    { id: "in-house", label: "In-House", icon: "🏢", desc: "Internal DOTr training programs" },
    { id: "out-house", label: "Out-House", icon: "🌐", desc: "External provider training" },
    { id: "self-paced", label: "Self-Paced", icon: "📚", desc: "Online self-directed learning" },
  ];

  const currentTraining = selectedType ? trainings[selectedType]?.[currentIndex] : null;
  const theme = selectedType ? colorThemes[selectedType] : null;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight uppercase">
          Learning and Development Programs
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed text-justify">
          The Learning and Development (L&D) Programs at the DOTr will be the entry point for bridging the skills gaps of every workplace and employee through the adoption of the Department's own Competency-Based Framework.
        </p>
        <div className="flex items-center justify-center gap-2 mt-10">
          <div className="w-12 h-1 rounded-full bg-warning" />
          <div className="w-3 h-3 rounded-full bg-warning" />
          <div className="w-12 h-1 rounded-full bg-warning" />
        </div>
      </div>

      {/* Quarter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {quarters.map((q) => (
          <button
            key={q.title}
            onClick={() => { setSelectedQuarter(q.title); setSelectedType(null); setShowDetail(false); }}
            className="quarter-card relative rounded-3xl p-8 cursor-pointer overflow-hidden text-left"
            style={{ background: q.gradient, boxShadow: `0 10px 30px -5px ${q.glow}33` }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: q.glow }} />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">{q.title}</h2>
            </div>
          </button>
        ))}
      </div>

      {/* Quarter Modal */}
      {selectedQuarter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4" onClick={() => setSelectedQuarter(null)}>
          <div
            className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-2xl font-bold font-display text-foreground">{selectedQuarter}</h3>
              <button onClick={() => setSelectedQuarter(null)} className="text-muted-foreground hover:text-foreground text-xl font-bold">✕</button>
            </div>

            {!selectedType ? (
              <div className="p-6 space-y-4">
                <p className="text-muted-foreground text-sm mb-4">Select a learning type:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {learningTypes.map((lt) => (
                    <button
                      key={lt.id}
                      onClick={() => { setSelectedType(lt.id); setCurrentIndex(0); setShowDetail(false); }}
                      className="p-6 rounded-xl border border-border hover:border-primary hover:bg-accent transition-all text-left"
                    >
                      <div className="text-3xl mb-3">{lt.icon}</div>
                      <h4 className="font-bold text-foreground">{lt.label}</h4>
                      <p className="text-sm text-muted-foreground">{lt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : !showDetail ? (
              <div className="p-6">
                <button onClick={() => setSelectedType(null)} className="text-sm text-primary hover:underline mb-4 flex items-center gap-1">
                  ← Back to types
                </button>
                {currentTraining && (
                  <div className="rounded-2xl p-8 text-primary-foreground relative overflow-hidden" style={{ background: theme?.gradient }}>
                    <h4 className="font-display text-2xl font-bold mb-3">{currentTraining.title}</h4>
                    <div className="flex gap-3 mb-4">
                      <span className="px-3 py-1 rounded-lg bg-foreground/20 text-sm" style={{ color: theme?.text }}>⏱ {currentTraining.duration}</span>
                      <span className="px-3 py-1 rounded-lg bg-foreground/20 text-sm" style={{ color: theme?.text }}>📊 {currentTraining.level}</span>
                    </div>
                    <p className="text-primary-foreground/80 text-lg mb-6">{currentTraining.description}</p>
                    <div className="flex gap-3">
                      {currentTraining.link ? (
                        <a href={currentTraining.link} target="_blank" rel="noopener noreferrer"
                          className="px-6 py-3 rounded-xl font-bold text-primary-foreground" style={{ background: theme?.button }}>
                          {currentTraining.buttonText || "Open Course"}
                        </a>
                      ) : currentTraining.details ? (
                        <button onClick={() => setShowDetail(true)}
                          className="px-6 py-3 rounded-xl font-bold text-primary-foreground" style={{ background: theme?.button }}>
                          Learn More
                        </button>
                      ) : null}
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between mt-6">
                      <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex((i) => i - 1)}
                        className="px-4 py-2 rounded-lg bg-foreground/20 text-primary-foreground disabled:opacity-30"
                      >←</button>
                      <span className="text-sm text-primary-foreground/60">
                        {currentIndex + 1} / {trainings[selectedType]?.length || 0}
                      </span>
                      <button
                        disabled={currentIndex >= (trainings[selectedType]?.length || 1) - 1}
                        onClick={() => setCurrentIndex((i) => i + 1)}
                        className="px-4 py-2 rounded-lg bg-foreground/20 text-primary-foreground disabled:opacity-30"
                      >→</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                <button onClick={() => setShowDetail(false)} className="text-sm text-primary hover:underline mb-4 flex items-center gap-1">
                  ← Back to carousel
                </button>
                {currentTraining?.details && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted rounded-xl p-6">
                      <h3 className="font-bold text-primary mb-3 uppercase tracking-wider text-sm">Course Outline</h3>
                      <p className="text-muted-foreground">{currentTraining.details.outline}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-6">
                      <h3 className="font-bold text-primary mb-3 uppercase tracking-wider text-sm">Key Details</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong className="text-foreground">Competencies:</strong> {currentTraining.details.competencies}</li>
                        <li><strong className="text-foreground">Target Offices:</strong> {currentTraining.details.targetOffices}</li>
                        <li><strong className="text-foreground">Mode:</strong> {currentTraining.details.mode}</li>
                        <li><strong className="text-foreground">Cost:</strong> {currentTraining.details.cost}</li>
                        <li><strong className="text-foreground">Contact:</strong> {currentTraining.details.contact}</li>
                        <li><strong className="text-foreground">Deadline:</strong> {currentTraining.details.deadline}</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
