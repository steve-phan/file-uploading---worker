// import React from "react";
// import { MemoryRouter } from "react-router-dom";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { ProductDetails } from "../Product/ProductDetails";

// const handleAddCard = jest.fn();

// describe("ProductCard", () => {
//   beforeEach(() => {
//     render(
//       <MemoryRouter>
//         <ProductDetails
//           productImageUrl="http://image.com/abc.png"
//           productId={101}
//           productTitle="Amazing"
//           productPrice={100.36}
//           productPriceDetails="Amazing details Product"
//           addProduct={handleAddCard}
//         />
//       </MemoryRouter>
//     );
//   });

//   it("should render the product title correctly", () => {
//     const productTitle = screen.getByRole("heading", { name: "Amazing" });
//     expect(productTitle).toBeInTheDocument();
//   });
// });
