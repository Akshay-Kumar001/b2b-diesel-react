function ProductDescription({ product }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Product Description
      </h2>

      <p className="text-gray-600 leading-7">
        {product.description}
      </p>
    </div>
  );
}

export default ProductDescription;