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

app.listen(port, (err) => {
    if (!err) {
        console.log("Server Running on Port: " + port);
    }
    else {
        console.log("Error: " + err);
    }
});

app.get("/", (req, res) => {
    res.send("Express working");
});