import { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ClipboardCheck, Database, Award, FileText,
  LogOut, Menu, X, Bell, ChevronDown, ChevronUp, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  badge?: number;
  children?: { id: string; label: string; path: string }[];
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  navItems: NavItem[];
  onNavClick?: (path: string) => void;
  onProfileClick?: () => void;
}

export default function DashboardLayout({ children, title, subtitle, navItems, onNavClick, onProfileClick }: DashboardLayoutProps) {
  const { profile, primaryRole, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const roleLabel = primaryRole === "admin" ? "Super Admin" : primaryRole === "supervisor" ? "Supervisor" : "Employee";
  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : roleLabel.slice(0, 2).toUpperCase();

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 flex flex-col border-r border-border bg-gradient-to-b from-card via-accent/30 to-card transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="py-6 px-5 flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Department_of_Transportation_%28Philippines%29.svg/330px-Department_of_Transportation_%28Philippines%29.svg.png"
            className="w-8 h-8"
            alt="DOTr Logo"
          />
          <div>
            <span className="text-lg font-bold text-foreground tracking-tight block">DOTr HRDD</span>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block">{roleLabel}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar px-4">
          <p className="text-xs uppercase text-muted-foreground font-semibold mb-3 px-1">Menu</p>
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        expandedMenus.includes(item.id) || item.children.some((c) => isActive(c.path))
                          ? "bg-accent text-primary font-semibold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {expandedMenus.includes(item.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {expandedMenus.includes(item.id) && (
                      <ul className="ml-6 mt-1 flex flex-col gap-0.5">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => { navigate(child.path); setSidebarOpen(false); }}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                isActive(child.path)
                                  ? "text-primary font-semibold bg-accent/50"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              )}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-accent text-primary font-semibold border-l-4 border-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 sm:h-20 px-4 lg:px-6 border-b border-border bg-gradient-to-r from-card via-accent/30 to-card shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xl font-bold font-display text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 border border-brand-300 flex items-center justify-center font-bold text-sm">
                {initials}
              </span>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {profile?.full_name || roleLabel}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
