"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchComponentProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export default function SearchComponent({
  onSearch,
  initialValue = "",
}: SearchComponentProps) {
  const [searchValue, setSearchValue] = useState(initialValue);

  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-full pl-9   py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
      width={18}
      >
        <path
          fill="#5c5e60"
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
        />
      </svg>
    </div>
  );
}
