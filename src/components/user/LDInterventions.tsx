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
    serviceProvider: string;
    mode: string;
    cost: string;
    contact: string;
    deadline: string;
    trainingDate?: string;
    competencyType?: string;
  };
}

interface LDInterventionsProps {
  onRegister: (training: { title: string; competencyType?: string; trainingDate?: string }) => void;
}

const trainings: Record<string, Training[]> = {
  "in-house": [
    {
      title: "Human-Centered Leadership: Redefining Success with Well-Being in Mind",
      duration: "2 days",
      level: "All Employees",
      description: "Discover how to lead with empathy and purpose...",
      image: "https://lh3.googleusercontent.com/u/0/d/1IZx5PR_AUtS9NdIHSE14b1cOQqPc6PO6=w1000",
      details: {
        outline: "This course empowers leaders to embrace a people-first approach to leadership by integrating well-being, empathy, and purpose into their management style.",
        competencies: "Crafting and Nurturing High-Performing Organizations",
        targetOffices: "All Employees",
        serviceProvider: "Selected Learning Service Provider",
        mode: "Virtual Training",
        cost: "Sponsored",
        contact: "Jose Mari A. Hulleza",
        deadline: "03 DECEMBER 2025",
        competencyType: "leadership",
        trainingDate: "December 4-5, 2025",
      },
    },
    { title: "Team Building & Collaboration", duration: "1 day", level: "All Levels", description: "Strengthen team dynamics and enhance collaborative work environments." },
    { title: "Effective Communication Skills", duration: "3 days", level: "Beginner", description: "Master professional communication techniques for workplace success." },
  ],
  "out-of-house": [
    { title: "Industry Conference 2025", duration: "3 days", level: "Advanced", description: "Network with industry leaders and gain insights into emerging trends." },
    { title: "Professional Development Seminar", duration: "2 days", level: "All Levels", description: "Enhance your career with cutting-edge professional development strategies." },
  ],
  "self-paced": [
    {
      title: "Service Excellence: A Guide to RA 11032 Citizen's Charter",
      duration: "Self-Paced",
      level: "All Levels",
      description: "Master the protocols of the Ease of Doing Business Act to ensure efficient and transparent government service delivery.",
      image: "https://lh3.googleusercontent.com/d/1up9Yd6ztQT6QHmglkK_tLqyK4aPviOEb",
      buttonText: "Start Your Learning",
      link: "https://hrdd-ldu.github.io/dotr_citizen-s_charter/",
    },
    {
      title: "The Influence of Digitalization on Psychological Well-Being",
      duration: "Self-Paced",
      level: "All Levels",
      description: "Explore the impact of digital technology on mental health and learn strategies for maintaining digital well-being.",
      image: "https://lh3.googleusercontent.com/d/1kZ1xFHEQcAQu29gcwCawLRIjlSaNP7oU",
      buttonText: "Start Your Learning",
      link: "https://hrdd-ldu.github.io/dotr_digital_wellness/",
    },
  ],
};

