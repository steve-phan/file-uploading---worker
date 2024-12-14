import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/product";

export const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <div
      key={product.id}
      className="grid-span-1 p-4 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 text-lg font-bold">${product.price}</p>
      <Link to={`/products/${product.id}`} className="text-pink-500 mt-4 block">
        View Details
      </Link>
    </div>
  );
};
