"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SearchComponent from "@/components/SearchComponent";
import { useSearchParams } from "next/navigation";

// Define the Product type
interface Product {
  _id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  quantityAvailable: number;
  seller: string; // Add missing properties
  volumeSize: string; // Add missing properties
}

// Function to fetch products from the server
async function fetchProducts(
  searchQuery = "",
  page = 1,
  limit = 20
): Promise<{ products: Product[]; totalResults: number }> {
  try {
    const res = await fetch(
      `http://localhost:5000/products?search=${searchQuery}&page=${page}&limit=${limit}`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    // Return the JSON response which includes both products and totalResults
    return res.json(); // { products: [...], totalResults: 200 }
  } catch (error) {
    console.log("Error loading products:", error);
    return { products: [], totalResults: 0 };
  }
}

export default function Page() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch products based on the current searchQuery and page
  const loadProducts = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const { products: newProducts, totalResults } = await fetchProducts(
      searchQuery,
      page
    );
    setProducts((prev) => [...prev, ...newProducts]);
    setTotalResults(totalResults);
    setHasMore(newProducts.length > 0);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  // Handle search query change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    loadProducts();
  }, [searchQuery]);

  // Infinite scroll implementation using IntersectionObserver with debounce
  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading && hasMore) {
          if (!debounceTimeout) {
            debounceTimeout = setTimeout(() => {
              loadProducts();
              debounceTimeout = null;
            }, 300);
          }
        }
      },
      { threshold: 0.1 }
    );

    const target = document.querySelector("#infinite-scroll-trigger");
    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [isLoading, hasMore]);

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      {/* Search Component */}
      <div className="my-6 w-full">
        <SearchComponent
          onSearch={(value) => setSearchQuery(value)}
          initialValue={searchQuery}
        />
      </div>
      {/* Total Results */}
      <p className="text-left mb-4 w-full">
        {totalResults} results for your search
      </p>
      {/* Product List */}
      <div className="flex flex-wrap gap-5 justify-center w-full">
        {products.map((product, index) => (
          <ProductCard key={`${product._id}-${index}`} {...product} />
        ))}
      </div>
      {/* Loading Indicator */}
      {isLoading && (
        <p className="text-center text-2xl text-gray-700 mt-6">Loading...</p>
      )}
      {/* Infinite Scroll Trigger */}
      <div
        id="infinite-scroll-trigger"
        className="bg-blue-gray-00 w-full"
        style={{ height: "20px" }}
      />
    </div>
  );
}
