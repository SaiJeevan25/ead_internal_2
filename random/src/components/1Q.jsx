import React, { useState } from "react";

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score =
    (checks.length ? 1 : 0) +
    (checks.uppercase ? 1 : 0) +
    (checks.number ? 1 : 0) +
    (checks.special ? 1 : 0);

  const strength =
    password.length === 0 ? "" : score <= 2 ? "Weak" : score === 3 ? "Medium" : "Strong";

  const borderClass =
    strength === "Weak"
      ? "ring-2 ring-red-500 border-red-500"
      : strength === "Medium"
      ? "ring-2 ring-yellow-400 border-yellow-400"
      : strength === "Strong"
      ? "ring-2 ring-emerald-400 border-emerald-400"
      : "border-gray-300";

  return (
    <div className="bg-white/3 p-6 rounded-2xl border border-white/8 shadow-sm">
      <h4 className="text-lg font-semibold mb-4">Password Strength Checker</h4>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className={`w-full px-4 py-2 rounded-lg outline-none transition ${borderClass} bg-white/5 placeholder-gray-200`}
      />

      {strength && (
        <div className="mt-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              strength === "Weak"
                ? "bg-red-600/20 text-red-300"
                : strength === "Medium"
                ? "bg-yellow-600/20 text-yellow-300"
                : "bg-emerald-600/20 text-emerald-300"
            }`}
          >
            {strength}
          </span>
        </div>
      )}

      {/* Rule checklist */}
      <ul className="mt-4 space-y-1 text-sm">
        <li className={checks.length ? "text-emerald-300" : "text-red-300"}>
          {checks.length ? "✓" : "✕"} Minimum 8 characters
        </li>
        <li className={checks.uppercase ? "text-emerald-300" : "text-red-300"}>
          {checks.uppercase ? "✓" : "✕"} One uppercase letter
        </li>
        <li className={checks.number ? "text-emerald-300" : "text-red-300"}>
          {checks.number ? "✓" : "✕"} One number
        </li>
        <li className={checks.special ? "text-emerald-300" : "text-red-300"}>
          {checks.special ? "✓" : "✕"} One special character
        </li>
      </ul>
    </div>
  );
}
