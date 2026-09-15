import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductProvider };
export default ProductContext;