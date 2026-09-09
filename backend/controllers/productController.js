const getProducts = (req, res) => {
  res.json([
    {
      id: 1,
      name: "Diesel Engine",
      price: 25000,
    },
    {
      id: 2,
      name: "Turbocharger",
      price: 15000,
    },
  ]);
};

module.exports = {
  getProducts,
};