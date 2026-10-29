"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, getErrorMessage, requestApi } from "@/lib/client-api";
import {
  Education,
  PersonalInfo,
  Project,
  Resume,
  WorkExperience,
} from "@/types/resume";

export function useResumeEditor(resumeId: string) {
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saveState, setSaveState] = useState("Loading resume...");
  const [notice, setNotice] = useState("");
  const [aiAction, setAiAction] = useState("");

  useEffect(() => {
    let active = true;
    requestApi<{ resume: Resume }>(`/api/resumes/${resumeId}`)
      .then(({ resume: loadedResume }) => {
        if (!active) return;
        setResume({
          ...loadedResume,
          workExperience: (loadedResume.workExperience || []).map((work) => ({
            ...work,
            position: work.position || work.postion || "",
          })),
          projects: loadedResume.projects || [],
          education: loadedResume.education || [],
          Skills: loadedResume.Skills || [],
        });
        setSaveState("Ready to edit");
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          router.replace("/auth/login");
          return;
        }
        if (error instanceof ApiError && error.status === 404) {
          router.replace("/dashboard");
          return;
        }
        setNotice(getErrorMessage(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [resumeId, router]);

  function updateResume<K extends keyof Resume>(key: K, value: Resume[K]) {
    setResume((current) => (current ? { ...current, [key]: value } : current));
    setSaveState("Unsaved changes");
  }

  function updatePersonalInfo(key: keyof PersonalInfo, value: string) {
    setResume((current) =>
      current
        ? {
            ...current,
            personalInfo: { ...current.personalInfo, [key]: value },
          }
        : current,
    );
    setSaveState("Unsaved changes");
  }

  function updateWork(index: number, key: keyof WorkExperience, value: string) {
    setResume((current) =>
      current
        ? {
            ...current,
            workExperience: current.workExperience.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [key]: value } : item,
            ),
          }
        : current,
    );
    setSaveState("Unsaved changes");
  }

  function updateProject(index: number, key: keyof Project, value: string) {
    setResume((current) =>
      current
        ? {
            ...current,
            projects: current.projects.map((item, itemIndex) =>
              itemIndex === index
                ? {
                    ...item,
                    [key]:
                      key === "techStack"
                        ? value.split(",").map((skill) => skill.trim()).filter(Boolean)
                        : value,
                  }
                : item,
            ),
          }
        : current,
    );
    setSaveState("Unsaved changes");
  }

  function updateEducation(index: number, key: keyof Education, value: string) {
    setResume((current) =>
      current
        ? {
            ...current,
            education: current.education.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [key]: value } : item,
            ),
          }
        : current,
    );
    setSaveState("Unsaved changes");
  }

  async function saveResume() {
    if (!resume) return;
    setBusy(true);
    setNotice("");
    setSaveState("Saving...");
    try {
      const data = await requestApi<{ updateResume: Resume }>(
        `/api/resumes/${resume._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: resume.title,
            summary: resume.summary,
            personalInfo: resume.personalInfo,
            workExperience: resume.workExperience,
            projects: resume.projects,
            education: resume.education,
            Skills: resume.Skills,
            certifications: resume.certifications,
          }),
        },
      );
      setResume(data.updateResume);
      setSaveState("Saved just now");
    } catch (error) {
      setSaveState("Could not save");
      setNotice(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function runAi<T>(
    label: string,
    url: string,
    body: object,
    onSuccess: (data: T) => void,
  ) {
    setAiAction(label);
    setNotice("");
    try {
      const data = await requestApi<T>(url, {
        method: "POST",
        body: JSON.stringify(body),
      });
      onSuccess(data);
      setSaveState("Unsaved changes");
    } catch (error) {
      setNotice(getErrorMessage(error));
    } finally {
      setAiAction("");
    }
  }

  return {
    resume,
    loading,
    busy,
    saveState,
    notice,
    aiAction,
    saveResume,
    updateResume,
    updatePersonalInfo,
    updateWork,
    updateProject,
    updateEducation,
    runAi,
  };
}
