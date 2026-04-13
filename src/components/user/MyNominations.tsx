import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FileText } from "lucide-react";

export default function MyNominations() {
  const [nominations, setNominations] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("nominations")
        .select("*, trainings(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setNominations(data);
    };
    load();
  }, [user]);

  const statusStyles: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    supervisor_approved: "bg-brand-100 text-brand-600",
    admin_approved: "bg-success/10 text-success",
    finalized: "bg-success/10 text-success",
    disapproved: "bg-destructive/10 text-destructive",
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-foreground">My Nominations</h3>
        <p className="text-muted-foreground">Track your training nomination status</p>
      </div>

      {nominations.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
          <p className="font-semibold text-muted-foreground">No nominations yet</p>
          <p className="text-sm text-muted-foreground">Apply for a training from the catalog above.</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4">Training</th>
                  <th className="p-4">Date Filed</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {nominations.map((nom) => (
                  <tr key={nom.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{nom.trainings?.title}</td>
                    <td className="p-4 text-muted-foreground">{new Date(nom.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${statusStyles[nom.status] || "bg-muted text-muted-foreground"}`}>
                        {nom.status.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
