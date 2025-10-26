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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Password Strength Checker
        </h4>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className={`w-full border-2 px-4 py-2 rounded-lg outline-none transition ${borderClass} bg-gray-50 placeholder-gray-400`}
        />

        {strength && (
          <div className="mt-4 text-center">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                strength === "Weak"
                  ? "bg-red-100 text-red-600"
                  : strength === "Medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-emerald-100 text-emerald-600"
              }`}
            >
              {strength}
            </span>
          </div>
        )}

        {/* Rule checklist */}
        <ul className="mt-6 space-y-2 text-sm text-gray-700">
          <li className={`flex items-center ${checks.length ? "text-emerald-600" : "text-red-500"}`}>
            {checks.length ? "✓" : "✕"}&nbsp; Minimum 8 characters
          </li>
          <li className={`flex items-center ${checks.uppercase ? "text-emerald-600" : "text-red-500"}`}>
            {checks.uppercase ? "✓" : "✕"}&nbsp; One uppercase letter
          </li>
          <li className={`flex items-center ${checks.number ? "text-emerald-600" : "text-red-500"}`}>
            {checks.number ? "✓" : "✕"}&nbsp; One number
          </li>
          <li className={`flex items-center ${checks.special ? "text-emerald-600" : "text-red-500"}`}>
            {checks.special ? "✓" : "✕"}&nbsp; One special character
          </li>
        </ul>
      </div>
    </div>
  );
}
