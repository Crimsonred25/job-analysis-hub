import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, FileText, ClipboardCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function SupervisorDashboard() {
  const [nominations, setNominations] = useState<any[]>([]);
  const [jafForms, setJafForms] = useState<any[]>([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, total: 0 });
  const { toast } = useToast();

  const loadData = async () => {
    const { data: noms } = await supabase
      .from("nominations")
      .select("*, trainings(*), profiles!nominations_user_id_fkey(*)");

    const { data: jafs } = await supabase
      .from("job_analysis_forms")
      .select("*");

    if (noms) {
      setNominations(noms);
      const pending = noms.filter((n) => n.status === "pending");
      const approved = noms.filter((n) => n.status !== "pending" && n.status !== "disapproved");
      setStats({ pending: pending.length, approved: approved.length, total: noms.length });
    }
    if (jafs) setJafForms(jafs);
  };

  useEffect(() => { loadData(); }, []);

  const handleApprove = async (id: string) => {
    await supabase.from("nominations").update({ status: "supervisor_approved" }).eq("id", id);
    toast({ title: "Nomination approved and forwarded to admin" });
    loadData();
  };

  const handleApproveJAF = async (id: string) => {
    await supabase.from("job_analysis_forms").update({ status: "supervisor_approved" }).eq("id", id);
    toast({ title: "Job Analysis Form approved" });
    loadData();
  };

  const navItems = [
    { id: "overview", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { id: "nominations", label: "Nominations", icon: <FileText className="w-5 h-5" />, path: "/nominations", badge: stats.pending },
    { id: "jaf", label: "Job Analysis Approvals", icon: <ClipboardCheck className="w-5 h-5" />, path: "/job-analysis" },
  ];

  return (
    <DashboardLayout title="Supervisor Dashboard" subtitle="DOTr-HRDD Supervisor Console" navItems={navItems}>
      <div className="space-y-8 animate-fade-in-up">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Pending Review</p>
            <h3 className="text-4xl font-display font-bold text-foreground mt-2">{stats.pending}</h3>
            <div className="mt-4 text-xs font-medium text-warning bg-warning/10 inline-block px-2 py-1 rounded">Awaiting Action</div>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Approved</p>
            <h3 className="text-4xl font-display font-bold text-foreground mt-2">{stats.approved}</h3>
            <div className="mt-4 text-xs font-medium text-success bg-success/10 inline-block px-2 py-1 rounded">Forwarded</div>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Total Nominations</p>
            <h3 className="text-4xl font-display font-bold text-foreground mt-2">{stats.total}</h3>
            <div className="mt-4 text-xs font-medium text-primary bg-accent inline-block px-2 py-1 rounded">All Time</div>
          </div>
        </div>

        {/* Nominations Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold font-display text-foreground">Nomination Approvals</h3>
            <p className="text-sm text-muted-foreground">Review and approve employee training nominations</p>
          </div>
          {nominations.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No nominations yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground border-b border-border">
                  <tr>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Training</th>
                    <th className="p-4">Date Filed</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {nominations.map((nom) => (
                    <tr key={nom.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium text-foreground">{nom.profiles?.full_name || "N/A"}</td>
                      <td className="p-4 text-primary">{nom.trainings?.title}</td>
                      <td className="p-4 text-muted-foreground">{new Date(nom.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          nom.status === "pending" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                        }`}>
                          {nom.status.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {nom.status === "pending" && (
                          <button
                            onClick={() => handleApprove(nom.id)}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold hover:bg-brand-blue-light transition-colors"
                          >
                            Approve & Forward
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Job Analysis Forms */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold font-display text-foreground">Job Analysis Form Approvals</h3>
          </div>
          {jafForms.filter(j => j.status === "submitted").length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No pending job analysis forms</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground border-b border-border">
                  <tr>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Position</th>
                    <th className="p-4">Office</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {jafForms.filter(j => j.status === "submitted").map((jaf) => (
                    <tr key={jaf.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium text-foreground">{jaf.full_name}</td>
                      <td className="p-4 text-muted-foreground">{jaf.position_title}</td>
                      <td className="p-4 text-muted-foreground">{jaf.office_division}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleApproveJAF(jaf.id)}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold hover:bg-brand-blue-light transition-colors"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
