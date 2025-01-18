import React from "react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 bg-[#f4f4f4]">
      <h1 className="text-4xl font-bold text-[#00584B] mb-4">About Us</h1>
      <p className="text-xl text-center mb-8 max-w-3xl text-gray-700">
        Welcome to Saket Ghee! We are a passionate team committed to providing
        you with the purest, freshest, and most authentic natural products. Our
        ghee, honey, dairy products, and more are sourced directly from trusted
        farmers, ensuring that you receive only the highest quality ingredients
        without harmful additives or chemicals.
      </p>
      <div className="bg-[#00584B] p-8 rounded-xl shadow-lg w-full md:w-[60%] text-white">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          We believe in bringing back the traditional values of purity and
          authenticity in everyday products. By supporting local farmers and
          offering products that are free from harmful chemicals, we aim to
          enhance your health and well-being.
        </p>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">
          Thank you for choosing Saket Ghee. We are here to serve you with
          products that bring purity and health into your life.
        </p>
      </div>
    </div>
  );
}
