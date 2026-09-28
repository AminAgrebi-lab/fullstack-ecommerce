const express = require('express');
const cors = require('cors'); // Import CORS to allow cross-origin requests from React
const productsRouter = require('./routes/products');
require('dotenv').config();

const app = express();
const port = process.env.PORT_NUMBER || 5000;

// Middlewares
app.use(cors()); // Allow cross-origin data sharing between Frontend and Backend
app.use(express.json()); // Parse incoming JSON requests from the client

// Routes: Prefix all product routes with '/products'
app.use('/products', productsRouter);

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running successfully on port: ${port}`);
});