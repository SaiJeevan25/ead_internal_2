import React, { useState } from "react";

export default function App() {
  // Predefined credentials
  const predefined = {
    username: "admin",
    password: "password123"
  };

  // State for inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State for message
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("⚠️ Please enter both username and password");
      return;
    }

    if (username === predefined.username && password === predefined.password) {
      setMessage("✅ Login successful!");
    } else {
      setMessage("❌ Invalid username or password");
    }
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
      <h2 style={{ textAlign: "center" }}>Login Form</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "#fff",
          cursor: "pointer"
        }}>
          Login
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "15px", textAlign: "center", color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
