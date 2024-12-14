import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ProductListItem } from "./ProductListItem";

interface Product {
  productId: number;
  productImageUrl: string;
  productTitle: string;
  productPrice: number;
  productPriceDetails: string;
  currency?: "USD" | "EURO";
}

interface ProductListProps {
  products: Product[];
  addProduct: (productId: number) => void;
}

export const ProductList = () => {
  const { products } = useProducts();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
        {products?.map((product, index) => (
          <ProductListItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
