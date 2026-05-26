import truck_bg from "../assets/img/banner-img-scaled.webp"
import car_parts from "../assets/img/car-parts.webp"
import consulting from "../assets/img/consulting-service.webp"
import delivery from "../assets/img/delivery-truck.webp"
import inventory from "../assets/img/inventory.webp"
function Hero() {
    return (
        <section className="relative w-full h-[600px] ">

            <img
                src={truck_bg} alt="truck"
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/70"></div>


            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">

                <h1 className="text-white text-4xl md:text-5xl font-bold max-w-3xl">
                    Your Trusted Partner for Heavy-Duty Truck & Engine Parts
                </h1>

                <p className="text-gray-300 mt-4 max-w-xl">
                    Supplying OEM and aftermarket parts for Cummins, Detroit, Volvo, Caterpillar, Mack and more.
                </p>


                <div className="mt-6 flex gap-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded">
                        EXPLORE SHOP
                    </button>

                    <button className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-black">
                        CONTACT US
                    </button>
                </div>

            </div>

            <div className="absolute bottom-0 w-full bg-black">
                <div className="max-w-7xl mx-auto text-white py-6 grid grid-cols-2 md:grid-cols-4 ">
                    <div className="text-center text-sm flex items-center justify-center flex-col gap-2"><div>
                        <img className=" w-auto h-10" src={car_parts} alt="" /></div>OEM & Aftermarket Parts</div>
                    <div className="text-center text-sm flex items-center justify-center flex-col gap-2"><div>
                        <img className=" w-auto h-10" src={delivery} alt="" /></div>Fast Shipping</div>
                    <div className="text-center text-sm flex items-center justify-center flex-col gap-2"><div>
                        <img className=" w-auto h-10" src={inventory} alt="" /></div>Retail & Wholesale Supply</div>
                    <div className="text-center text-sm flex items-center justify-center flex-col gap-2"><div>
                        <img className=" w-auto h-10" src={consulting} alt="" /></div>Expert Assistance</div>
                </div>
            </div>

        </section>
    );
}

export default Hero;