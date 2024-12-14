import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Button } from "../Button";

const handleClick = jest.fn();

describe("Button Component", () => {
  it("renders the button with the provided title", () => {
    render(<Button>Hello</Button>);

    const buttonElement = screen.getByRole("button", { name: "Hello" });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the handler envent when clicked", async () => {
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: "Click me" });

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
