import React from "react";
import { HomePage } from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import { UploadPage } from "../pages/UploadPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";

export const routes = [
  {
    path: "/",
    title: "Home",
    element: <HomePage />,
  },
  {
    path: "/products",
    title: "Products",
    element: <ProductsPage />,
  },
  {
    path: "/products/:productId",
    title: "Product",
    element: <ProductDetailsPage />,
    hiddenInHeader: true,
  },
  {
    path: "/upload",
    title: "UploadFile",
    element: <UploadPage />,
  },
];
