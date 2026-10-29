"use client";

import { blankPersonalInfo, Resume } from "@/types/resume";

export default function ResumePreview({ resume }: { resume: Resume }) {
  const personal = { ...blankPersonalInfo, ...resume.personalInfo };
  const skills = resume.Skills || [];
  const certifications = Array.isArray(resume.certifications)
    ? resume.certifications.join(", ")
    : resume.certifications || "";
  const experience = resume.workExperience || [];
  const education = resume.education || [];
  const projects = resume.projects || [];

  return (
    <aside className="preview-pane">
      <div className="preview-toolbar">
        <span>LIVE PREVIEW</span>
        <span>Standard resume format</span>
      </div>
      <article className="resume-paper">
        <h2>{personal.fullname || "Your Name"}</h2>
        <div className="resume-paper-contact">
          {[
            personal.email,
            personal.phone,
            personal.location,
            personal.linkedIn,
            personal.github,
          ]
            .filter(Boolean)
            .map((value) => <span key={value}>{value}</span>)}
        </div>
        {resume.summary && (
          <section className="resume-paper-section">
            <h3>Professional summary</h3>
            <p>{resume.summary}</p>
          </section>
        )}
        {experience.length > 0 && (
          <section className="resume-paper-section">
            <h3>Experience</h3>
            {experience.map((work, index) => (
              <div className="resume-paper-item" key={`preview-work-${index}`}>
                <strong>
                  {work.position || work.postion || "Position"}
                  {work.company ? ` | ${work.company}` : ""}
                </strong>
                <br />
                <small>
                  {[work.startDate, work.endDate].filter(Boolean).join(" - ")}
                </small>
                {work.description && <p>{work.description}</p>}
              </div>
            ))}
          </section>
        )}
        {education.length > 0 && (
          <section className="resume-paper-section">
            <h3>Education</h3>
            {education.map((item, index) => (
              <div className="resume-paper-item" key={`preview-education-${index}`}>
                <strong>
                  {item.degree || "Degree"}
                  {item.institute ? ` | ${item.institute}` : ""}
                </strong>
                <br />
                <small>
                  {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
                </small>
              </div>
            ))}
          </section>
        )}
        {projects.length > 0 && (
          <section className="resume-paper-section">
            <h3>Projects</h3>
            {projects.map((project, index) => (
              <div className="resume-paper-item" key={`preview-project-${index}`}>
                <strong>
                  {project.title || "Project"}
                  {project.techStack?.length
                    ? ` | ${project.techStack.join(", ")}`
                    : ""}
                </strong>
                {project.description && <p>{project.description}</p>}
              </div>
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section className="resume-paper-section">
            <h3>Skills</h3>
            <div className="skill-list">
              {skills.map((skill) => (
                <span className="skill-chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        {certifications && (
          <section className="resume-paper-section">
            <h3>Certifications</h3>
            <p>{certifications}</p>
          </section>
        )}
        {!resume.summary &&
          experience.length === 0 &&
          education.length === 0 &&
          projects.length === 0 &&
          skills.length === 0 && (
            <section className="resume-paper-section">
              <h3>Your resume preview</h3>
              <p>Start filling in your details to see your resume take shape.</p>
            </section>
          )}
      </article>
    </aside>
  );
}
