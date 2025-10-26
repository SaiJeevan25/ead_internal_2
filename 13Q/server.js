const express = require("express");
const cors = require("cors"); // Only if you want frontend to call this API

const app = express();
const port = 3000;

app.use(cors());       
app.use(express.json());
app.use(express.static("public"));

// /greet/:name route
app.get("/greet/:name", (req, res) => {
    const name = req.params.name;
    const title = req.query.title;

    if (!name) {
        return res.status(400).json({ message: "Name is required in URL." });
    }

    const greeting = title
        ? `Hello, ${title} ${name}!`
        : `Hello, ${name}!`;

    res.json({ greeting });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
