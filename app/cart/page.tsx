"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  volumeSize: string;
  image: string;
  seller: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart items from local storage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cart");
      console.log("Loaded from localStorage:", storedCartItems); // Debugging log
      if (storedCartItems) {
        const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Recalculate subtotal whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);

  }, [cartItems]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const removeItem = (id: string) => {
    // Remove item from UI state
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    
    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  // If cart is empty, show a message
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
        <p className="text-gray-600">
          Looks like you haven't added any items to your cart yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex border-b py-4 gap-4">
              <div className="w-32 h-32 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Sold by: {item.seller}</p>
                <p className="text-gray-600">Size: {item.volumeSize}</p>
                <p className="text-green-600">In Stock</p>

                <div className="flex items-center mt-4 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Units:</label>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <FaPlus />
                        
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">
                  ₹{item.price} / {item.volumeSize}
                </p>
                <p className="text-xl font-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded-md font-semibold">
              Proceed to Checkout ({cartItems.length} items)
            </button>
          </div>

          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">
              Have a gift card or promotional code?
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-grow border rounded-md px-3 py-2"
                placeholder="Enter code"
              />
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
