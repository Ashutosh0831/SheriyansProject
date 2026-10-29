"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { Field } from "@/components/common/FormFields";

type AuthScreenProps = {
  registering: boolean;
  submitting: boolean;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function AuthScreen({
  registering,
  submitting,
  error,
  onSubmit,
}: AuthScreenProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Folio home">
          <span className="brand-mark">f</span> folio
        </Link>
        <span className="save-state">Your next opportunity starts here</span>
      </header>
      <main className="auth-layout">
        <section className="auth-aside">
          <span className="eyebrow">A clearer way to move forward</span>
          <h1>Your experience deserves a great first impression.</h1>
          <p>
            Bring your story together, polish the details, and create a resume
            that is ready to share with the world.
          </p>
          <div className="auth-aside-note">
            <span className="brand-mark">✓</span>
            <span>Simple, focused, and made for your next big step.</span>
          </div>
        </section>
        <section className="auth-panel">
          <div className="auth-card">
            <span className="eyebrow">
              {registering ? "Get started" : "Welcome back"}
            </span>
            <h2>{registering ? "Create your account" : "Sign in to Folio"}</h2>
            <p>
              {registering
                ? "Save your resumes and pick up where you left off."
                : "Your resume workspace is ready when you are."}
            </p>
            <form className="form-stack" onSubmit={onSubmit}>
              {registering && (
                <>
                  <Field label="Full name" name="name" required />
                  <Field
                    label="Phone number (optional)"
                    name="phone"
                    type="tel"
                  />
                </>
              )}
              <Field
                label="Email address"
                name="email"
                type="email"
                required
              />
              <Field
                label="Password"
                name="password"
                type="password"
                required
              />
              {error && <div className="notice notice-error">{error}</div>}
              <button
                className="button button-primary"
                disabled={submitting}
              >
                {submitting
                  ? "Please wait..."
                  : registering
                    ? "Create account"
                    : "Sign in"}
              </button>
            </form>
            <div className="auth-switch">
              {registering ? "Already have an account?" : "New to Folio?"}{" "}
              <Link
                className="text-button"
                href={registering ? "/auth/login" : "/auth/register"}
              >
                {registering ? "Sign in" : "Create an account"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
