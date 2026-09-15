const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");

connectDB();

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("B2B Diesel Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});