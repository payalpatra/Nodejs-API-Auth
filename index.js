const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

/// Import Routes
const authRoute = require("./routes/auth");

/// .env
dotenv.config();

//Connection to database

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

// Middleware
app.use(express.json());
// Route Middleware
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("The serving is running"));
