import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } else {
      alert("Invalid credentials");
    }
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProfile(data);
  };

  const handleLogout = () => {
    setToken("");
    setProfile(null);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h2>JWT Authentication Demo</h2>

      {!token ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>Logged in successfully!</p>
          <button onClick={fetchProfile}>Get Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {profile && (
        <div>
          <h3>Profile Data:</h3>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
