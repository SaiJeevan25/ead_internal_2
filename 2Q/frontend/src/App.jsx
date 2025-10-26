import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Enter both username and password");
      setMessageColor("red");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      setMessage(data.message);
      setMessageColor(res.ok ? "green" : "red");

      if (res.ok) {
        setUsers(data.allUsers || []);
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setMessage("Error connecting to server");
      setMessageColor("red");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Register</button>
      </form>
      {message && <div style={{ marginTop: "16px", color: messageColor }}>{message}</div>}

      {users.length > 0 && (
        <div style={{ marginTop: "16px", textAlign: "left" }}>
          <h3>Registered Users:</h3>
          <ul>
            {users.map((u, index) => (
              <li key={index}>{u.username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
