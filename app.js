require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ import cors

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(cors())

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
