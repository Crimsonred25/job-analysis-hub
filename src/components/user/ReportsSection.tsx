export default function ReportsSection() {
  const departments = [
    { name: "Administration, Finance, and Procurement", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    { name: "Legal and Compliance Service", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
    { name: "Planning and Project Development Service", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { name: "Information and Communications Technology Service", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    { name: "Office of the Secretary", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
    { name: "Internal Audit Service", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border transition-colors">
        <h3 className="font-bold text-foreground mb-6 text-2xl flex items-center gap-2">
          <span className="w-1 h-8 bg-gradient-to-b from-primary to-blue-600 rounded-full" />
          Department Reports
        </h3>
        <p className="text-muted-foreground mb-8">Click on a specific office or department below to view their reports.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <button
              key={dept.name}
              className={`${dept.color} p-6 rounded-2xl text-left hover:scale-[1.02] transition-all shadow-sm border border-transparent hover:border-primary/30`}
            >
              <h4 className="font-bold text-lg mb-1">{dept.name}</h4>
              <p className="text-sm opacity-70">View competency reports</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
