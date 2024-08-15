# E-Commerce Platform

This is a simple e-commerce platform where users can browse products, add items to their cart, and proceed to checkout. The project is divided into two main parts: frontend (React) and backend (Node.js with Express and in-memory data storage).


### 1. Frontend

The frontend is built using React and Axios for making API requests to the backend.

**To run the frontend:**

    1. Navigate to the frontend directory:
    cd ecommerce-frontend

    2. Install all dependencies:
        npm install

    3. Start the frontend development server:
        npm start

This will start the React app on http://localhost:3000.

### 2. Backend
The backend is built using Node.js, Express, and an in-memory store for data persistence (no database is used). The backend handles user authentication, product management, and cart functionality.

To run the backend server:

    1. Navigate to the backend directory:
        cd ../backend

    2. Install all dependencies:
        npm install

    3. Start the backend server:
        npm start

Features
    Product Listing: Browse available products on the homepage.
    Cart Management: Add or remove items from the cart.
    Checkout: Proceed to checkout and place an order.
    User Authentication: Users need to be logged in to access certain features.

Configuration
    The backend server runs on http://localhost:5000.
    The frontend server runs on http://localhost:3000.
    A proxy has been set up in the frontend to forward API requests to the backend during development.



