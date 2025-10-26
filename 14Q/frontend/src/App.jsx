import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ id: "", name: "", category: "", price: "" });
  const [getId, setGetId] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: +form.id, price: +form.price }),
      });
      setResult(JSON.stringify(await res.json(), null, 2));
      setForm({ id: "", name: "", category: "", price: "" });
    } catch {
      setResult("Error adding product");
    }
  };

  const getProduct = async () => {
    if (!getId) return alert("Enter ID");
    try {
      const res = await fetch(`http://localhost:3000/products/${getId}`);
      setResult(JSON.stringify(await res.json(), null, 2));
    } catch {
      setResult("Error fetching product");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Product Catalogue</h1>

      <form onSubmit={addProduct}>
        {["id", "name", "category", "price"].map((f) => (
          <input
            key={f}
            id={f}
            value={form[f]}
            onChange={handleChange}
            placeholder={f[0].toUpperCase() + f.slice(1)}
            style={{ width: "100%", marginBottom: 8, padding: 6 }}
            required
          />
        ))}
        <button type="submit">Add Product</button>
      </form>

      <h3 style={{ marginTop: 20 }}>Get Product</h3>
      <input
        type="number"
        placeholder="Enter product ID"
        value={getId}
        onChange={(e) => setGetId(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 6 }}
      />
      <button onClick={getProduct}>Get Product</button>

      <pre style={{ background: "#f5f5f5", padding: 10, marginTop: 20 }}>{result}</pre>
    </div>
  );
}
