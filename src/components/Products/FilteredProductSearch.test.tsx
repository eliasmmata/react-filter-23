import React from "react";
import { render, screen } from "@testing-library/react";
import FilteredProductSearch from "./FilteredProductSearch";

// Define the type for props
type FilteredProductSearchProps = {
    searchProduct: string;
    products: Array<{ /* your product properties here */ }>;
    // ... any other props you might have
  };

describe("FilteredProductSearch", () => {
  test("renders filtered products correctly", () => {
    const searchProduct = "shirt";
    const products = [
      {
        id: 1,
        name: "T-Shirt",
        slug: "t-shirt",
        type: "clothing",
        image: "t-shirt.jpg",
        price: 10,
        sales: 5,
        colors: ["red", "blue"],
      },
      {
        id: 2,
        name: "Polo Shirt",
        slug: "polo-shirt",
        type: "clothing",
        image: "polo-shirt.jpg",
        price: 15,
        colors: ["black", "white"],
      },
    ];

    render(<FilteredProductSearch searchProduct={searchProduct} products={products} />);

    const productElements = screen.getAllByRole("link");
    expect(productElements).toHaveLength(2);

    const productName1 = screen.getByText("T-Shirt");
    expect(productName1).toBeInTheDocument();

    const productName2 = screen.getByText("Polo Shirt");
    expect(productName2).toBeInTheDocument();
  });

  test("renders 'No se encontraron resultados' when no products match the search", () => {
    const searchProduct = "pants";
    const products = [
      {
        id: 1,
        name: "T-Shirt",
        slug: "t-shirt",
        type: "clothing",
        image: "t-shirt.jpg",
        price: 10,
        sales: 5,
        colors: ["red", "blue"],
      },
      {
        id: 2,
        name: "Polo Shirt",
        slug: "polo-shirt",
        type: "clothing",
        image: "polo-shirt.jpg",
        price: 15,
        colors: ["black", "white"],
      },
    ];

    render(<FilteredProductSearch searchProduct={searchProduct} products={products} />);

    const noResultsMessage = screen.getByText("No se encontraron resultados (only for test purposes)");
    expect(noResultsMessage).toBeInTheDocument();
  });
});