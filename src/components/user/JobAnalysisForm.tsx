import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Send } from "lucide-react";

interface DutyRow {
  task: string;
  frequency: string;
}

interface SkillRow {
  skill: string;
  level: string;
}

export default function JobAnalysisForm() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: profile?.full_name || "",
    positionTitle: profile?.position_title || "",
    officeDivision: profile?.office_division || "",
    sectionUnit: profile?.section_unit || "",
    alternatePosition: "",
    jobPurpose: "",
    mainDuties: "",
    toolsEquipment: "",
    challenges: "",
    additionalComments: "",
  });

  const [duties, setDuties] = useState<DutyRow[]>([
    { task: "", frequency: "Daily" },
    { task: "", frequency: "Daily" },
    { task: "", frequency: "Daily" },
  ]);

  const [skills, setSkills] = useState<SkillRow[]>([
    { skill: "", level: "Basic" },
    { skill: "", level: "Basic" },
    { skill: "", level: "Basic" },
  ]);

  const addDuty = () => setDuties([...duties, { task: "", frequency: "Daily" }]);
  const removeDuty = (i: number) => setDuties(duties.filter((_, idx) => idx !== i));
  const updateDuty = (i: number, field: keyof DutyRow, value: string) => {
    const updated = [...duties];
    updated[i][field] = value;
    setDuties(updated);
  };

  const addSkill = () => setSkills([...skills, { skill: "", level: "Basic" }]);
  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i));
  const updateSkill = (i: number, field: keyof SkillRow, value: string) => {
    const updated = [...skills];
    updated[i][field] = value;
    setSkills(updated);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase.from("job_analysis_forms").insert({
      user_id: user.id,
      full_name: form.fullName,
      position_title: form.positionTitle,
      office_division: form.officeDivision,
      section_unit: form.sectionUnit,
      alternate_position: form.alternatePosition,
      job_purpose: form.jobPurpose,
      main_duties: form.mainDuties,
      secondary_duties: JSON.parse(JSON.stringify(duties.filter((d) => d.task.trim()))),
      required_competencies: JSON.parse(JSON.stringify(skills.filter((s) => s.skill.trim()))),
      tools_equipment: form.toolsEquipment,
      challenges: form.challenges,
      additional_comments: form.additionalComments,
      status: "submitted" as const,
      submitted_at: new Date().toISOString(),
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Form Submitted", description: "Your Job Analysis Form has been submitted for review." });
      // Reset form
      setForm({ ...form, alternatePosition: "", jobPurpose: "", mainDuties: "", toolsEquipment: "", challenges: "", additionalComments: "" });
      setDuties([{ task: "", frequency: "Daily" }, { task: "", frequency: "Daily" }, { task: "", frequency: "Daily" }]);
      setSkills([{ skill: "", level: "Basic" }, { skill: "", level: "Basic" }, { skill: "", level: "Basic" }]);
    }
    setLoading(false);
  };

  const inputClass = "w-full p-3 border border-border rounded-xl bg-muted/50 text-foreground focus:border-primary focus:outline-none transition-all";

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-foreground">Job Analysis Form</h3>
        <p className="text-muted-foreground">Document your job roles, responsibilities, and required competencies</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="text-center border-b border-border pb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Department_of_Transportation_%28Philippines%29.svg/330px-Department_of_Transportation_%28Philippines%29.svg.png" className="w-16 h-16" alt="DOTr" />
          </div>
          <p className="text-sm text-muted-foreground">Republic of the Philippines</p>
          <p className="font-bold text-foreground">DEPARTMENT OF TRANSPORTATION</p>
          <h4 className="text-xl font-bold text-primary mt-2 font-display">JOB ANALYSIS FORM</h4>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Position Title</label>
            <input value={form.positionTitle} onChange={(e) => setForm({ ...form, positionTitle: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Office/Service/Division</label>
            <input value={form.officeDivision} onChange={(e) => setForm({ ...form, officeDivision: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Section/Project/Unit</label>
            <input value={form.sectionUnit} onChange={(e) => setForm({ ...form, sectionUnit: e.target.value })} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-1">Alternate Position</label>
            <input value={form.alternatePosition} onChange={(e) => setForm({ ...form, alternatePosition: e.target.value })} className={inputClass} />
          </div>
        </div>

        {/* Job Purpose */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Job Purpose</label>
          <p className="text-xs text-muted-foreground mb-2 italic">Brief description of the general function and purpose of the position.</p>
          <textarea value={form.jobPurpose} onChange={(e) => setForm({ ...form, jobPurpose: e.target.value })} rows={4} className={inputClass + " resize-none"} />
        </div>

        {/* Main Duties */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Main Duties and Responsibilities</label>
          <textarea value={form.mainDuties} onChange={(e) => setForm({ ...form, mainDuties: e.target.value })} rows={6} className={inputClass + " resize-none"} />
        </div>

        {/* Secondary Duties */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-primary uppercase tracking-wider">Secondary Duties & Responsibilities</label>
            <button onClick={addDuty} className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
              <Plus className="w-3 h-3" /> Add Row
            </button>
          </div>
          <div className="space-y-2">
            {duties.map((d, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-xs text-muted-foreground font-bold w-8 text-center">{i + 1}</span>
                <input
                  value={d.task}
                  onChange={(e) => updateDuty(i, "task", e.target.value)}
                  placeholder="Task description"
                  className={inputClass + " flex-1"}
                />
                <select
                  value={d.frequency}
                  onChange={(e) => updateDuty(i, "frequency", e.target.value)}
                  className="p-3 border border-border rounded-xl bg-muted/50 text-foreground text-sm"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>As Instructed</option>
                </select>
                {duties.length > 1 && (
                  <button onClick={() => removeDuty(i)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Required Competencies */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-primary uppercase tracking-wider">Required Competencies</label>
            <button onClick={addSkill} className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
              <Plus className="w-3 h-3" /> Add Row
            </button>
          </div>
          <div className="space-y-2">
            {skills.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-xs text-muted-foreground font-bold w-8 text-center">{i + 1}</span>
                <input
                  value={s.skill}
                  onChange={(e) => updateSkill(i, "skill", e.target.value)}
                  placeholder="Skill description"
                  className={inputClass + " flex-1"}
                />
                <select
                  value={s.level}
                  onChange={(e) => updateSkill(i, "level", e.target.value)}
                  className="p-3 border border-border rounded-xl bg-muted/50 text-foreground text-sm"
                >
                  <option>Basic</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Superior</option>
                </select>
                {skills.length > 1 && (
                  <button onClick={() => removeSkill(i)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Equipment */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Tools and Equipment</label>
          <p className="text-xs text-muted-foreground mb-2 italic">List any tools, equipment, or software regularly used.</p>
          <textarea value={form.toolsEquipment} onChange={(e) => setForm({ ...form, toolsEquipment: e.target.value })} rows={3} className={inputClass + " resize-none"} />
        </div>

        {/* Challenges */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Challenges and Critical Issues</label>
          <textarea value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })} rows={3} className={inputClass + " resize-none"} />
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Additional Comments</label>
          <textarea value={form.additionalComments} onChange={(e) => setForm({ ...form, additionalComments: e.target.value })} rows={3} className={inputClass + " resize-none"} />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-border">
          <button
            onClick={handleSubmit}
            disabled={loading || !form.fullName.trim() || !form.jobPurpose.trim()}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-brand-blue-light transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg"
          >
            <Send className="w-4 h-4" />
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </div>
      </div>
    </div>
  );
}
