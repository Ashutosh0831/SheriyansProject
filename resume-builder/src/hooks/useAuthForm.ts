"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage, requestApi } from "@/lib/client-api";

export function useAuthForm(registering: boolean) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!body.phone) delete body.phone;

    try {
      await requestApi(registering ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      });
      router.replace("/dashboard");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setSubmitting(false);
    }
  }

  return { submitting, error, submit };
}
