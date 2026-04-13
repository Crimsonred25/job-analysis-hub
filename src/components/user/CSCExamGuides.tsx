export default function CSCExamGuides() {
  const sections = [
    {
      id: "tips",
      title: "Helpful Tips You Need To Know",
      color: "from-blue-500 to-blue-600",
      content: "Prepare strategically by understanding the exam format, time management techniques, and common question patterns. Practice with timed mock exams to build speed and accuracy."
    },
    {
      id: "reviewers",
      title: "Reviewers",
      color: "from-purple-500 to-purple-600",
      files: [
        { name: "CSC Professional Reviewer 2024.pdf", size: "5.2 MB" },
        { name: "Sub-Professional Reviewer.pdf", size: "3.8 MB" },
      ]
    },
    {
      id: "numerical",
      title: "Numerical Reasoning",
      color: "from-emerald-500 to-emerald-600",
      files: [
        { name: "Numerical Reasoning Practice Set.pdf", size: "2.4 MB" },
        { name: "Math Shortcuts & Techniques.pdf", size: "1.9 MB" },
      ]
    },
    {
      id: "grammar",
      title: "Grammar and Comprehension",
      color: "from-amber-500 to-amber-600",
      files: [
        { name: "English Grammar Refresher.pdf", size: "3.1 MB" },
      ]
    },
    {
      id: "general",
      title: "General Info & Constitution",
      color: "from-red-500 to-red-600",
      files: [
        { name: "Philippine Constitution Highlights.pdf", size: "4.5 MB" },
      ]
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight">
          CIVIL SERVICE COMMISSION<br />
          <span className="text-brand-blue-light">EXAMINATION STUDY GUIDES</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-brand-blue-light mx-auto rounded-full" />
      </div>

      <div className="bg-card rounded-3xl p-10 shadow-xl border border-border relative overflow-hidden">
        <p className="text-lg text-muted-foreground leading-relaxed text-justify">
          Managed by the Civil Service Commission (CSC), the Civil Service Examination is your gateway should you wish to be a part of the working force in government agencies. Check out this pool of tips and reviewers to help you ace your test.
        </p>
        <div className="bg-accent rounded-2xl p-6 border-l-4 border-primary mt-6">
          <p className="text-muted-foreground italic">
            "Please take note that these materials are not accredited by the CSC nor any review center for the purpose of offering review classes."
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.id} className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <h3 className="font-bold text-foreground text-xl mb-4 flex items-center gap-2">
              <span className={`w-1 h-6 bg-gradient-to-b ${s.color} rounded-full`} />
              {s.title}
            </h3>
            {s.content && <p className="text-muted-foreground">{s.content}</p>}
            {s.files && (
              <div className="divide-y divide-border">
                {s.files.map((f) => (
                  <div key={f.name} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.size} • PDF</p>
                    </div>
                    <button className="px-4 py-2 bg-muted hover:bg-accent text-muted-foreground rounded-lg text-sm font-medium transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
