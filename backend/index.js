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
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
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
    console.log("All Products Fetched");
    res.send(products);
});

app.listen(port, (err) => {
    if (!err) {
        console.log("Server Running on Port: " + port);
    }
    else {
        console.log("Error: " + err);
    }
});