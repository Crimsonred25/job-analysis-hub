import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const OFFICE_OPTIONS = [
  "Human Resource Development Division - Mary Grace L. Escoto",
  "Asset Management Division - Jericho V. Cabacungan",
  "Cash Division - Ma. Jesusa M. Rebadulla",
  "Central Records Division - Imelda B. Bongon",
  "General Services Division - Philip Niño P. Topacio",
  "Human Resource Management Division - Arwonder-V C. Gismundo",
  "Computer and Network Systems Division - Edgar D. Fernando",
  "Information Systems and Security Division - Murffy P. Gopez",
  "BAC Secretariat Division - Armi Cecilia L. Dela Cruz",
  "Contract Management Division - Eric E. Evardone",
  "Procurement Planning and Management Division - Eugene R. Cecilio",
  "Management Division - Lilibeth M. Baldanzo",
  "Performance Monitoring and Evaluation Division - Annaleen L. Basquiña",
  "Accounting Division - Loida J. Marzo",
  "Budget Division - Aliza Marie Guilot-Salarda",
  "Internal Audit Division I - Evelyn S. Ordinario",
  "Internal Audit Division - Ma. Chelo E. Santos",
  "Contract Review and Documentation Division - Joseph Christian N. Alvarez",
  "Legal Affairs and Research Division - Amarra A. Robles-Fabro",
  "Legislative and Issuances Division - Princess Karina M. Marquez",
  "Information Division - Robert James T. De Roque",
  "Air Transportation Planning Division - Rodrigo C. De Vera",
  "Rail Transportation Planning Division - Marie Koreen C. Hidalgo",
  "Road Transportation Planning Division - Ivan Edward D. Francisco",
  "Water Transportation Planning Division - John Patrick A. Dayao",
  "International Cooperation Division - Jasmine Marie C. Uson",
];

const SG_OPTIONS = Array.from({ length: 30 }, (_, i) => i + 1);
const STATUS_OPTIONS = ["Permanent", "Contract of Service", "Job Order", "Casual", "Coterminous"];

interface NominationFormProps {
  training?: { title: string; competencyType?: string; trainingDate?: string } | null;
  onCancel: () => void;
}

