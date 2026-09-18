import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import API_URL from "../../../config/api";
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      // Get fresh data from backend
      const productsResponse = await fetch(
        `${API_URL}/api/products`,
      );

      const updatedProducts = await productsResponse.json();

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const isEditing = Boolean(formData._id);

  try {
    const url = isEditing
      ? `${API_URL}/api/products/${formData._id}`
      : `${API_URL}/api/products`;

    const method = isEditing ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        image: formData.image,
        description: formData.description,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to save product"
      );
    }

   

    // Get fresh products from backend
    const productsResponse = await fetch(
      `${API_URL}/api/products`,
    );

    const updatedProducts = await productsResponse.json();

    setProducts(updatedProducts);

    // Close modal
    setShowModal(false);

    // Reset form
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      image: "",
      description: "",
    });
  } catch (error) {
    console.error("Save product error:", error);
  }
};
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>

          <p className="mt-2 text-gray-600">Manage your products.</p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: "",
              price: "",
              category: "",
              stock: "",
              image: "",
              description: "",
            });

            setShowModal(true);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg transition"
        >
          + Add Product
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading products...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />

                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>

                  <td className="p-4 text-gray-600">{product.category}</td>

                  <td className="p-4">₹{product.price}</td>

                  <td className="p-4">{product.stock}</td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFormData({
                            name: product.name || "",
                            price: product.price || "",
                            category: product.category || "",
                            stock: product.stock || "",
                            image: product.image || "",
                            description: product.description || "",
                            _id: product._id,
                          });

                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <ProductModal
          product={formData}
          onClose={() => setShowModal(false)}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default AdminProducts;
