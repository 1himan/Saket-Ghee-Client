"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress"; // Spinner for loading state

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
}

export default function UserPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // State to store user details
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/user-details",
          {
            method: "GET",
            credentials: "include", // Sends cookies with the request
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.user);
        } else {
          // Redirect to login if not authenticated
          router.push("/login");
        }
      } catch (error) {
        console.log("Error fetching user details:", error);
        router.push("/login");
      } finally {
        setLoading(false); // End the loading state
      }
    };

    fetchUserDetails();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!userDetails) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome, {userDetails.name}!</p>
      <p>Your ID is: {userDetails._id}</p>
      <p>Email: {userDetails.email}</p>
      <p>Phone: {userDetails.phone_number}</p>
      <p>Role: {userDetails.role}</p>
    </div>
  );
}
