import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, BookOpen, Award, FileText, BarChart3, Bell } from "lucide-react";
import TrainingDashboard from "@/components/user/TrainingDashboard";
import JobAnalysisForm from "@/components/user/JobAnalysisForm";
import MyNominations from "@/components/user/MyNominations";
import LDInterventions from "@/components/user/LDInterventions";
import CSCExamGuides from "@/components/user/CSCExamGuides";
import CompetencyIntro from "@/components/user/CompetencyIntro";
import NominationForm from "@/components/user/NominationForm";
import ReportsSection from "@/components/user/ReportsSection";
import NotificationsSection from "@/components/user/NotificationsSection";
import ProfileModal from "@/components/user/ProfileModal";

export default function UserPortal() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [profileOpen, setProfileOpen] = useState(false);
  const [nominationTraining, setNominationTraining] = useState<{ title: string; competencyType?: string; trainingDate?: string } | null>(null);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      id: "trainings",
      label: "Trainings",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/trainings",
      children: [
        { id: "interventions", label: "L&D Interventions", path: "/ld-interventions" },
        { id: "request-training", label: "Request for Training", path: "/request-training" },
      ],
    },
    {
      id: "competency",
      label: "Competency",
      icon: <Award className="w-5 h-5" />,
      path: "/competency",
      children: [
        { id: "comp-intro", label: "Introduction", path: "/competency-intro" },
        { id: "jaf", label: "Job Analysis Form", path: "/job-analysis" },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/reports",
    },
    {
      id: "csc",
      label: "CSC Exam Guides",
      icon: <FileText className="w-5 h-5" />,
      path: "/csc-guides",
      children: [
        { id: "csc-tips", label: "Helpful Tips You Need To Know", path: "/csc-tips" },
        { id: "csc-reviewers", label: "Reviewers", path: "/csc-reviewers" },
        { id: "csc-numerical", label: "Numerical Reasoning", path: "/csc-numerical" },
        { id: "csc-grammar", label: "Grammar and Comprehension", path: "/csc-grammar" },
        { id: "csc-general", label: "General Info & Constitution", path: "/csc-general" },
      ],
    },
  ];

  const handleNavClick = (path: string) => {
    const pathMap: Record<string, string> = {
      "/dashboard": "dashboard",
      "/trainings": "dashboard",
      "/ld-interventions": "interventions",
      "/request-training": "nomination",
      "/my-nominations": "nominations",
      "/competency-intro": "comp-intro",
      "/competency": "comp-intro",
      "/job-analysis": "jaf",
      "/csc-guides": "csc-tips",
      "/csc-tips": "csc-tips",
      "/csc-reviewers": "csc-reviewers",
      "/csc-numerical": "csc-numerical",
      "/csc-grammar": "csc-grammar",
      "/csc-general": "csc-general",
      "/reports": "reports",
      "/notifications": "notifications",
    };
    setActiveSection(pathMap[path] || "dashboard");
  };

  const handleRegisterTraining = (training: { title: string; competencyType?: string; trainingDate?: string }) => {
    setNominationTraining(training);
    setActiveSection("nomination");
  };

  const sectionTitles: Record<string, string> = {
    dashboard: "Dashboard",
    interventions: "L&D Interventions",
    nomination: "Nomination Form",
    nominations: "My Nominations",
    "comp-intro": "Competency Introduction",
    jaf: "Job Analysis Form",
    "csc-tips": "Helpful Tips You Need To Know",
    "csc-reviewers": "Reviewers",
    "csc-numerical": "Numerical Reasoning",
    "csc-grammar": "Grammar and Comprehension",
    "csc-general": "General Info & Constitution",
    reports: "Reports",
    notifications: "Notifications",
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard": return <TrainingDashboard onRegister={handleRegisterTraining} />;
      case "interventions": return <LDInterventions onRegister={handleRegisterTraining} />;
      case "nomination": return <NominationForm training={nominationTraining} onCancel={() => setActiveSection("dashboard")} />;
      case "nominations": return <MyNominations />;
      case "comp-intro": return <CompetencyIntro />;
      case "jaf": return <JobAnalysisForm />;
      case "csc-tips": return <CSCExamGuides section="tips" />;
      case "csc-reviewers": return <CSCExamGuides section="reviewers" />;
      case "csc-numerical": return <CSCExamGuides section="numerical" />;
      case "csc-grammar": return <CSCExamGuides section="grammar" />;
      case "csc-general": return <CSCExamGuides section="general" />;
      case "reports": return <ReportsSection />;
      case "notifications": return <NotificationsSection />;
      default: return <TrainingDashboard onRegister={handleRegisterTraining} />;
    }
  };

  const hideHeader = activeSection === "interventions";

  return (
    <>
      <DashboardLayout
        title={sectionTitles[activeSection] || "Dashboard"}
        subtitle="Welcome back! Here's your learning progress."
        navItems={navItems}
        onNavClick={handleNavClick}
        onProfileClick={() => setProfileOpen(true)}
        hideHeader={hideHeader}
      >
        <div className="animate-fade-in-up">
          {renderSection()}
        </div>
      </DashboardLayout>
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
