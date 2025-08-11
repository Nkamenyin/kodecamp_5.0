const express = require('express');
const app = express();
app.use(express.json());

let products = []; // In-memory products array
let nextId = 1;

//A GET route to get the products
app.get('/products', (req, res) => {
    res.json(products);
});

// A GET route to get a product by it’s ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({message: 'Product not found'});
    res.json(product);
});

//A POST route to add a new product
app.post('/products', (req, res) => {
    const {name, price, stockStatus } = req.body;
    if (!name || !price || !stockStatus) {
        return res.status(400).json({message: 'Missing fields'});
    }

    const product = {
        id: nextId++,
        name,
        price,
        stockStatus
    };
    products.push(product);
    res.status(201).json(product);
});

// A PATCH route that allows product edit (except stock status)
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({message: 'Product not found'});

    const {name, price} = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;

    res.json(product);
});

//A PATCH route that allows a product’s status to be changed only
app.patch('/products/:id/:status', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({message: 'Product not found'});

    const validStatus = ['in-stock', 'out-of-stock'];
    const {status} = req.params;

    if (!validStatus.includes(status)) {
        return res.status(400).json({message: 'Invalid stock status'});
    }

    product.stockStatus = status;
    res.json(product);
});

//A DELETE route that allows a product to be deleted
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'Product not found'});

    const deleted = products.splice(index, 1);
    res.json({message: 'Product deleted', product: deleted[0]});
});