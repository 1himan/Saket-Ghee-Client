"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for navigation
import CircularProgress from "@mui/material/CircularProgress"; // MUI spinner

export default function UserPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in (using localStorage or cookie)
    const token = localStorage.getItem("authToken"); // Or check your authentication method
    if (!token) {
      // If not logged in, redirect to login page
      router.push("/login");
    } else {
      // If logged in, allow access
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) {
    // Show the MUI CircularProgress spinner while checking login status
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Welcome to your profile!</p>
    </div>
  );
}
