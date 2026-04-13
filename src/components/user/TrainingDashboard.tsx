import { useState } from "react";

interface TrainingDashboardProps {
  onRegister: (training: { title: string; competencyType?: string; trainingDate?: string }) => void;
}

export default function TrainingDashboard({ onRegister }: TrainingDashboardProps) {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      {/* Hero Title */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-600 dark:from-blue-400 dark:to-cyan-400 tracking-tight text-center pb-2">
        WHAT DO YOU WISH TO LEARN?
      </h1>

      {/* Citizen's Charter Section */}
      <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-lg border border-blue-100 dark:border-border relative overflow-hidden group transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6 flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg">01</span>
              CITIZEN'S CHARTER (CC)
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-justify">
              The crafting of the Citizen's Charter, in accordance with Republic Act 11032 and its Implementing Rules and Regulations (IRR), marks a significant milestone in the pursuit of good governance and public service excellence. RA 11032, also known as the Ease of Doing Business and Efficient Government Service Delivery Act of 2018, aims to streamline bureaucratic processes, reduce red tape, and promote transparency and efficiency in the delivery of government services.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center gap-4">
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Available Training</div>
            <button
              onClick={() => onRegister({ title: "Service Excellence: A Guide to RA 11032 Citizen's Charter", competencyType: "core" })}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-muted/50 border border-border text-left hover:bg-accent hover:border-primary cursor-pointer group/btn transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-primary flex-shrink-0 group-hover/btn:bg-primary group-hover/btn:text-primary-foreground transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <span className="block font-bold text-foreground text-lg group-hover/btn:text-primary transition-colors">Service Excellence</span>
                <span className="text-xs text-muted-foreground font-medium">A Guide to RA 11032 Citizen's Charter</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Competencies */}
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-emerald-50 dark:border-border relative overflow-hidden flex flex-col h-full transition-colors">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50 -mr-24 -mt-24 pointer-events-none" />
          <div className="relative z-10 flex-1">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">02</span>
              CORE COMPETENCIES
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-justify">
              Core Competencies are characteristics that, when combined, enable the organization to achieve its goals. It is often referred to as the organizational competencies or the foundational competencies.
            </p>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Modules</div>
              {["Nationalism Through Service Excellence", "Customer/Public Service", "Integrity & Professionalism"].map((mod) => (
                <button key={mod} className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border text-left hover:bg-emerald-50 dark:hover:border-emerald-500 cursor-pointer group/btn transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  </div>
                  <span className="font-bold text-foreground text-sm group-hover/btn:text-emerald-700 dark:group-hover/btn:text-emerald-400">{mod}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Competencies */}
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-purple-50 dark:border-border relative overflow-hidden flex flex-col h-full transition-colors">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 dark:bg-purple-900/10 rounded-full blur-3xl opacity-50 -mr-24 -mt-24 pointer-events-none" />
          <div className="relative z-10 flex-1">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-4">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">03</span>
              LEADERSHIP COMPETENCIES
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-justify">
              Leadership Competencies pertain to competencies expected of personnel occupying supervisory or managerial positions. They are critical for driving organizational performance and guiding teams toward achieving strategic objectives.
            </p>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Modules</div>
              {["Building People", "Crafting High-Performing Organizations", "Championing Strategic Goals"].map((mod) => (
                <button key={mod} className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border text-left hover:bg-purple-50 dark:hover:border-purple-500 cursor-pointer group/btn transition-all">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0 group-hover/btn:bg-purple-600 group-hover/btn:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" /></svg>
                  </div>
                  <span className="font-bold text-foreground text-sm group-hover/btn:text-purple-700 dark:group-hover/btn:text-purple-400">{mod}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quarter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {[
          { title: "First Quarter", gradient: "linear-gradient(145deg, #1e3a5f, #0d1b2a)", glow: "#4facfe", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
          { title: "Second Quarter", gradient: "linear-gradient(145deg, #2d1b4e, #1a0a2e)", glow: "#a855f7", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
          { title: "Third Quarter", gradient: "linear-gradient(145deg, #1a3c34, #0d1f1a)", glow: "#10b981", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
          { title: "Fourth Quarter", gradient: "linear-gradient(145deg, #4a2c1a, #2d1810)", glow: "#f59e0b", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
        ].map((q) => (
          <div
            key={q.title}
            className="quarter-card relative rounded-3xl p-8 cursor-pointer overflow-hidden"
            style={{ background: q.gradient, boxShadow: `0 10px 30px -5px ${q.glow}33` }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: q.glow }} />
            <div className="relative z-10 flex items-center justify-between">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">{q.title}</h2>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${q.glow}, ${q.glow}88)` }}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={q.icon} /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center">
        <p className="font-display text-muted-foreground text-sm tracking-wide">Click on any quarter to explore detailed insights</p>
      </footer>
    </div>
  );
}
