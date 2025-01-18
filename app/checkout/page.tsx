"use client";

import React, { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

interface PaymentDetails {
  name: string;
  email: string;
  phone: string;
  amount: number;
}

export default function Checkout() {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    name: "",
    email: "",
    phone: "",
    amount: 0,
  });

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: paymentDetails.amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Payment for services",
      handler: function (response: any) {
        // Handle successful payment
        console.log(response);
        router.push("/success");
      },
      prefill: {
        name: paymentDetails.name,
        email: paymentDetails.email,
        contact: paymentDetails.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpayWindow = new (window as any).Razorpay(options);
    razorpayWindow.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={loadRazorpay}
      />

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
              value={paymentDetails.name}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
              value={paymentDetails.email}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              className="mt-1 block w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
              value={paymentDetails.phone}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="number"
              required
              min="1"
              className="mt-1 block w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
              value={paymentDetails.amount}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  amount: Number(e.target.value),
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Pay Now
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            Secure payments powered by Razorpay
          </p>
          <div className="flex justify-center items-center space-x-7 mt-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/upi.png" alt="UPI" className="object-contain max-h-full max-w-full" />
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/paytm.png" alt="Paytm" className="object-contain max-h-full max-w-full" />
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/google_pay.png" alt="Google Pay" className="object-contain max-h-full max-w-full" />
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/phonepe.svg" alt="PhonePe" className="object-contain max-h-full max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
