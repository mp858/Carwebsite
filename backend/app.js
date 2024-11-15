const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
