const express = require('express');
const router = express.Router(); // Create a mini-app router for better code organization
const pool = require('../db');

// GET: Fetch all products from the database
router.get('/', (req, res) => {
    pool.query('SELECT * FROM products', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
        // Note: For single product fetch, we will send rows[0] instead of rows
    });
});

// GET: Fetch a single unique product by ID
router.get('/:id', (req, res) => {
    const { id } = req.params; // Destructure the ID from route parameters
    const query = 'SELECT * FROM products WHERE id = ?';
    
    pool.query(query, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        
        // Send the specific element of the array (an object) instead of the whole array
        res.status(200).json(rows[0]); 
    });
});

// POST: Add a new product to the database
router.post('/add', (req, res) => {
    const { name, image, price, description } = req.body;
    // Use parameterized queries (?) to prevent SQL Injection attacks
    const query = 'INSERT INTO products (name, image, price, description) VALUES (?, ?, ?, ?)';
    
    pool.query(query, [name, image, price, description], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        // Send a proper success message to the client
        res.status(201).json({ message: 'Product added successfully' });
    });
});

// PUT: Update an existing product by ID
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, image, price, description } = req.body;
    const query = 'UPDATE products SET name = ?, image = ?, price = ?, description = ? WHERE id = ?';
    
    pool.query(query, [name, image, price, description, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Product updated successfully' });
    });
});

// DELETE: Delete a specific product from the table
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    
    pool.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

module.exports = router;