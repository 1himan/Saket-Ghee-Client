"use client";

import { HomeCarousel } from "@/components/Carousel";
import Footer from "@/components/Footer";
import { CarouselDefault } from "@/components/MiniCarousel";
import ProductContainer from "@/components/ProductContainer";
import Image from "next/image";
import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { reviews } from "../constants/Reviews";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -1220, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 1220, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center w-[100vw] bg-slate-00 relative">
      <HomeCarousel />
      <p className="text-xl text-center my-7">Our Harvest Picks</p>
      <ProductContainer />
      <hr className="mx-[15vw] my-10" />
      <p className="text-2xl text-center">Welcome To Saket Ghee</p>
      <p className="text-gray-700 w-[60vw] mx-auto text-center mt-2">
        Your Trusted Source for Fresh, Authentic Products. We bring you pure,
        unadulterated ghee, honey, and dairy straight from the heart of India’s
        farms. Sourced directly from local farmers, every product is crafted
        with care, free from chemicals, and true to traditional methods.
        Experience the taste of authenticity and the goodness of nature,
        delivered from our farms to your home.
      </p>
      <div className="flex flex-wrap justify-evenly mt-7 gap-7">
        <CarouselDefault delay={3000} />
        <CarouselDefault delay={4000} />
        <CarouselDefault delay={5000} />
      </div>
      <div className="mt-10 w-full">
        <div
          className="relative w-full h-0"
          style={{ paddingBottom: "40%" }} // Adjusted for a shorter height
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <hr className="mx-[15vw] my-10" />
      <p className="text-2xl font-semibold text-gray-700 text-center">
        What our Customers Are Saying About Us
      </p>
      <div className="relative w-[90vw] mx-auto mb-7">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full hover:scale-110 hover:opacity-80 transition-all"
          onClick={scrollLeft}
        >
          <FaArrowLeft />
        </button>
        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap justify-evenly mt-7 w-full overflow-x-scroll px-12 no-scrollbar gallery"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 lg:min-w-[35vw] mx-14 max-w-[35vw] h-72 bg-yellow-50 rounded-md flex items-center p-7 gap-4"
            >
              <Image
                src={review.image || "/customers/image.png"}
                alt={review.name}
                width={200}
                height={100}
                className="h-full w-full rounded-lg"
              />
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">{review.name}</p>
                <p className="text-gray-700">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full hover:scale-110 hover:opacity-80 transition-all"
          onClick={scrollRight}
        >
          <FaArrowRight />
        </button>
      </div>
      <Footer />
    </div>
  );
}
