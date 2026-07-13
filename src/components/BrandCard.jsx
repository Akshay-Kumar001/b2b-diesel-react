function BrandCard({ brand }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 p-8 flex flex-col items-center">

      <img
        src={brand.image}
        alt={brand.name}
        className="h-20 object-contain"
      />

      <h3 className="mt-6 font-semibold text-gray-700">
        {brand.name}
      </h3>

    </div>
  );
}

export default BrandCard;