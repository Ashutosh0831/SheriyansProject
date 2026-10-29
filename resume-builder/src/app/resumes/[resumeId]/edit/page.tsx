"use client";

import { useParams, useRouter } from "next/navigation";
import ResumeEditor from "@/components/editor/ResumeEditor";
import { useResumeEditor } from "@/hooks/useResumeEditor";

export default function EditResumePage() {
  const router = useRouter();
  const params = useParams<{ resumeId: string }>();
  const editor = useResumeEditor(params.resumeId);

  if (editor.loading) {
    return (
      <main className="loading-screen">
        <span>
          <i className="loading-dot" />
          Loading your resume
        </span>
      </main>
    );
  }

  if (!editor.resume) {
    return (
      <main className="loading-screen">
        <div>
          <p>{editor.notice || "This resume could not be loaded."}</p>
          <button
            className="button button-primary"
            onClick={() => router.replace("/dashboard")}
            type="button"
          >
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <ResumeEditor
      resume={editor.resume}
      busy={editor.busy}
      notice={editor.notice}
      saveState={editor.saveState}
      aiAction={editor.aiAction}
      onBack={() => router.push("/dashboard")}
      onSave={editor.saveResume}
      onUpdateResume={editor.updateResume}
      onUpdatePersonalInfo={editor.updatePersonalInfo}
      onUpdateWork={editor.updateWork}
      onUpdateProject={editor.updateProject}
      onUpdateEducation={editor.updateEducation}
      onRunAi={editor.runAi}
    />
  );
}
