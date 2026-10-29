"use client";

import { Field, TextArea } from "@/components/common/FormFields";
import ResumePreview from "@/components/editor/ResumePreview";
import { Education, PersonalInfo, Project, Resume, WorkExperience } from "@/types/resume";

type ResumeEditorProps = {
  resume: Resume;
  busy: boolean;
  notice: string;
  saveState: string;
  aiAction: string;
  onBack: () => void;
  onSave: () => void;
  onUpdateResume: <K extends keyof Resume>(key: K, value: Resume[K]) => void;
  onUpdatePersonalInfo: (key: keyof PersonalInfo, value: string) => void;
  onUpdateWork: (index: number, key: keyof WorkExperience, value: string) => void;
  onUpdateProject: (index: number, key: keyof Project, value: string) => void;
  onUpdateEducation: (index: number, key: keyof Education, value: string) => void;
  onRunAi: <T>(
    label: string,
    url: string,
    body: object,
    onSuccess: (data: T) => void,
  ) => Promise<void>;
};

export default function ResumeEditor({
  resume,
  busy,
  notice,
  saveState,
  aiAction,
  onBack,
  onSave,
  onUpdateResume,
  onUpdatePersonalInfo,
  onUpdateWork,
  onUpdateProject,
  onUpdateEducation,
  onRunAi,
}: ResumeEditorProps) {
  const skills = resume.Skills || [];
  const experience = resume.workExperience || [];
  const projects = resume.projects || [];
  const education = resume.education || [];
  const certifications = Array.isArray(resume.certifications)
    ? resume.certifications.join(", ")
    : resume.certifications || "";

  return (
    <main className="app-shell">
      <header className="studio-header">
        <div className="studio-title">
          <button className="button button-quiet" onClick={onBack} type="button">
            ← Dashboard
          </button>
          <div>
            <h1>{resume.title || "Untitled resume"}</h1>
            <span className="save-state">{saveState}</span>
          </div>
        </div>
        <div className="inline-actions">
          <button
            className="button button-secondary"
            onClick={() => window.print()}
            type="button"
          >
            Print / PDF
          </button>
          <button
            className="button button-primary"
            disabled={busy || Boolean(aiAction)}
            onClick={onSave}
            type="button"
          >
            {busy ? "Saving..." : "Save resume"}
          </button>
        </div>
      </header>

      <div className="studio-workspace">
        <section className="editor-panel">
          <div className="editor-intro">
            <span className="eyebrow">Resume workspace</span>
            <h2>Tell your story</h2>
            <p>Fill in the sections below. Your preview updates as you type.</p>
          </div>
          {notice && <div className="notice notice-error">{notice}</div>}

          <section className="editor-section">
            <div className="editor-section-heading">
              <h3><span className="section-number">01</span>Resume details</h3>
            </div>
            <div className="fields-grid">
              <Field
                label="Resume title"
                value={resume.title}
                placeholder="e.g. Product designer"
                onChange={(value) => onUpdateResume("title", value)}
                wide
              />
            </div>
          </section>

          <section className="editor-section">
            <div className="editor-section-heading">
              <h3><span className="section-number">02</span>Personal information</h3>
            </div>
            <div className="fields-grid">
              <Field label="Full name" value={resume.personalInfo?.fullname} onChange={(value) => onUpdatePersonalInfo("fullname", value)} />
              <Field label="Email" value={resume.personalInfo?.email} type="email" onChange={(value) => onUpdatePersonalInfo("email", value)} />
              <Field label="Phone" value={resume.personalInfo?.phone} type="tel" onChange={(value) => onUpdatePersonalInfo("phone", value)} />
              <Field label="Location" value={resume.personalInfo?.location} placeholder="City, Country" onChange={(value) => onUpdatePersonalInfo("location", value)} />
              <Field label="LinkedIn URL" value={resume.personalInfo?.linkedIn} placeholder="linkedin.com/in/you" onChange={(value) => onUpdatePersonalInfo("linkedIn", value)} />
              <Field label="GitHub URL" value={resume.personalInfo?.github} placeholder="github.com/you" onChange={(value) => onUpdatePersonalInfo("github", value)} />
            </div>
          </section>

          <section className="editor-section">
            <div className="editor-section-heading">
              <h3><span className="section-number">03</span>Professional summary</h3>
              <button
                className="ai-button"
                disabled={Boolean(aiAction)}
                onClick={() =>
                  onRunAi<{ summary: string }>(
                    "summary",
                    "/api/ai/generate-summary",
                    {
                      exprienceLevel: "Professional",
                      skills,
                      jobTitle: resume.title || "Professional",
                    },
                    (data) => onUpdateResume("summary", data.summary),
                  )
                }
                type="button"
              >
                {aiAction === "summary" ? "Writing..." : "✦ Write with AI"}
              </button>
            </div>
            <div className="fields-grid">
              <TextArea
                label="Summary"
                value={resume.summary}
                placeholder="A short introduction highlighting your experience, strengths, and what you bring to the role."
                onChange={(value) => onUpdateResume("summary", value)}
                rows={5}
              />
            </div>
          </section>

          <section className="editor-section">
            <div className="editor-section-heading">
              <h3><span className="section-number">04</span>Work experience</h3>
            </div>
            {experience.map((work, index) => (
              <div className="entry-card" key={`work-${index}`}>
                <div className="entry-topline">
                  <strong>Position {index + 1}</strong>
                  <button
                    className="icon-button"
                    aria-label="Remove position"
                    onClick={() => onUpdateResume("workExperience", experience.filter((_, itemIndex) => itemIndex !== index))}
                    type="button"
                  >
                    x
                  </button>
                </div>
                <div className="fields-grid">
                  <Field label="Job title" value={work.position || work.postion} onChange={(value) => onUpdateWork(index, "position", value)} />
                  <Field label="Company" value={work.company} onChange={(value) => onUpdateWork(index, "company", value)} />
                  <Field label="Start date" value={work.startDate} placeholder="Jan 2023" onChange={(value) => onUpdateWork(index, "startDate", value)} />
                  <Field label="End date" value={work.endDate} placeholder="Present" onChange={(value) => onUpdateWork(index, "endDate", value)} />
                  <div className="field field-wide">
                    <div className="editor-section-heading">
                      <label>Description</label>
                      <button
                        className="ai-button"
                        disabled={Boolean(aiAction)}
                        onClick={() =>
                          onRunAi<{ workExperienceDesc: string }>(
                            "work",
                            "/api/ai/workExperience-description",
                            {
                              experienceLevel: "Professional",
                              skills,
                              companyName: work.company,
                              workDuration: `${work.startDate} - ${work.endDate}`,
                              workedAs: work.position || work.postion || "",
                            },
                            (data) => onUpdateWork(index, "description", data.workExperienceDesc),
                          )
                        }
                        type="button"
                      >
                        {aiAction === "work" ? "Writing..." : "✦ Improve with AI"}
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      value={work.description}
                      placeholder="Describe your impact and responsibilities."
                      onChange={(event) => onUpdateWork(index, "description", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="add-entry"
              type="button"
              onClick={() => onUpdateResume("workExperience", [...experience, { company: "", position: "", startDate: "", endDate: "", description: "" }])}
            >
              + Add experience
            </button>
          </section>

          <section className="editor-section">
            <div className="editor-section-heading">
              <h3><span className="section-number">05</span>Education</h3>
            </div>
            {education.map((item, index) => (
              <div className="entry-card" key={`education-${index}`}>
                <div className="entry-topline">
                  <strong>Education {index + 1}</strong>
                  <button
                    className="icon-button"
                    aria-label="Remove education"
                    onClick={() => onUpdateResume("education", education.filter((_, itemIndex) => itemIndex !== index))}
                    type="button"
                  >
                    x
                  </button>
                </div>
                <div className="fields-grid">
                  <Field label="Institution" value={item.institute} onChange={(value) => onUpdateEducation(index, "institute", value)} />
                  <Field label="Degree / qualification" value={item.degree} onChange={(value) => onUpdateEducation(index, "degree", value)} />
                  <Field label="Start date" value={item.startDate} onChange={(value) => onUpdateEducation(index, "startDate", value)} />
                  <Field label="End date" value={item.endDate} onChange={(value) => onUpdateEducation(index, "endDate", value)} />
                </div>
              </div>
            ))}
            <button
              className="add-entry"
              type="button"
              onClick={() => onUpdateResume("education", [...education, { institute: "", degree: "", startDate: "", endDate: "" }])}
            >
              + Add education
            </button>
          </section>

          <section className="editor-section">
            <div className="editor-section-heading">
              <h3><span className="section-number">06</span>Projects</h3>
            </div>
            {projects.map((project, index) => (
              <div className="entry-card" key={`project-${index}`}>
                <div className="entry-topline">
                  <strong>Project {index + 1}</strong>
                  <button
                    className="icon-button"
                    aria-label="Remove project"
                    onClick={() => onUpdateResume("projects", projects.filter((_, itemIndex) => itemIndex !== index))}
                    type="button"
                  >
                    x
                  </button>
                </div>
                <div className="fields-grid">
                  <Field label="Project name" value={project.title} onChange={(value) => onUpdateProject(index, "title", value)} />
                  <Field label="Technologies (comma separated)" value={project.techStack.join(", ")} onChange={(value) => onUpdateProject(index, "techStack", value)} />
                  <Field label="GitHub URL" value={project.githubUrl} onChange={(value) => onUpdateProject(index, "githubUrl", value)} />
                  <Field label="Live project URL" value={project.liveUrl} onChange={(value) => onUpdateProject(index, "liveUrl", value)} />
                  <div className="field field-wide">
                    <div className="editor-section-heading">
                      <label>Description</label>
                      <button
                        className="ai-button"
                        disabled={Boolean(aiAction)}
                        onClick={() =>
                          onRunAi<{ projectDesc: string }>(
                            "project",
                            "/api/ai/generate-projectDesc",
                            {
                              projectName: project.title,
                              projectIdea: project.description || project.title,
                              techStack: project.techStack,
                            },
                            (data) => onUpdateProject(index, "description", data.projectDesc),
                          )
                        }
                        type="button"
                      >
                        {aiAction === "project" ? "Writing..." : "✦ Write with AI"}
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      value={project.description}
                      placeholder="What did you build and why?"
                      onChange={(event) => onUpdateProject(index, "description", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="add-entry"
              type="button"
              onClick={() => onUpdateResume("projects", [...projects, { title: "", description: "", techStack: [], githubUrl: "", liveUrl: "" }])}
            >
              + Add project
            </button>
          </section>

          <section className="editor-section">
            <div className="editor-section-heading">
              <h3><span className="section-number">07</span>Skills & certifications</h3>
              <button
                className="ai-button"
                disabled={Boolean(aiAction)}
                onClick={() =>
                  onRunAi<{ skills: string }>(
                    "skills",
                    "/api/ai/generate-skills",
                    {
                      experienceLevel: "Professional",
                      jobTitle: resume.title || "Professional",
                    },
                    (data) =>
                      onUpdateResume(
                        "Skills",
                        data.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
                      ),
                  )
                }
                type="button"
              >
                {aiAction === "skills" ? "Finding skills..." : "✦ Suggest skills"}
              </button>
            </div>
            <div className="fields-grid">
              <TextArea
                label="Skills (separate with commas)"
                value={skills.join(", ")}
                placeholder="Communication, project management, ..."
                onChange={(value) => onUpdateResume("Skills", value.split(",").map((skill) => skill.trim()).filter(Boolean))}
                rows={3}
              />
              <TextArea
                label="Certifications"
                value={certifications}
                placeholder="Certification name, issuer, year"
                onChange={(value) => onUpdateResume("certifications", value)}
                rows={3}
              />
            </div>
          </section>
        </section>
        <ResumePreview resume={resume} />
      </div>
    </main>
  );
}
