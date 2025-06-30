import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function StyledInput({ label, error, ...props }: Props) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-semibold text-gray-700">{label}</label>
      <input
        className={`border rounded px-3 py-2 outline-none transition
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? "border-red-500" : "border-gray-300"}
          `}
        {...props}
      />
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
}
