# ShopNow

ShopNow is a full-stack e-commerce application built with React for the frontend, Express for the backend, 
MongoDB Atlas for the database, and includes an Admin page for managing the platform.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Features

+ User Authentication (Login/Register)
+ Product Listings
+ Shopping Cart
+ Admin Dashboard for managing products

## Technologies

### Frontend

* React
* useContext (for provide data from database to display)
* React Router (for navigation)

### Backend

* Express
* Node
* MongoDB Atlas
* Mongoose (for MongoDB object modeling)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB Atlas Account

### Backend Setup

1. Clone the repository:
   (in bash or terminal)
   - git clone   https://github.com/gabrielmilitaosantos/ShopNow.git
   - cd shopnow

2. Install backend dependencies:
   (in bash or terminal)
   - cd backend
   - npm install
  
3. Create a '.env' file in the 'backend' directory and add the following environment variables:
   
   MONGODB_URI=your_mongodb_atlas_connection_string <br>
   JWT_SECRET=your_jwt_secret

4. Start the backend server
    - npm start
  
#### Admin Setup

1. Install admin dependencies:
   (in bash or terminal)
   - cd admin
   - npm install

2. Start the admin server:

    - npm run dev
    - available on localhost:5173

### Frontend Setup

1. Install frontend dependencies:
   (in bash or terminal)
   - cd frontend
   - npm install

2. Start the frontend server:

    - npm start

## Usage

1. Register a new user or log in with a existing account
2. Browse products and add them to your shopping cart
3. Admin users can access the Admin Dashboard to manage products
