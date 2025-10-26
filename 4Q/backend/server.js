import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Route: /api/calc/:operation
app.get("/api/calc/:operation", (req, res) => {
  const { operation } = req.params;
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Both num1 and num2 must be valid numbers." });
  }

  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0)
        return res.status(400).json({ error: "Cannot divide by zero." });
      result = num1 / num2;
      break;
    default:
      return res
        .status(400)
        .json({ error: "Invalid operation. Use add, subtract, multiply, or divide." });
  }

  res.json({ operation, num1, num2, result });
});

app.listen(port, () => {
  console.log(`✅ Calculator API running at http://localhost:${port}`);
});
