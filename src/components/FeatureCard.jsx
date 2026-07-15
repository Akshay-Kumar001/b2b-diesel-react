function FeatureCard({ feature }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">

      <div className="text-5xl mb-5">
        {feature.icon}
      </div>

      <h3 className="text-xl font-bold mb-3">
        {feature.title}
      </h3>

      <p className="text-gray-600 leading-7">
        {feature.description}
      </p>

    </div>
  );
}

export default FeatureCard;