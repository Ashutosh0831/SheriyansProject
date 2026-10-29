"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage, requestApi } from "@/lib/client-api";
import { Resume } from "@/types/resume";

export function useDashboard() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const loadResumes = useCallback(async () => {
    const data = await requestApi<{ resumes: Resume[] }>("/api/resumes");
    setResumes(data.resumes);
  }, []);

  useEffect(() => {
    let active = true;
    requestApi<{ resumes: Resume[] }>("/api/resumes")
      .then((data) => {
        if (active) setResumes(data.resumes);
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (
          error instanceof Error &&
          "status" in error &&
          error.status === 401
        ) {
          router.replace("/auth/login");
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
  }, [router]);

  async function createResume() {
    setBusy(true);
    setNotice("");
    try {
      const resume = await requestApi<Resume>("/api/resumes/create", {
        method: "POST",
      });
      router.push(`/resumes/${resume._id}/edit`);
    } catch (error) {
      setNotice(getErrorMessage(error));
      setBusy(false);
    }
  }

  function openResume(resumeId: string) {
    router.push(`/resumes/${resumeId}/edit`);
  }

  async function deleteResume(resumeId: string) {
    if (!window.confirm("Delete this resume? This cannot be undone.")) return;
    setBusy(true);
    setNotice("");
    try {
      await requestApi(`/api/resumes/${resumeId}`, { method: "DELETE" });
      await loadResumes();
    } catch (error) {
      setNotice(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    setNotice("");
    try {
      await requestApi("/api/auth/logout", { method: "POST" });
      router.replace("/auth/login");
    } catch (error) {
      setNotice(getErrorMessage(error));
      setBusy(false);
    }
  }

  return {
    resumes,
    loading,
    busy,
    notice,
    createResume,
    openResume,
    deleteResume,
    logout,
  };
}
