"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthScreen from "@/components/auth/AuthScreen";
import { useAuthForm } from "@/hooks/useAuthForm";
import { ApiError, requestApi } from "@/lib/client-api";

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuthForm(false);

  useEffect(() => {
    let active = true;
    requestApi("/api/resumes")
      .then(() => {
        if (active) router.replace("/dashboard");
      })
      .catch((error: unknown) => {
        if (
          active &&
          (!(error instanceof ApiError) || error.status !== 401)
        ) {
          console.error("Could not check the current session", error);
        }
      });
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <AuthScreen
      registering={false}
      submitting={auth.submitting}
      error={auth.error}
      onSubmit={auth.submit}
    />
  );
}
