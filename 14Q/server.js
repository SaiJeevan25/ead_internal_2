const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

// Serve frontend files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Product catalogue API is running');
});


// Middleware to parse JSON bodies
app.use(express.json());

// In-memory product catalogue
let products = []; // Initially empty

// GET /products/:id - retrieve product by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert ID to number
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

// POST /products - add a new product
app.post('/products', (req, res) => {
    const { id, name, category, price } = req.body;

    if (!id || !name || !category || !price) {
        return res.status(400).json({ message: 'All fields are required: id, name, category, price' });
    }

    // Check if product with same ID exists
    if (products.some(p => p.id === id)) {
        return res.status(400).json({ message: 'Product with this ID already exists' });
    }

    const newProduct = { id, name, category, price };
    products.push(newProduct);

    res.status(201).json(newProduct);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
