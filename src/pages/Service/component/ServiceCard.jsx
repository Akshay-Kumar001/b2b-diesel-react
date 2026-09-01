import { Settings } from "lucide-react";

function ServiceCard({ service }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      
      <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition">
        <Settings size={24} strokeWidth={1.8} />
      </div>

      <h2 className="text-xl font-bold mt-6">
        {service.title}
      </h2>

      <p className="text-gray-600 mt-3 leading-7">
        {service.description}
      </p>

    </div>
  );
}

export default ServiceCard;