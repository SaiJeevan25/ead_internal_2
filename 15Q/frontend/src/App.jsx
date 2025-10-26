import React, { useState } from "react";

export default function App() {
  const [response, setResponse] = useState("");

  const callRoute = async (route) => {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Error connecting to server");
    }
  };

  return (
    <div style={{  margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Express Server Test</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => callRoute("/info")} style={{ marginRight: "10px" }}>
          GET /info
        </button>
        <button onClick={() => callRoute("/status")}>GET /status</button>
      </div>

      <div>
        <h4>Response:</h4>
        <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
          {response}
        </pre>
      </div>
    </div>
  );
}
