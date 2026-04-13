import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { X, Edit3, Save } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    positionTitle: "",
    officeDivision: "",
    sectionUnit: "",
    employeeId: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.full_name || "",
        email: profile.email || "",
        positionTitle: profile.position_title || "",
        officeDivision: profile.office_division || "",
        sectionUnit: profile.section_unit || "",
        employeeId: profile.employee_id || "",
        phone: "",
        bio: "",
      });
    }
  }, [profile]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    // In a real app, save to Supabase here
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (profile) {
      setForm({
        fullName: profile.full_name || "",
        email: profile.email || "",
        positionTitle: profile.position_title || "",
        officeDivision: profile.office_division || "",
        sectionUnit: profile.section_unit || "",
        employeeId: profile.employee_id || "",
        phone: "",
        bio: "",
      });
    }
    setIsEditing(false);
  };

  const initials = form.fullName
    ? form.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const inputClass = "w-full p-3 border border-border rounded-xl bg-muted/50 text-foreground focus:border-primary focus:outline-none transition-all font-body";
  const readOnlyClass = "w-full p-3 border border-transparent rounded-xl bg-transparent text-foreground font-body";

  const fields = [
    { label: "Full Name", key: "fullName" as const },
    { label: "Email", key: "email" as const },
    { label: "Position Title", key: "positionTitle" as const },
    { label: "Office/Division", key: "officeDivision" as const },
    { label: "Section/Unit", key: "sectionUnit" as const },
    { label: "Employee ID", key: "employeeId" as const },
    { label: "Phone", key: "phone" as const },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
      <div
        ref={modalRef}
        className="bg-card rounded-2xl shadow-2xl w-full max-w-lg border border-border animate-fade-in-up max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-bold font-display text-foreground">User Profile</h3>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
            ) : null}
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-600 border-2 border-brand-300 flex items-center justify-center font-bold text-2xl font-display">
            {initials}
          </div>
          <p className="mt-3 font-bold text-foreground text-lg">{form.fullName || "User"}</p>
          <p className="text-sm text-muted-foreground">{form.positionTitle || "Employee"}</p>
        </div>

        {/* Fields */}
        <div className="px-6 pb-6 space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">{f.label}</label>
              {isEditing ? (
                <input
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className={inputClass}
                />
              ) : (
                <p className={readOnlyClass}>{form[f.key] || "—"}</p>
              )}
            </div>
          ))}

          {isEditing && (
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className={inputClass + " resize-none"}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex gap-3 p-6 pt-0">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 text-muted-foreground font-semibold hover:text-foreground border border-border rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
