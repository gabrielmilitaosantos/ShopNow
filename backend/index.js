import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import env from 'dotenv';

const port = 4000;
const app = express();
env.config();

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(process.env.MONGODB_URI);

// API
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post("/addproduct", async (req, res) => {
    let products = await Product.find({}); // Find all products from db
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1); // Get the last item
        let last_product = last_product_array[0]; // Assign the last item in index 0 to a variable
        id = last_product.id + 1; // Increment new id to last product.
    }
    else {
        id = 1;
    }
    const product = new Product({ // Adding the new product to DB Schema
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Delete products
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// Schema creating for User model
const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Creating Endpoint for registering the user
app.post("/signup", async (req, res) => {
    // Check if user exists
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return (
            res.status(400)
                .json({ success: false, errors: "Existing user found with same email" })
        )
    }

    // Create a empty cart for new user
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    // Create a new user
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    // Create new id for token
    const data = {
        user: {
            id: user.id
        }
    }

    // Set token available for the user
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
});

// Create endpoint for user login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Invalid Email" });
    }
});

// Endpoint for NewCollection data
app.get("/newcollections", async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    res.send(newCollection);
});

// Endpoint for 'Popular In Women' section
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    res.send(popular_in_women);
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" })
        }
    }
}

// Endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.json({ message: "Added" })
});

// Endpoint for remove products from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.json({ message: "Removed" })
});

// Endpoint for get cartdata from database and display in frontend
app.post("/getcart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData);
});

app.listen(port, (err) => {
    if (!err) {
        console.log("Server Running on Port: " + port);
    }
    else {
        console.log("Error: " + err);
    }
});