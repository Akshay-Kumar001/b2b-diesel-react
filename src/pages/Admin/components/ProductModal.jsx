function ProductModal({
  product,
  onClose,
  onChange,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {product._id ? "Edit Product" : "Add Product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={product.image}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={product.description}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              {product._id ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ProductModal;