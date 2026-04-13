import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Bell } from "lucide-react";

export default function NotificationsSection() {
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

  const statusColor = (status: string) => {
    if (status === "admin_approved" || status === "finalized") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    if (status === "disapproved") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted-foreground mt-1">Track your nomination and form statuses.</p>
        </div>
      </div>

      {nominations.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <Bell className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
          <p className="font-semibold text-muted-foreground">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {nominations.map((nom) => (
            <div key={nom.id} className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{nom.trainings?.title || "Training Nomination"}</p>
                  <p className="text-sm text-muted-foreground">{new Date(nom.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase ${statusColor(nom.status)}`}>
                {nom.status.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
