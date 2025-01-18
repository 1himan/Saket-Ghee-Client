import { Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  imageText: string;
}

export default function Product({ imageText }: ProductProps) {
  return (
    <Tooltip placement="top" arrow title={`Click to see and Buy ${imageText} Products`}>
      <Link
        href={`/products?search=${encodeURIComponent(imageText)}`}
      >
        <Image
          className="rounded-md h-[150px] w-[200px]"
          src={`/${imageText}.png`}
          width={150}
          height={100}
          alt="Honey"
        />
        <p className="text-center mt-2">{imageText}</p>
      </Link>
    </Tooltip>
  );
}
