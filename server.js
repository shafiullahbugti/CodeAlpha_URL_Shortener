require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("CodeAlpha URL Shortener API is Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});