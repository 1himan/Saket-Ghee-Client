"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Specify the routes where the Navbar should not appear
  const excludedRoutes = ["/admin"];
  const shouldShowNavbar = !excludedRoutes.includes(pathname);

  return shouldShowNavbar ? <Navbar /> : null;
}