const colorThemes: Record<string, { gradient: string; glow: string; text: string; button: string }> = {
  "in-house": { gradient: "linear-gradient(145deg, #1e3a5f 0%, #0d1b2a 100%)", glow: "#4facfe", text: "#4facfe", button: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  "out-of-house": { gradient: "linear-gradient(145deg, #2d1b4e 0%, #1a0a2e 100%)", glow: "#a855f7", text: "#a855f7", button: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)" },
  "self-paced": { gradient: "linear-gradient(145deg, #1a3c34 0%, #0d1f1a 100%)", glow: "#10b981", text: "#10b981", button: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)" },
};

export default function LDInterventions({ onRegister }: LDInterventionsProps) {
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const quarters = [
    { title: "First Quarter", gradient: "linear-gradient(145deg, #1e3a5f, #0d1b2a)", glow: "#4facfe", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { title: "Second Quarter", gradient: "linear-gradient(145deg, #2d1b4e, #1a0a2e)", glow: "#a855f7", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { title: "Third Quarter", gradient: "linear-gradient(145deg, #1a3c34, #0d1f1a)", glow: "#10b981", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { title: "Fourth Quarter", gradient: "linear-gradient(145deg, #4a2c1a, #2d1810)", glow: "#f59e0b", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  ];

  const currentTraining = selectedType ? trainings[selectedType]?.[currentIndex] : null;
  const theme = selectedType ? colorThemes[selectedType] : null;
  const totalTrainings = selectedType ? trainings[selectedType]?.length || 0 : 0;

  const handleRegister = () => {
    if (!currentTraining) return;
    if (currentTraining.link) {
      window.open(currentTraining.link, "_blank");
    } else {
      onRegister({
        title: currentTraining.title,
        competencyType: currentTraining.details?.competencyType,
        trainingDate: currentTraining.details?.trainingDate,
      });
      setSelectedQuarter(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-6 tracking-tight uppercase">
          Learning and Development Programs
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed text-justify">
          The Learning and Development (L&D) Programs at the DOTr will be the entry point for bridging the skills gaps of every workplace and employee through the adoption of the Department's own Competency-Based Framework.
        </p>
        <div className="flex items-center justify-center gap-2 mt-10">
          <div className="w-12 h-1 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-12 h-1 rounded-full bg-amber-500" />
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
            <div className="relative z-10 flex items-center justify-between">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">{q.title}</h2>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${q.glow}, ${q.glow}88)` }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={q.icon} /></svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <footer className="text-center">
        <p className="font-display text-muted-foreground text-sm tracking-wide">Click on any quarter to explore detailed insights</p>
      </footer>

      {/* Modal */}
      {selectedQuarter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85" onClick={() => setSelectedQuarter(null)}>
          <div className="relative max-w-5xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar" style={{ border: "1px solid rgba(255,255,255,0.1)" }} onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button onClick={() => setSelectedQuarter(null)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-all hover:rotate-90 z-50">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {!selectedType ? (
              <>
                {/* Back */}
                <div className="text-center mb-12">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{selectedQuarter}</h2>
                  <p className="text-xl text-gray-300">Training Programs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: "in-house", label: "In-House", desc: "Collaborative learning within your organization", gradient: colorThemes["in-house"].gradient, glow: colorThemes["in-house"].glow },
                    { id: "out-of-house", label: "Out-of-House", desc: "External workshops and seminars", gradient: colorThemes["out-of-house"].gradient, glow: colorThemes["out-of-house"].glow },
                    { id: "self-paced", label: "Self-Paced", desc: "Learn on your schedule with curated courses", gradient: colorThemes["self-paced"].gradient, glow: colorThemes["self-paced"].glow },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setSelectedType(t.id); setCurrentIndex(0); setShowDetail(false); }}
                      className="group relative rounded-2xl p-8 text-left transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                      style={{ background: t.gradient, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.5)" }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: t.glow }} />
                      <div className="relative z-10">
                        <h3 className="font-display text-2xl font-bold text-white mb-3">{t.label}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{t.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : !showDetail ? (
              <>
                <button onClick={() => setSelectedType(null)} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 font-display font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{selectedType.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("-")} Training</h3>
                </div>
                {currentTraining && (
                  <div className="max-w-2xl mx-auto relative rounded-2xl p-8 md:p-10 overflow-hidden" style={{ background: theme?.gradient, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
                    {currentTraining.image && (
                      <div className="absolute inset-0 z-0">
                        <img src={currentTraining.image} alt="" className="w-full h-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-black/60" />
                      </div>
                    )}
                    <div className="relative z-10">
                      <h4 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">{currentTraining.title}</h4>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-2 rounded-lg bg-black/30 text-sm font-medium" style={{ color: theme?.text }}>⏱ {currentTraining.duration}</span>
                        <span className="px-4 py-2 rounded-lg bg-black/30 text-sm font-medium" style={{ color: theme?.text }}>📊 {currentTraining.level}</span>
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">{currentTraining.description}</p>
                      <button
                        onClick={() => currentTraining.details ? setShowDetail(true) : handleRegister()}
                        className="w-full py-4 rounded-xl font-display font-semibold text-white transition-all hover:scale-105"
                        style={{ background: theme?.button }}
                      >
                        {currentTraining.link ? (currentTraining.buttonText || "Open Course") : "Learn More"}
                      </button>
                      {/* Nav */}
                      <div className="flex justify-between items-center mt-6">
                        <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700/80 hover:bg-gray-600 text-white disabled:opacity-30">←</button>
                        <span className="text-sm text-gray-400">{currentIndex + 1} / {totalTrainings}</span>
                        <button disabled={currentIndex >= totalTrainings - 1} onClick={() => setCurrentIndex(i => i + 1)} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700/80 hover:bg-gray-600 text-white disabled:opacity-30">→</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <button onClick={() => setShowDetail(false)} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 font-display font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  Back to Trainings
                </button>
                {currentTraining?.details && (
                  <div className="space-y-6">
                    {currentTraining.image && (
                      <div className="rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                        <img src={currentTraining.image} alt={currentTraining.title} className="w-full h-auto" />
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                        <h3 className="font-display text-lg text-cyan-400 font-semibold mb-3 uppercase tracking-wider">Course Outline/Objectives</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">{currentTraining.details.outline}</p>
                      </div>
                      <div className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                        <h3 className="font-display text-lg text-purple-400 font-semibold mb-3 uppercase tracking-wider">Key Details</h3>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3"><span className="font-semibold text-white min-w-[140px]">Competencies:</span>{currentTraining.details.competencies}</li>
                          <li className="flex gap-3"><span className="font-semibold text-white min-w-[140px]">Target Offices:</span>{currentTraining.details.targetOffices}</li>
                          <li className="flex gap-3"><span className="font-semibold text-white min-w-[140px]">Mode:</span>{currentTraining.details.mode}</li>
                          <li className="flex gap-3"><span className="font-semibold text-white min-w-[140px]">Cost:</span><span className="text-emerald-400 font-medium">{currentTraining.details.cost}</span></li>
                          <li className="flex gap-3"><span className="font-semibold text-white min-w-[140px]">Contact:</span>{currentTraining.details.contact}</li>
                          <li className="flex gap-3"><span className="font-semibold text-white min-w-[140px]">Deadline:</span><span className="text-amber-400 font-medium">{currentTraining.details.deadline}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <button onClick={handleRegister} className="w-full max-w-xl py-5 rounded-xl font-display text-xl font-bold text-white shadow-lg hover:shadow-amber-500/40 transform hover:-translate-y-1 transition-all" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}>
                        Register Here
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
