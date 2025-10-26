import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");

  const sendGreet = async () => {
    if (!name.trim()) {
      setResult("Please enter a name.");
      return;
    }

    try {
      let url = `http://localhost:3000/greet/${name}`;
      if (title.trim()) url += `?title=${title}`;

      const response = await fetch(url);
      const data = await response.json();

      setResult(data.greeting || "No greeting received.");
    } catch (error) {
      setResult("Error connecting to server.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Greet Someone</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />

      <input
        type="text"
        placeholder="Enter title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />

      <button onClick={sendGreet} style={{ padding: "8px 16px" }}>
        Greet
      </button>

      <p style={{ marginTop: "16px", fontWeight: "bold" }}>{result}</p>
    </div>
  );
}

export default App;
