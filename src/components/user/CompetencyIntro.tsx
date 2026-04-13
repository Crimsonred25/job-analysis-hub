export default function CompetencyIntro() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
        <h3 className="font-bold text-foreground mb-4 text-xl flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-primary to-brand-blue-light rounded-full" />
          Competency Introduction
        </h3>
        <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingTop: "56.25%" }}>
          <iframe
            loading="lazy"
            className="absolute inset-0 w-full h-full border-none"
            src="https://www.canva.com/design/DAG4b-Sm0Og/b791BUQ43v-qLEyKJJVVfw/view?embed"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-muted-foreground mt-4 italic">
          Review the presentation above to understand the core competencies essential for your role.
        </p>
      </div>
    </div>
  );
}
