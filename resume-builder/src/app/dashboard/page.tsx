"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const dashboard = useDashboard();

  if (dashboard.loading) {
    return (
      <main className="loading-screen">
        <span>
          <i className="loading-dot" />
          Loading your resumes
        </span>
      </main>
    );
  }

  return (
    <Dashboard
      resumes={dashboard.resumes}
      busy={dashboard.busy}
      notice={dashboard.notice}
      onCreate={dashboard.createResume}
      onOpen={dashboard.openResume}
      onDelete={dashboard.deleteResume}
      onLogout={dashboard.logout}
    />
  );
}
