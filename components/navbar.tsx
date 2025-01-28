"use client";

import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Navbar() {
  return (
    <div className="w-[100vw] h-14 bg-[#00584B] flex justify-between items-center px-7 font-sassoon">
      <Link href={"/"} className="text-[#D0BD80] text-xl">
        Saket Ghee
      </Link>
      <div className="text-white text-sm flex justify-between w-[40%] lg:px-32">
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
        <Link href={"/user-profile"}>
          <PersonOutlineIcon sx={{ color: "#ffffff", fontSize: 24 }} />
        </Link>
      </div>
    </div>
  );
}
