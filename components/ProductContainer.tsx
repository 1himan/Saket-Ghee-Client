import React from "react";
import Product from "./Product";

export default function ProductContainer() {
  return (
    <div className="flex justify-evenly gap-7">
      <Product imageText={"Milk"} />
      <Product imageText={"Honey"} />
      <Product imageText={"Ghee"} />
      <Product imageText={"Butter"} />
      <Product imageText={"Oil"} />
    </div>
  );
}
