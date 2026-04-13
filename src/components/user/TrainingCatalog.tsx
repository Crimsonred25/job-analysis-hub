import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Clock, Users, MapPin } from "lucide-react";

interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  competencies: string;
  target: string;
  cost: string;
  mode: string;
}

export default function TrainingCatalog() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [showNomForm, setShowNomForm] = useState(false);
  const [justification, setJustification] = useState("");
  const [competencyType, setCompetencyType] = useState("Core Competency");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("trainings").select("*").eq("is_active", true);
      if (data) setTrainings(data as Training[]);
    };
    load();
  }, []);

  const handleNominate = async () => {
    if (!selectedTraining || !user) return;
    setLoading(true);
    const { error } = await supabase.from("nominations").insert({
      user_id: user.id,
      training_id: selectedTraining.id,
      justification,
      competency_type: competencyType,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Nomination Submitted", description: "Your nomination has been submitted for supervisor review." });
      setShowNomForm(false);
      setJustification("");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-foreground">Training Catalog</h3>
        <p className="text-muted-foreground">Browse available learning and development programs</p>
      </div>

      {trainings.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
          <p className="font-semibold text-muted-foreground">No trainings available at this time</p>
          <p className="text-sm text-muted-foreground">Check back later for new programs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((t) => (
            <div
              key={t.id}
              className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-foreground text-base leading-tight flex-1">{t.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{t.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {t.duration}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" /> {t.level}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" /> {t.mode || "TBD"}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">{t.cost || "Free"}</span>
                <button
                  onClick={() => { setSelectedTraining(t); setShowNomForm(true); }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold hover:bg-brand-blue-light transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nomination Modal */}
      {showNomForm && selectedTraining && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-border animate-fade-in-up">
            <h3 className="text-xl font-bold font-display text-foreground mb-2">Training Nomination</h3>
            <p className="text-sm text-muted-foreground mb-6">Apply for: {selectedTraining.title}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Competency Type</label>
                <select
                  value={competencyType}
                  onChange={(e) => setCompetencyType(e.target.value)}
                  className="w-full p-3 border border-border rounded-xl bg-muted/50 text-foreground focus:border-primary focus:outline-none"
                >
                  <option>Core Competency</option>
                  <option>Leadership Competency</option>
                  <option>Functional Competency</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Justification</label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={4}
                  placeholder="Explain why you should attend this training..."
                  className="w-full p-3 border border-border rounded-xl bg-muted/50 text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNomForm(false)}
                className="flex-1 py-3 text-muted-foreground font-semibold hover:text-foreground border border-border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleNominate}
                disabled={loading || !justification.trim()}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-brand-blue-light transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Nomination"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
