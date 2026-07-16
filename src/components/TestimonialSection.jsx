import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import testimonials from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

function TestimonialSection() {
    return (
        <section className="py-20 bg-gray-100">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">

                    <p className="text-orange-500 uppercase tracking-widest font-semibold">
                        Customer Reviews
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        What Our Customers Say
                    </h2>

                    <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
                        Trusted by truck owners, repair shops, and fleet managers across North America.
                    </p>

                </div>
                <div className=" px-20">
                <Swiper className="testimonial-swiper pb-16"

                    modules={[ Pagination, Autoplay]}
                    slidesPerView={2}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                >

                    {testimonials.map((testimonial) => (

                        <SwiperSlide key={testimonial.id}>

                            <TestimonialCard
                                testimonial={testimonial}
                            />

                        </SwiperSlide>

                    ))}

                </Swiper>

                </div>


            </div>

        </section>
    );
}

export default TestimonialSection;