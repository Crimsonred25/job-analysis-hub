import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Award, FileText } from "lucide-react";
import TrainingCatalog from "@/components/user/TrainingCatalog";
import JobAnalysisForm from "@/components/user/JobAnalysisForm";
import MyNominations from "@/components/user/MyNominations";

export default function UserPortal() {
  const navItems = [
    {
      id: "competency",
      label: "Competency",
      icon: <Award className="w-5 h-5" />,
      path: "/",
      children: [
        { id: "catalog", label: "Training Catalog", path: "/" },
        { id: "nominations", label: "My Nominations", path: "/my-nominations" },
        { id: "jaf", label: "Job Analysis Form", path: "/job-analysis" },
      ],
    },
  ];

  return (
    <DashboardLayout title="Learning Portal" subtitle="DOTr-HRDD Competency Development" navItems={navItems}>
      <div className="space-y-8 animate-fade-in-up">
        <TrainingCatalog />
        <MyNominations />
        <JobAnalysisForm />
      </div>
    </DashboardLayout>
  );
}
