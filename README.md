# E-Commerce Platform

This is a simple e-commerce platform where users can browse products, add items to their cart, and proceed to checkout. The project is divided into two main parts: frontend (React) and backend (Node.js with Express and in-memory data storage). It has code for api docs


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
        
### 3. API Documentation with Swagger
    For testing the backend APIs, Swagger has been implemented. You can view the OpenAPI documentation by navigating to the following endpoint after starting the backend server:
    
    Swagger UI: http://localhost:5000/api-docs
    Swagger was used during the development phase to test the APIs, as the frontend implementation was not initially developed. This documentation will help you interact with and test the few API endpoints.


### 4. Features
    Product Listing: Browse available products on the homepage.
    Cart Management: Add or remove items from the cart.
    Checkout: Proceed to checkout and place an order.
    User Authentication: Users need to be logged in to access certain features.

Configuration
    The backend server runs on http://localhost:5000.
    The frontend server runs on http://localhost:3000.
    A proxy has been set up in the frontend to forward API requests to the backend during development.



