import { useEffect, useState } from "react";
import { BASE_API_URL } from "../config/config";
import { Product } from "../types/product";

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError("Product ID is required");
      setLoading(false);
      return;
    }

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_API_URL}/products/${productId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details: ${response.statusText}`
          );
        }

        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return { product, loading, error };
};
