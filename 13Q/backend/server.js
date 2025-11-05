import express from "express"
import cors from "cors"

const app = express();
app.use(cors());

app.get("/greet/:name", (req, res) => {
  const title = req.query.title ? req.query.title + " " : "";
  res.json({ message: `Hello, ${title}${req.params.name}!` });
});

app.listen(3000, () => console.log("Server running on 3001"));
