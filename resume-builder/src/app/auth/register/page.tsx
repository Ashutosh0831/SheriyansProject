"use client";

import AuthScreen from "@/components/auth/AuthScreen";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function RegisterPage() {
  const auth = useAuthForm(true);

  return (
    <AuthScreen
      registering
      submitting={auth.submitting}
      error={auth.error}
      onSubmit={auth.submit}
    />
  );
}
