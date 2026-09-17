function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        <div className="w-12 h-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;