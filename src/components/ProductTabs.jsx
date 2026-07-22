function ProductTabs({ activeTab, setActiveTab, reviews }) {
  return (
    <div className="mt-16 border-b flex gap-10">

      <button
        onClick={() => setActiveTab("description")}
        className={`pb-3 transition ${
          activeTab === "description"
            ? "border-b-2 border-red-600 text-red-600 font-semibold"
            : "text-gray-500 hover:text-red-600"
        }`}
      >
        Description
      </button>

      <button
        onClick={() => setActiveTab("reviews")}
        className={`pb-3 transition ${
          activeTab === "reviews"
            ? "border-b-2 border-red-600 text-red-600 font-semibold"
            : "text-gray-500 hover:text-red-600"
        }`}
      >
       Reviews ({reviews.length})
      </button>

    </div>
  );
}

export default ProductTabs;