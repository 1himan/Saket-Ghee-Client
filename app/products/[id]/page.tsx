"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import RatingStar from "@/components/RatingStars";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  videoUrl?: string;
  sizes: string[];
  rating: number;
  reviews: number;
  quantityAvailable: number;
}

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      volumeSize: product.sizes[0], // Default to first size
      image: product.images[0],
      seller: "Saket Ghee", // You might want to make this dynamic too
    };

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product._id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item if it doesn't exist
      existingCart.push(cartItem);
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show SweetAlert2 alert
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (isLoading) {
    return (
      <div className="text-center text-2xl text-gray-700 py-10">Loading...</div>
    );
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const allMedia = [...product.images];
  if (product.videoUrl) {
    allMedia.push(product.videoUrl);
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVideoClick = () => {
    setSelectedImageIndex(allMedia.length - 1);
    setIsModalOpen(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {/* Main Content */}
      <div className="bg-white mx-4 lg:mx-60 flex flex-col lg:flex-row justify-evenly mt-7">
        <div className="w-full lg:w-[40%]">
          <Image
            src={product.images[0]}
            className="w-full h-[26rem] object-cover"
            alt={product.name}
            width={350}
            height={100}
          />
          {/* Small Images */}
          <div className="flex gap-2 mt-4 justify-evenly">
            {product.images.map((src, index) => (
              <Image
                key={index}
                src={src}
                className="w-16 h-16 object-cover cursor-pointer"
                alt={`${product.name} ${index + 1}`}
                width={64}
                height={64}
                onClick={() => handleImageClick(index)}
              />
            ))}
            {product.videoUrl && (
              <button
                onClick={handleVideoClick}
                className="w-16 h-16 bg-gray-200 flex items-center justify-center"
              >
                ▶️
              </button>
            )}
          </div>
        </div>
        <div className="w-full lg:w-[40%] mt-4 lg:mt-0">
          <p className="text-2xl font-semibold mb-2">{product.name}</p>
          <div className="flex items-center gap-2">
            <RatingStar rating={product.rating} />
            <span className="text-sm">on {product.reviews} reviews</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-lg font-bold">₹{product.price}</p>
            <p className="text-sm line-through text-gray-500">
              ₹{product.originalPrice}
            </p>
            <p className="text-sm text-green-500 font-bold">
              {product.discount}% off
            </p>
          </div>
          {/* Size Options */}
          <div className="mt-3">
            <p className="text-sm font-semibold">Size:</p>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button key={size} className="border px-2 py-1">
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="mt-4 flex items-center gap-2">
            <p className="text-sm font-semibold">Quantity:</p>
            <button
              className="border px-2"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              className="border px-2"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-4">
            <button className="bg-[#FFA500] text-white px-4 py-2 rounded-md">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white mx-4 lg:mx-60 mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">More About this Product</h2>
        <div className="text-gray-700">
          <p className="mb-4">{product.description}</p>
        </div>
      </div>

      {/* Image Carousel Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-4 rounded-md w-[90%] lg:w-[800px] relative">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <span className="text-gray-600">
                {selectedImageIndex + 1} of {allMedia.length}
              </span>
            </div>
            <Carousel
              selectedItem={selectedImageIndex}
              showThumbs={false}
              showStatus={false}
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                return (
                  <span
                    className={`inline-block w-2 h-2 mx-1 rounded-full ${
                      isSelected ? "bg-[#00584B]" : "bg-gray-300"
                    }`}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                  ></span>
                );
              }}
            >
              {allMedia.map((src, index) => (
                <div key={index}>
                  {index === allMedia.length - 1 ? (
                    <iframe
                      width="100%"
                      height="450"
                      src={src}
                      title="Product Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`Carousel Image ${index + 1}`}
                      className="max-h-[450px] object-contain"
                    />
                  )}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}
