import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Award, BookOpen, FileText } from "lucide-react";
import TrainingCatalog from "@/components/user/TrainingCatalog";
import JobAnalysisForm from "@/components/user/JobAnalysisForm";
import MyNominations from "@/components/user/MyNominations";
import LDInterventions from "@/components/user/LDInterventions";
import CSCExamGuides from "@/components/user/CSCExamGuides";
import CompetencyIntro from "@/components/user/CompetencyIntro";
import ProfileModal from "@/components/user/ProfileModal";

export default function UserPortal() {
  const [activeSection, setActiveSection] = useState("catalog");
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    {
      id: "trainings",
      label: "Trainings",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/",
      children: [
        { id: "catalog", label: "Training Catalog", path: "/" },
        { id: "interventions", label: "L&D Interventions", path: "/ld-interventions" },
        { id: "nominations", label: "My Nominations", path: "/my-nominations" },
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
      id: "csc",
      label: "CSC Exam Guides",
      icon: <FileText className="w-5 h-5" />,
      path: "/csc-guides",
    },
  ];

  const handleNavClick = (path: string) => {
    const pathMap: Record<string, string> = {
      "/": "catalog",
      "/ld-interventions": "interventions",
      "/my-nominations": "nominations",
      "/competency-intro": "comp-intro",
      "/competency": "comp-intro",
      "/job-analysis": "jaf",
      "/csc-guides": "csc",
    };
    setActiveSection(pathMap[path] || "catalog");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "catalog": return <TrainingCatalog />;
      case "interventions": return <LDInterventions />;
      case "nominations": return <MyNominations />;
      case "comp-intro": return <CompetencyIntro />;
      case "jaf": return <JobAnalysisForm />;
      case "csc": return <CSCExamGuides />;
      default: return <TrainingCatalog />;
    }
  };

  return (
    <>
      <DashboardLayout
        title="Learning Portal"
        subtitle="DOTr-HRDD Competency Development"
        navItems={navItems}
        onNavClick={handleNavClick}
        onProfileClick={() => setProfileOpen(true)}
      >
        <div className="space-y-8 animate-fade-in-up">
          {renderSection()}
        </div>
      </DashboardLayout>
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
