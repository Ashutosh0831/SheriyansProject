"use client";

import { useId } from "react";

export function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  wide = false,
  required = false,
}: {
  label: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  wide?: boolean;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div className={`field${wide ? " field-wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        value={onChange ? value || "" : undefined}
        defaultValue={onChange ? undefined : value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <div className="field field-wide">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={rows}
        value={value || ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
