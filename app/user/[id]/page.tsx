"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for navigation
import CircularProgress from "@mui/material/CircularProgress"; // MUI spinner
import axios from "axios"; // Axios for HTTP requests

export default function UserPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [userDetails, setUserDetails] = useState(null); // Store user details
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      try {
        // Make a request to your backend to check if the user is authenticated and fetch user details
        const response = await axios.get(
          "http://localhost:5000/api/auth/user-details", // Adjust endpoint to fetch user details
          { withCredentials: true } // Include cookies
        );

        if (response.status === 200 && response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUserDetails(response.data.user); // Store user details
        } else {
          router.push("/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        router.push("/login"); // Redirect to login if an error occurs
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    checkAuthAndFetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Avoid rendering the page if the user is not authenticated
  }

  return (
    <div>
      <h1>User Profile Page</h1>
      {userDetails && (
        <>
          <p>Welcome, {userDetails.name}!</p>
          <p>Email: {userDetails.email}</p>
          {/* Add more details as needed */}
        </>
      )}
    </div>
  );
}
