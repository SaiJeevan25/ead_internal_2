import React, { useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Function to check password strength
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (pwd.length === 0) return "";
    if (score <= 2) return "Weak";
    if (score === 3) return "Medium";
    return "Strong";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    // Update message based on strength
    const strength = getPasswordStrength(pwd);
    if (strength === "Weak") setMessage("⚠️ Password is weak");
    else if (strength === "Medium") setMessage("⚠️ Password is medium");
    else if (strength === "Strong") setMessage("✅ Password is strong");
    else setMessage("");
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);

    if (password && confirmPwd && password !== confirmPwd) {
      setMessage("❌ Passwords do not match");
    } else if (password && confirmPwd && password === confirmPwd) {
      setMessage("✅ Passwords match");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setMessage("⚠️ Please fill both fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    if (getPasswordStrength(password) === "Weak") {
      setMessage("⚠️ Password is too weak");
      return;
    }

    setMessage("✅ Password set successfully!");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center" }}>Set Password</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "#fff",
          cursor: "pointer"
        }}>
          Submit
        </button>
      </form>
      {message && (
        <p style={{
          marginTop: "15px",
          textAlign: "center",
          color: message.includes("✅") ? "green" : "red"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
