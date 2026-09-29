# 🛒 Fullstack E-Commerce Application

A complete fullstack e-commerce web application implementing **full CRUD operations** on products, built with **React + TypeScript + Vite** on the frontend and **Node.js + Express + MySQL** on the backend, connected through a REST API.

## ✨ Features

- 📦 **Dynamic product listing** fetched from a MySQL database via REST API
- 🔍 **Product details page** served by a dedicated single-product endpoint
- ➕ **Add products** through a controlled form (POST API)
- ✏️ **Edit products** with a prefilled reusable form (PUT API)
- 🗑️ **Delete products** with a confirmation modal (DELETE API)
- 🪝 **Custom hooks** for logic reuse: `useCounter`, `useTimer`, `useFetchProductDetails`
- 🧠 **Global state management** with Redux Toolkit
- 🧭 **Nested & dynamic routing** with React Router
- 🎨 **Responsive UI** styled with Tailwind CSS
- 🔐 **Environment-based configuration** (`.env`) on both client and server

## 🛠️ Tech Stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React 18, TypeScript, Vite, Redux Toolkit, React Router DOM, Tailwind CSS |
| Backend   | Node.js, Express, MySQL (mysql2), CORS, dotenv |

## 📁 Project Structure

```
fullstack-ecommerce/
├── ecommerce-backend/
│   ├── routes/
│   │   └── products.js        # REST API routes (CRUD)
│   ├── db.js                  # MySQL connection pool
│   ├── index.js               # Express server entry point
│   └── .env                   # Server & DB credentials (git-ignored)
└── ecommerce-frontend/
    ├── public/                # Product images served statically
    ├── src/
    │   ├── components/        # Layout, Products, ProductDetails,
    │   │                      # AddEditProducts, DeleteConfirmationModal...
    │   ├── hooks/             # useCounter, useTimer, useFetchProductDetails
    │   ├── store/             # Redux store + productSlice
    │   ├── App.tsx            # Route configuration (useRoutes)
    │   └── main.tsx           # Entry: Redux Provider + BrowserRouter
    └── .env                   # VITE_API_BASE_URL (git-ignored)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL Server running locally

### 1. Database Setup
```sql
CREATE DATABASE local_db;
USE local_db;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  description TEXT
);

-- Optional seed data
INSERT INTO products (name, image, price, description) VALUES
('Apple', '/apple.jpg', 20, 'Crisp and sweet, perfect for a healthy snack.'),
('Banana', '/banana.jpg', 5, 'Rich in potassium and natural energy.'),
('Pineapple', '/pineapple.jpg', 12, 'Tropical, tangy and full of vitamin C.');
```

### 2. Run the Backend
```bash
cd ecommerce-backend
npm install
# Create a .env file with your credentials (see table below)
npm run dev        # Server runs on http://localhost:5000
```

### 3. Run the Frontend
```bash
cd ecommerce-frontend
npm install
# Create a .env file: VITE_API_BASE_URL=http://localhost:5000
npm run dev        # App runs on http://localhost:5173
```

## 🔐 Environment Variables

### Backend `.env`
| Variable      | Description                | Example        |
|---------------|----------------------------|----------------|
| `PORT_NUMBER` | Express server port        | `5000`         |
| `DB_HOST`     | MySQL host                 | `localhost`    |
| `DB_USER`     | MySQL user                 | `root`         |
| `DB_PASSWORD` | MySQL password             | `your_password`|
| `DB_NAME`     | Database name              | `local_db`     |
| `DB_PORT`     | MySQL port                 | `3306`         |

### Frontend `.env`
| Variable            | Description          | Example                   |
|---------------------|----------------------|---------------------------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000`   |

> ⚠️ Both `.env` files are git-ignored and must never be pushed to GitHub.

## 📡 API Endpoints

| Method   | Endpoint                | Description              |
|----------|-------------------------|--------------------------|
| `GET`    | `/products`             | Fetch all products       |
| `GET`    | `/products/:id`         | Fetch a single product   |
| `POST`   | `/products/add`         | Add a new product        |
| `PUT`    | `/products/update/:id`  | Update an existing product |
| `DELETE` | `/products/:id`         | Delete a product         |

## 📸 Screenshots

<!-- Add a /screenshots folder and embed your images like this: -->
<!-- ![Products List](screenshots/products.png) -->
<!-- ![Product Details](screenshots/details.png) -->
<!-- ![Delete Confirmation Modal](screenshots/modal.png) -->

## 🧠 Key Concepts Practiced

- REST API design & full CRUD implementation
- Parameterized SQL queries (SQL-injection safe)
- Redux Toolkit slices, store & selectors
- Nested and dynamic routing (`/products/edit/:id`)
- Controlled forms with dynamic `onChange` handling
- Custom hooks & cross-component logic reuse
- Conditional rendering & modal UX patterns
- Environment-based configuration for client & server

## 👤 Author

**Amin Agrebi** — [GitHub](https://github.com/AminAgrebi-lab)
