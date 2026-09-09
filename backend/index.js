const express = require("express");

const app = express();

const PORT = 5000;

app.use(express.json());

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("B2B Diesel Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});