import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, ClipboardCheck, Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "approvals" | "master">("dashboard");
  const [stats, setStats] = useState({ pending: 0, finalized: 0, total: 0, rate: 0 });
  const [nominations, setNominations] = useState<any[]>([]);
  const [allNominations, setAllNominations] = useState<any[]>([]);
  const [jafForms, setJafForms] = useState<any[]>([]);
  const { toast } = useToast();

  const loadData = async () => {
    const { data: noms } = await supabase
      .from("nominations")
      .select("*, trainings(*), profiles!nominations_user_id_fkey(*)");
    
    const { data: jafs } = await supabase
      .from("job_analysis_forms")
      .select("*");

    if (noms) {
      setAllNominations(noms);
      const pending = noms.filter((n) => n.status === "supervisor_approved");
      const finalized = noms.filter((n) => n.status === "finalized" || n.status === "admin_approved");
      setNominations(pending);
      setStats({
        pending: pending.length,
        finalized: finalized.length,
        total: noms.length + (jafs?.length || 0),
        rate: noms.length > 0 ? Math.round((finalized.length / noms.length) * 100) : 0,
      });
    }
    if (jafs) setJafForms(jafs);
  };

  useEffect(() => { loadData(); }, []);

  const handleApprove = async (id: string) => {
    await supabase.from("nominations").update({ status: "admin_approved", approved_at: new Date().toISOString() }).eq("id", id);
    toast({ title: "Nomination Approved" });
    loadData();
  };

  const handleDisapprove = async (id: string, reason: string) => {
    await supabase.from("nominations").update({ status: "disapproved", disapproval_reason: reason }).eq("id", id);
    toast({ title: "Nomination Disapproved" });
    loadData();
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { id: "approvals", label: "For Final Approval", icon: <ClipboardCheck className="w-5 h-5" />, path: "/approvals", badge: stats.pending },
    { id: "master", label: "Master List", icon: <Database className="w-5 h-5" />, path: "/master" },
  ];

  return (
    <DashboardLayout title="Executive Dashboard" subtitle="Human Resource Development Division" navItems={navItems}>
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Pending HRDD Action" value={stats.pending} badge="Needs Review" color="primary" />
          <StatCard label="Finalized / Endorsed" value={stats.finalized} badge="Completed" color="success" />
          <StatCard label="Total Records" value={stats.total} badge="All Forms" color="brand" />
          <StatCard label="Completion Rate" value={`${stats.rate}%`} badge="Efficiency" color="warning" />
        </div>

        {/* Pending Approvals Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold font-display text-foreground">Pending Final Approval</h3>
            <p className="text-sm text-muted-foreground">Nominations approved by supervisors awaiting your action</p>
          </div>
          {nominations.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">All caught up!</p>
              <p className="text-sm">No pending nominations at this time.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground border-b border-border">
                  <tr>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Training</th>
                    <th className="p-4">Verified By</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {nominations.map((nom) => (
                    <tr key={nom.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-bold text-foreground">
                        {nom.profiles?.full_name || "N/A"}
                        <br />
                        <span className="text-xs font-normal text-muted-foreground">{nom.profiles?.office_division}</span>
                      </td>
                      <td className="p-4 text-primary font-medium">{nom.trainings?.title}</td>
                      <td className="p-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          Supervisor Verified
                        </div>
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <button
                          onClick={() => handleApprove(nom.id)}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold hover:bg-brand-blue-light transition-colors shadow"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDisapprove(nom.id, "Not meeting requirements")}
                          className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-xs font-bold hover:bg-destructive/20 transition-colors"
                        >
                          Disapprove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Master Records */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold font-display text-foreground">Master Database Records</h3>
            <p className="text-sm text-muted-foreground">All nominations and job analysis forms</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allNominations.map((nom) => (
                  <tr key={nom.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{nom.profiles?.full_name || "N/A"}</td>
                    <td className="p-4 text-primary">Nomination - {nom.trainings?.title}</td>
                    <td className="p-4 text-muted-foreground">{new Date(nom.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <StatusBadge status={nom.status} />
                    </td>
                  </tr>
                ))}
                {jafForms.map((jaf) => (
                  <tr key={jaf.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{jaf.full_name}</td>
                    <td className="p-4 text-primary">Job Analysis Form</td>
                    <td className="p-4 text-muted-foreground">{new Date(jaf.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <StatusBadge status={jaf.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, badge, color }: { label: string; value: string | number; badge: string; color: string }) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden transition-colors">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent rounded-full blur-2xl" />
      <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider relative z-10">{label}</p>
      <h3 className="text-4xl font-display font-bold text-foreground mt-2 relative z-10">{value}</h3>
      <div className="mt-4 text-xs font-medium text-primary bg-accent inline-block px-2 py-1 rounded">{badge}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    supervisor_approved: "bg-brand-100 text-brand-600",
    admin_approved: "bg-success/10 text-success",
    finalized: "bg-success/10 text-success",
    disapproved: "bg-destructive/10 text-destructive",
    draft: "bg-muted text-muted-foreground",
    submitted: "bg-brand-100 text-brand-600",
    approved: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
  };

  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status.replace(/_/g, " ").toUpperCase()}
    </span>
  );
}
