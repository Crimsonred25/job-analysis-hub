interface CSCExamGuidesProps {
  section?: string;
}

const sections: Record<string, { title: string; color: string; gradient: string; icon: string; files: { name: string; size: string }[]; content?: string }> = {
  tips: {
    title: "Helpful Tips You Need To Know",
    color: "from-blue-500 to-blue-600",
    gradient: "from-white via-blue-50 to-white dark:from-card dark:via-card dark:to-card",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    files: [{ name: "Top 10 Exam Preparation Strategies.pdf", size: "2.4 MB" }],
    content: "Prepare strategically by understanding the exam format, time management techniques, and common question patterns. Practice with timed mock exams to build speed and accuracy.",
  },
  reviewers: {
    title: "Reviewers",
    color: "from-purple-500 to-purple-600",
    gradient: "from-white via-purple-50 to-white dark:from-card dark:via-card dark:to-card",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    files: [{ name: "Comprehensive CSC Reviewer 2025.pdf", size: "15.8 MB" }],
  },
  numerical: {
    title: "Numerical Reasoning",
    color: "from-emerald-500 to-emerald-600",
    gradient: "from-white via-emerald-50 to-white dark:from-card dark:via-card dark:to-card",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    files: [{ name: "Math and Logic Practice Problems.pdf", size: "5.2 MB" }],
  },
  grammar: {
    title: "Grammar and Comprehension",
    color: "from-amber-500 to-amber-600",
    gradient: "from-white via-amber-50 to-white dark:from-card dark:via-card dark:to-card",
    icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
    files: [{ name: "English Grammar Refresher.pdf", size: "3.1 MB" }],
  },
  general: {
    title: "General Information, The Philippine Constitution, and Other Events",
    color: "from-red-500 to-red-600",
    gradient: "from-white via-red-50 to-white dark:from-card dark:via-card dark:to-card",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    files: [{ name: "Philippine Constitution Highlights.pdf", size: "4.5 MB" }],
  },
};

export default function CSCExamGuides({ section = "tips" }: CSCExamGuidesProps) {
  const s = sections[section] || sections.tips;
  const colorMap: Record<string, string> = {
    tips: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    reviewers: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    numerical: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    grammar: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    general: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  };

  return (
    <div className={`bg-gradient-to-br ${s.gradient} rounded-2xl shadow-lg border border-border p-6 transition-colors`}>
      <h3 className="font-semibold text-foreground text-xl mb-6 flex items-center gap-2">
        <span className={`w-1 h-6 bg-gradient-to-b ${s.color} rounded-full`} />
        {s.title}
      </h3>

      {s.content && <p className="text-muted-foreground mb-6">{s.content}</p>}

      <div className="divide-y divide-border">
        {s.files.map((f) => (
          <div key={f.name} className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${colorMap[section] || colorMap.tips}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon} />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.size} • PDF</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-muted hover:bg-accent text-muted-foreground rounded-lg text-sm font-medium transition-colors">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
