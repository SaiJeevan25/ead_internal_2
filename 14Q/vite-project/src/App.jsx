import { useState } from "react";

function App() {
  const [product, setProduct] = useState({ id: "", name: "", category: "", price: "" });
  const [getId, setGetId] = useState("");
  const [result, setResult] = useState("");

  // POST /products → Add product
  const addProduct = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(product.id),
        name: product.name,
        category: product.category,
        price: Number(product.price)
      })
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  // GET /products/:id → Retrieve product
  const getProduct = async () => {
    if (!getId) return alert("Enter product ID");

    const res = await fetch(`http://localhost:3000/products/${getId}`);
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Product Catalogue</h1>

      {/* Add Product Form */}
      <form onSubmit={addProduct}>
        <h2>Add Product</h2>
        <input type="number" placeholder="ID" onChange={(e) => setProduct({ ...product, id: e.target.value })} required />
        <input type="text" placeholder="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
        <input type="text" placeholder="Category" onChange={(e) => setProduct({ ...product, category: e.target.value })} required />
        <input type="number" placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
        <button type="submit">Add Product</button>
      </form>

      {/* Get Product by ID */}
      <div>
        <h2>Get Product</h2>
        <input type="number" placeholder="Enter Product ID" onChange={(e) => setGetId(e.target.value)} />
        <button onClick={getProduct}>Get</button>
      </div>

      {/* Result Display */}
      <h3>Result:</h3>
      <pre style={{ background: "#f4f4f4", padding: "10px" }}>{result}</pre>
    </div>
  );
}

export default App;
