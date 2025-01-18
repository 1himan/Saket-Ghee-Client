"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useRouter } from "next/navigation"; // Using next/navigation for navigation

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    // Check if user is logged in (use cookies or localStorage or your session method)
    const token = localStorage.getItem("authToken"); // Replace with a proper session or cookie check
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = () => {
    // If user is not logged in, redirect to the login page
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="w-[100vw] h-14 bg-[#00584B] flex justify-between items-center px-7 font-sassoon">
      <Link href={"/"} className="text-[#D0BD80] text-xl">
        Saket Ghee
      </Link>
      <div className="text-white text-sm flex justify-between w-[20%]">
        <Link
          href={"/products"}
          className="hover:text-[#D0BD80] transition-all duration-300"
        >
          Shop Now
        </Link>
        <Link
          href={"/best-deals"}
          className="hover:text-[#D0BD80] transition-all duration-300"
        >
          Best Deals
        </Link>
        <Link
          href={"/about-us"}
          className="hover:text-[#D0BD80] transition-all duration-300"
        >
          About Us
        </Link>
      </div>
      <div className="w-[6%] flex justify-between">
        <Link href={"/cart"}>
          <ShoppingCartIcon sx={{ color: "#ffffff", fontSize: 24 }} />
        </Link>
        <a href="#" onClick={handleProfileClick}>
          <PersonOutlineIcon sx={{ color: "#ffffff", fontSize: 24 }} />
        </a>
      </div>
    </div>
  );
}
