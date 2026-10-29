"use client";

import Link from "next/link";
import { displayDate } from "@/lib/client-api";
import { Resume } from "@/types/resume";

type DashboardProps = {
  resumes: Resume[];
  busy: boolean;
  notice: string;
  onCreate: () => void;
  onOpen: (resumeId: string) => void;
  onDelete: (resumeId: string) => void;
  onLogout: () => void;
};

export default function Dashboard({
  resumes,
  busy,
  notice,
  onCreate,
  onOpen,
  onDelete,
  onLogout,
}: DashboardProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Folio home">
          <span className="brand-mark">f</span> folio
        </Link>
        <div className="topbar-actions">
          <button
            className="button button-quiet"
            onClick={onLogout}
            disabled={busy}
            type="button"
          >
            Sign out
          </button>
          <button
            className="button button-primary"
            onClick={onCreate}
            disabled={busy}
            type="button"
          >
            + New resume
          </button>
        </div>
      </header>
      <main className="page-wrap">
        {notice && <div className="notice notice-error">{notice}</div>}
        <section className="welcome-card">
          <span className="eyebrow">Your next chapter</span>
          <h2>Make your next move a confident one.</h2>
          <p>Build a polished resume, one thoughtful detail at a time.</p>
        </section>
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">Your workspace</span>
            <h1 className="page-title">My resumes</h1>
            <p className="page-subtitle">
              Create, edit, and keep every version in one place.
            </p>
          </div>
          <button
            className="button button-primary"
            onClick={onCreate}
            disabled={busy}
            type="button"
          >
            + Create a resume
          </button>
        </div>
        <div className="section-heading">
          <h2>
            All documents <span className="save-state">({resumes.length})</span>
          </h2>
          <span className="save-state">Saved to your account</span>
        </div>
        <div className="resume-grid">
          {resumes.map((resume) => (
            <article className="resume-card" key={resume._id}>
              <button
                className="resume-card-top"
                onClick={() => onOpen(resume._id)}
                disabled={busy}
                type="button"
                style={{
                  border: 0,
                  background: "transparent",
                  padding: 0,
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span className="resume-file-icon">▤</span>
              </button>
              <div>
                <h3>{resume.title || "Untitled resume"}</h3>
                <p>
                  {resume.personalInfo?.fullname ||
                    "Add your name to this resume"}
                </p>
              </div>
              <div className="resume-card-footer">
                <small>{displayDate(resume.updatedAt)}</small>
                <div className="inline-actions">
                  <button
                    className="button button-secondary"
                    onClick={() => onOpen(resume._id)}
                    disabled={busy}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Delete resume"
                    onClick={() => onDelete(resume._id)}
                    disabled={busy}
                    type="button"
                  >
                    x
                  </button>
                </div>
              </div>
            </article>
          ))}
          <button
            className="new-resume-card"
            onClick={onCreate}
            disabled={busy}
            type="button"
          >
            <span className="new-resume-icon">+</span>
            <span>Create a new resume</span>
          </button>
          {resumes.length === 0 && (
            <div className="empty-state">
              <strong>Your first resume starts here</strong>
              Create a document and make it your own. You can edit and save it
              anytime.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
