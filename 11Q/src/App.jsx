import React, { useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");

  // Define password rules
  const rules = [
    {
      name: "Minimum 8 characters",
      test: (pwd) => pwd.length >= 8,
    },
    {
      name: "At least one uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      name: "At least one number",
      test: (pwd) => /\d/.test(pwd),
    },
    {
      name: "At least one special character",
      test: (pwd) => /[^A-Za-z0-9]/.test(pwd),
    },
  ];

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",

      borderRadius: "10px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center" }}>Set Your Password</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "15px"
        }}
      />

      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {rules.map((rule, index) => {
          const isValid = rule.test(password);
          return (
            <li key={index} style={{
              color: isValid ? "green" : "red",
              marginBottom: "5px"
            }}>
              {isValid ? "✓" : "✕"} {rule.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
