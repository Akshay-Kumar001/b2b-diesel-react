const products = [
  {
    id: 1,
    name: "Cummins Air Compressor",
    price: 45000,
    image:
      "https://images.pexels.com/photos/5506052/pexels-photo-5506052.jpeg",
    category: "Engine",
    stock: true,
    description:
      "Heavy-duty air compressor designed for reliable performance and long service life.",
    reviews: [
      {
        id: 1,
        name: "Akshay",
        rating: 5,
        comment: "Excellent quality.",
      },
      {
        id: 2,
        name: "Rahul",
        rating: 4,
        comment: "Worth the price.",
      },
    ],
  },

  {
    id: 2,
    name: "Detroit Diesel Water Pump",
    price: 12000,
    image:
      "https://images.pexels.com/photos/7564863/pexels-photo-7564863.jpeg",
    category: "Cooling",
    stock: true,
    description:
      "Reliable water pump designed to maintain efficient engine cooling under heavy-duty conditions.",
    reviews: [
      {
        id: 1,
        name: "Akshay",
        rating: 5,
        comment: "Excellent quality.",
      },
      {
        id: 2,
        name: "Rahul",
        rating: 4,
        comment: "Works perfectly.",
      },
      {
        id: 3,
        name: "Bhavesh",
        rating: 4,
        comment: "Good product.",
      },
    ],
  },

  {
    id: 3,
    name: "Truck Oil Filter",
    price: 800,
    image:
      "https://images.pexels.com/photos/7564857/pexels-photo-7564857.jpeg",
    category: "Filter",
    stock: true,
    description:
      "Durable oil filter designed to remove contaminants and help protect heavy-duty engines.",
    reviews: [
      {
        id: 1,
        name: "Akshay",
        rating: 5,
        comment: "Excellent quality.",
      },
      {
        id: 2,
        name: "Rahul",
        rating: 4,
        comment: "Worth the price.",
      },
      {
        id: 3,
        name: "Bhavesh",
        rating: 4,
        comment: "Good quality.",
      },
    ],
  },

  {
    id: 4,
    name: "Heavy Duty Fuel Injector",
    price: 18500,
    image:
      "https://images.pexels.com/photos/7564860/pexels-photo-7564860.jpeg",
    category: "Fuel System",
    stock: true,
    description:
      "Precision-engineered fuel injector designed for efficient fuel delivery and dependable engine performance.",
    reviews: [],
  },

  {
    id: 5,
    name: "Diesel Turbocharger",
    price: 68000,
    image:
      "https://images.pexels.com/photos/5506052/pexels-photo-5506052.jpeg",
    category: "Engine",
    stock: true,
    description:
      "High-performance turbocharger built for heavy-duty diesel engine applications.",
    reviews: [],
  },

  {
    id: 6,
    name: "Cylinder Head Gasket",
    price: 4200,
    image:
      "https://images.pexels.com/photos/7564863/pexels-photo-7564863.jpeg",
    category: "Gaskets & Seals",
    stock: true,
    description:
      "Heavy-duty cylinder head gasket designed for dependable sealing and long-term performance.",
    reviews: [],
  },

  {
    id: 7,
    name: "Diesel Engine Piston Set",
    price: 22500,
    image:
      "https://images.pexels.com/photos/7564857/pexels-photo-7564857.jpeg",
    category: "Engine Internals",
    stock: true,
    description:
      "Durable piston set manufactured for demanding diesel engine applications.",
    reviews: [],
  },

  {
    id: 8,
    name: "Connecting Rod Assembly",
    price: 14500,
    image:
      "https://images.pexels.com/photos/7564860/pexels-photo-7564860.jpeg",
    category: "Engine Internals",
    stock: true,
    description:
      "Strong connecting rod assembly designed for reliable engine power transmission.",
    reviews: [],
  },

  {
    id: 9,
    name: "Heavy Duty Camshaft",
    price: 28500,
    image:
      "https://images.pexels.com/photos/5506052/pexels-photo-5506052.jpeg",
    category: "Valvetrain",
    stock: true,
    description:
      "Precision camshaft designed for accurate valve timing and reliable engine operation.",
    reviews: [],
  },

  {
    id: 10,
    name: "Diesel Fuel Pump",
    price: 32000,
    image:
      "https://images.pexels.com/photos/7564863/pexels-photo-7564863.jpeg",
    category: "Fuel System",
    stock: true,
    description:
      "Reliable diesel fuel pump engineered for consistent fuel delivery under heavy workloads.",
    reviews: [],
  },

  {
    id: 11,
    name: "Engine Thermostat",
    price: 2800,
    image:
      "https://images.pexels.com/photos/7564857/pexels-photo-7564857.jpeg",
    category: "Cooling",
    stock: true,
    description:
      "Heavy-duty thermostat designed to maintain proper engine operating temperature.",
    reviews: [],
  },

  {
    id: 12,
    name: "Diesel Engine Sensor",
    price: 3500,
    image:
      "https://images.pexels.com/photos/7564860/pexels-photo-7564860.jpeg",
    category: "Sensors",
    stock: true,
    description:
      "Reliable engine sensor built for accurate monitoring in demanding diesel applications.",
    reviews: [],
  },

  {
    id: 13,
    name: "Air Intake Manifold",
    price: 17800,
    image:
      "https://images.pexels.com/photos/5506052/pexels-photo-5506052.jpeg",
    category: "Air System",
    stock: true,
    description:
      "Heavy-duty intake manifold designed to provide efficient airflow to the engine.",
    reviews: [],
  },

  {
    id: 14,
    name: "Truck Alternator",
    price: 19500,
    image:
      "https://images.pexels.com/photos/7564863/pexels-photo-7564863.jpeg",
    category: "Electrical",
    stock: true,
    description:
      "Reliable alternator designed to provide consistent electrical power for heavy-duty trucks.",
    reviews: [],
  },

  {
    id: 15,
    name: "Heavy Duty Starter Motor",
    price: 21000,
    image:
      "https://images.pexels.com/photos/7564857/pexels-photo-7564857.jpeg",
    category: "Electrical",
    stock: true,
    description:
      "High-torque starter motor designed for dependable diesel engine starting performance.",
    reviews: [],
  },

  {
    id: 16,
    name: "Transmission Clutch Kit",
    price: 38500,
    image:
      "https://images.pexels.com/photos/7564860/pexels-photo-7564860.jpeg",
    category: "Transmission",
    stock: true,
    description:
      "Heavy-duty clutch kit designed for reliable power transfer and long service intervals.",
    reviews: [],
  },

  {
    id: 17,
    name: "Brake Air Compressor Valve",
    price: 6200,
    image:
      "https://images.pexels.com/photos/5506052/pexels-photo-5506052.jpeg",
    category: "Brake System",
    stock: true,
    description:
      "Durable air system valve designed for dependable heavy-duty truck braking applications.",
    reviews: [],
  },

  {
    id: 18,
    name: "Exhaust Gas Recirculation Valve",
    price: 15500,
    image:
      "https://images.pexels.com/photos/7564863/pexels-photo-7564863.jpeg",
    category: "Emissions System",
    stock: true,
    description:
      "EGR valve designed for dependable emissions management in diesel engine systems.",
    reviews: [],
  },

  {
    id: 19,
    name: "Rocker Arm Assembly",
    price: 9800,
    image:
      "https://images.pexels.com/photos/7564857/pexels-photo-7564857.jpeg",
    category: "Valvetrain",
    stock: true,
    description:
      "Precision rocker arm assembly designed for reliable valve train operation.",
    reviews: [],
  },

  {
    id: 20,
    name: "Engine Oil Cooler",
    price: 16500,
    image:
      "https://images.pexels.com/photos/7564860/pexels-photo-7564860.jpeg",
    category: "Cooling",
    stock: true,
    description:
      "Heavy-duty oil cooler designed to help maintain stable engine oil temperatures.",
    reviews: [],
  },
];

export default products;