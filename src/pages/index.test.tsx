import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./index";
import { PreviousPathProvider } from "../components/PreviousPathContext"; // Import the context provider


describe("HomePage", () => {
  test("renders without error", () => {
    render(
      <PreviousPathProvider>
        <HomePage />
      </PreviousPathProvider>
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("displays Preloader if initialLoad is true", () => {
    render(
      <PreviousPathProvider>
      <HomePage />
    </PreviousPathProvider>
    );
    expect(screen.getByTestId("preloader")).toBeInTheDocument();
  });

  test("displays Header component", () => {
    render(
    <PreviousPathProvider>
      <HomePage />
    </PreviousPathProvider>);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("displays Search component", () => {
    render(
    <PreviousPathProvider>
      <HomePage />
    </PreviousPathProvider>);
    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  test("displays SearchBar component if searchVisible is true", () => {
    render(
    <PreviousPathProvider>
      <HomePage />
    </PreviousPathProvider>
    );
    expect(screen.queryByTestId("search-bar")).not.toBeInTheDocument();

    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  test("displays Products component if searchResults is empty", () => {
    render(
    <PreviousPathProvider>
      <HomePage />
    </PreviousPathProvider>
    );
    expect(screen.getByTestId("products")).toBeInTheDocument();
  });

  test("displays FilteredProductResult component if searchResults is not empty", () => {
    render(
    <PreviousPathProvider>
      <HomePage />
    </PreviousPathProvider>);
    expect(screen.queryByTestId("filtered-product-result")).not.toBeInTheDocument();

    expect(screen.getByTestId("filtered-product-result")).toBeInTheDocument();
  });
});