export default function NominationForm({ training, onCancel }: NominationFormProps) {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [competency, setCompetency] = useState(training?.competencyType || "core");

  const [form, setForm] = useState({
    dateCourse: training?.trainingDate || "",
    dateFiling: new Date().toISOString().split("T")[0],
    venue: "",
    name: profile?.full_name || "",
    office: "",
    idNum: profile?.employee_id || "",
    email: profile?.email || "",
    position: profile?.position_title || "",
    supervisor: "",
    dateHired: "",
    empStatus: "",
    sg: "",
    service: "",
    contact: "",
    gender: "",
    oic: "",
    aspName: "", aspId: "", aspEmail: "", aspPosition: "", aspHired: "",
    aspStatus: "", aspSg: "", aspService: "", aspContact: "", aspGender: "",
    justification: "",
    indigenous: "",
  });

  const [gedsi, setGedsi] = useState<Record<string, string>>({});
  const [social, setSocial] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    // For now, store as nomination in DB
    const { error } = await supabase.from("nominations").insert({
      user_id: user.id,
      training_id: "00000000-0000-0000-0000-000000000000", // placeholder
      justification: form.justification,
      competency_type: competency === "core" ? "Core Competency" : competency === "leadership" ? "Leadership Competency" : "Functional Competency",
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Nomination Submitted", description: "Your nomination form has been submitted for review." });
      onCancel();
    }
    setLoading(false);
  };

  const inputClass = "w-full border-2 border-border rounded-lg px-4 py-2 bg-transparent text-foreground focus:border-primary focus:ring-0 focus:outline-none transition-all";
  const labelClass = "block text-sm font-medium text-foreground mb-1";
  const sectionHeader = (text: string) => (
    <h3 className="text-lg font-bold text-foreground border-b border-border pb-2 mb-4">{text}</h3>
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-6 text-white shadow-lg">
          <h2 className="text-2xl font-display font-bold mb-1">Learning and Development Nomination Form</h2>
          <p className="opacity-90 text-sm">Fill out the details below to submit your nomination.</p>
        </div>

        <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* I. Training Information */}
          {sectionHeader("I. Training/Program Information")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Title of Training/Course</label>
              <input type="text" value={training?.title || ""} readOnly className={inputClass + " bg-muted/50"} />
            </div>
            <div>
              <label className={labelClass}>Date of Training/Course</label>
              <input type="text" value={form.dateCourse} onChange={(e) => setForm({ ...form, dateCourse: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date of Filing</label>
              <input type="date" value={form.dateFiling} onChange={(e) => setForm({ ...form, dateFiling: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Type of Competency</label>
              <div className="space-y-2">
                {[["core", "Core Competency"], ["leadership", "Leadership Competency"], ["functional", "Functional Competency"]].map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 text-sm text-foreground">
                    <input type="radio" name="competency" value={val} checked={competency === val} onChange={(e) => setCompetency(e.target.value)} className="text-primary" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Venue</label>
              <textarea value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} rows={2} className={inputClass} />
            </div>
          </div>

          {/* II. Participant Information */}
          {sectionHeader("II. Participant's Information")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Name of Personnel</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Office / Unit Head</label>
              <select value={form.office} onChange={(e) => setForm({ ...form, office: e.target.value })} className={inputClass}>
                <option value="" disabled>Select Office / Unit Head</option>
                {OFFICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>ID Number</label>
              <input type="text" value={form.idNum} onChange={(e) => setForm({ ...form, idNum: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Position Title</label>
              <input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Immediate Supervisor</label>
              <input type="text" value={form.supervisor} onChange={(e) => setForm({ ...form, supervisor: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date Hired</label>
              <input type="date" value={form.dateHired} onChange={(e) => setForm({ ...form, dateHired: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status of Employment</label>
              <select value={form.empStatus} onChange={(e) => setForm({ ...form, empStatus: e.target.value })} className={inputClass}>
                <option value="" disabled>Select Status</option>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Salary Grade</label>
              <select value={form.sg} onChange={(e) => setForm({ ...form, sg: e.target.value })} className={inputClass}>
                <option value="" disabled>Select SG</option>
                {SG_OPTIONS.map((s) => <option key={s} value={String(s)}>SG {s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Yrs./Months in DOTr Service</label>
              <input type="text" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact/Viber Number</label>
              <input type="text" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Gender (Optional)</label>
              <input type="text" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Name, Position and Office of the Designated Officer-in-Charge (for SG 24 and up)</label>
              <input type="text" value={form.oic} onChange={(e) => setForm({ ...form, oic: e.target.value })} className={inputClass} />
            </div>
          </div>

          {/* III. Alternate/Substitute */}
          {sectionHeader("III. Alternate/Substitute Participant's Information")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Name of Personnel</label><input type="text" value={form.aspName} onChange={(e) => setForm({ ...form, aspName: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>ID Number</label><input type="text" value={form.aspId} onChange={(e) => setForm({ ...form, aspId: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Email Address</label><input type="email" value={form.aspEmail} onChange={(e) => setForm({ ...form, aspEmail: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Position Title</label><input type="text" value={form.aspPosition} onChange={(e) => setForm({ ...form, aspPosition: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Date Hired</label><input type="date" value={form.aspHired} onChange={(e) => setForm({ ...form, aspHired: e.target.value })} className={inputClass} /></div>
            <div>
              <label className={labelClass}>Status of Employment</label>
              <select value={form.aspStatus} onChange={(e) => setForm({ ...form, aspStatus: e.target.value })} className={inputClass}>
                <option value="" disabled>Select Status</option>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Salary Grade</label>
              <select value={form.aspSg} onChange={(e) => setForm({ ...form, aspSg: e.target.value })} className={inputClass}>
                <option value="" disabled>Select SG</option>
                {SG_OPTIONS.map((s) => <option key={s} value={String(s)}>SG {s}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Yrs./Months in DOTr Service</label><input type="text" value={form.aspService} onChange={(e) => setForm({ ...form, aspService: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Contact/Viber Number</label><input type="text" value={form.aspContact} onChange={(e) => setForm({ ...form, aspContact: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Gender (Optional)</label><input type="text" value={form.aspGender} onChange={(e) => setForm({ ...form, aspGender: e.target.value })} className={inputClass} /></div>
          </div>

          {/* IV. Justification */}
          {sectionHeader("IV. Justification of Nominee's Attendance")}
          <textarea value={form.justification} onChange={(e) => setForm({ ...form, justification: e.target.value })} rows={4} className={inputClass} placeholder="Explain why you should attend this training..." />

          {/* V. GEDSI */}
          {sectionHeader("V. Gender Equality, Disability and Social Inclusion (GEDSI)")}
          <div className="space-y-3 text-sm text-foreground">
            {[
              "Do you have mobility problems? Like difficulty in walking and/or climbing stairs?",
              "Are you having an emotional/behavioural problem?",
              "Do you have difficulty in reading and identifying speech sounds?",
              "Do you have difficulty communicating?",
              "Do you have difficulty remembering or concentrating?",
              "Do you have difficulty in doing simple arithmetic calculations?",
              "Do you have difficulty in reading even with corrective lenses?",
              "Do you have any difficulty in hearing?",
            ].map((q, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="w-3/4">{i + 1}. {q}</span>
                <div className="w-1/4 flex gap-4">
                  <label><input type="radio" name={`g${i + 1}`} value="yes" onChange={() => setGedsi({ ...gedsi, [`g${i + 1}`]: "yes" })} /> Yes</label>
                  <label><input type="radio" name={`g${i + 1}`} value="no" onChange={() => setGedsi({ ...gedsi, [`g${i + 1}`]: "no" })} /> No</label>
                </div>
              </div>
            ))}
          </div>

          {/* VI. Social Inclusion */}
          {sectionHeader("VI. Social Inclusion")}
          <div className="space-y-3 text-sm text-foreground">
            <div className="flex justify-between items-center">
              <span className="w-3/4">1. Are you a solo parent?</span>
              <div className="w-1/4 flex gap-4">
                <label><input type="radio" name="s1" value="yes" onChange={() => setSocial({ ...social, s1: "yes" })} /> Yes</label>
                <label><input type="radio" name="s1" value="no" onChange={() => setSocial({ ...social, s1: "no" })} /> No</label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>2. Are you part of the Indigenous People group? (Please specify)</span>
              <input type="text" value={form.indigenous} onChange={(e) => setForm({ ...form, indigenous: e.target.value })} className={inputClass} placeholder="If yes, please specify group" />
            </div>
          </div>

          {/* VII. Attachment */}
          {sectionHeader("VII. Attachment")}
          <p className="text-sm text-muted-foreground mb-3">Please upload your e-signature</p>
          <div className="relative border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-muted/50 transition-all group bg-muted/30">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
            <div className="flex flex-col items-center gap-3 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-sm">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <span className="text-primary font-bold text-lg">Click to upload</span>
                <span className="text-muted-foreground text-lg"> or drag and drop</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">PDF, JPG, PNG or DOCX (MAX. 10MB)</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-border text-foreground font-bold rounded-xl hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} disabled={loading} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50">
              {loading ? "Submitting..." : "Submit & Generate PDF"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
