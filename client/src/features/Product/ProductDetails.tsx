import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { useProductDetails } from "../../hooks/useProductDetails";

interface ProductDetails {
  productImageUrl: string;
  productId: number;
  productTitle: string;
  productPrice: number;
  productPriceDetails: string;
  currency?: "USD" | "EURO";
  addProduct: (productId: number) => void;
}

export const ProductDetails = ({ productId }: { productId: string }) => {
  const { product } = useProductDetails(productId);

  if (!product) {
    return <>loading</>;
  }

  const { name, description, price } = product;

  const addProduct = () => {};
  const productImageUrl =
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_138720266?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402";

  return (
    <div className="group grid grid-cols-12 gap-4 md:gap-8 p-4 md:px-8 relative">
      <div className="col-span-12 md:col-span-6 lg:col-span-5">
        <picture>
          <source srcSet={productImageUrl} media="(min-width: 600px)" />
          <img src={productImageUrl} alt="MDN" />
        </picture>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-5">
        <div className="flex pb-4 gap-4 justify-between">
          <div className="w-6/12">
            <Link to="/home" className="group-hover:text-red-500">
              <h3 className="text-2xl font-bold">{name} </h3>
            </Link>
            <p> {description} </p>
          </div>
          <div className="w-6/12 text-right">
            <span className="text-2xl font-bold">{`${price} ${
              // currency === "EURO" ? "€" : "$"
              "€"
            }`}</span>
          </div>
        </div>
        <div>
          <Button onClick={() => addProduct()} className="w-full rounded-lg">
            Add product to Card
          </Button>
        </div>
      </div>
    </div>
  );
};
