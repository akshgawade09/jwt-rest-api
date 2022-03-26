const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// DB Connect
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("DB Connected...");
})

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

// Middlewares
app.use(express.json());

// Routes Middleware
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => console.log(`Server Up & Running...`));