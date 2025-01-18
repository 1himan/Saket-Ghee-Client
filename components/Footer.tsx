import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-[#00584B] h-40 w-[100vw] px-7 py-3 text-white flex justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-2xl">Contact Us:</p>
        <p>Number: 8383819373</p>
        <p>Email: vanshumahore@gmail.com</p>
        <p className="flex gap-2">
          Social Media:
          <FaInstagram size={20} className="hover:scale-[1.2] transition-all" />
          <FaFacebook size={20} className="hover:scale-[1.2] transition-all" />
        </p>
      </div>

      <Link href={"/"} className="text-[#D0BD80] text-4xl place-content-center">
        Saket Ghee
      </Link>
    </div>
  );
}
