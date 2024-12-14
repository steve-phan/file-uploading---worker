import React from "react";
import { ProductDetails } from "../features/Product/ProductDetails";
import { useParams } from "react-router-dom";

export const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.productId!;

  return <ProductDetails productId={productId} />;
};
