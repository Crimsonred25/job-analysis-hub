import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import SupervisorDashboard from "@/pages/supervisor/SupervisorDashboard";
import UserPortal from "@/pages/user/UserPortal";

export default function Index() {
  const { user, loading, primaryRole } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  switch (primaryRole) {
    case "admin":
      return <AdminDashboard />;
    case "supervisor":
      return <SupervisorDashboard />;
    default:
      return <UserPortal />;
  }
}
