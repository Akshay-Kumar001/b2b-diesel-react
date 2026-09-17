const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");

connectDB();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("B2B Diesel Backend is running");
});

pp.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});