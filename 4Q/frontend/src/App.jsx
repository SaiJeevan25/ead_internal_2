import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");
  const [resultColor, setResultColor] = useState("black");

  const handleCalculate = async () => {
    if (num1 === "" || num2 === "") {
      setResult("Please enter both numbers.");
      setResultColor("red");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/calc/${operation}?num1=${num1}&num2=${num2}`
      );
      const data = await response.json();

      if (response.ok) {
        setResult(`Result: ${data.result}`);
        setResultColor("green");
      } else {
        setResult(`Error: ${data.error}`);
        setResultColor("red");
      }
    } catch (err) {
      setResult("Error connecting to server.");
      setResultColor("red");
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
      <h1>Calculator</h1>
      <input
        type="number"
        placeholder="Number 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />
      <input
        type="number"
        placeholder="Number 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      >
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
      <button
        onClick={handleCalculate}
        style={{ padding: "8px 16px", marginTop: "8px" }}
      >
        Calculate
      </button>
      {result && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: resultColor }}>
          {result}
        </p>
      )}
    </div>
  );
}

export default App;
