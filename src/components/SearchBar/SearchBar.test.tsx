import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("should update the searchProduct state when input value changes", () => {
    const setSearchVisible = jest.fn();
    const setFilteredSearchResults = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar
        searchVisible={true}
        searchHidden={false}
        setSearchVisible={setSearchVisible}
        setFilteredSearchResults={setFilteredSearchResults}
      />
    );

    const input = getByPlaceholderText("¿Qué estás buscando?") as HTMLInputElement; // Explicitly type as HTMLInputElement
    fireEvent.change(input, { target: { value: "test" } });

    // Assert that the input value has been updated
    expect(input.value).toBe("test");
  });

  it("should call setSearchVisible and filteredResults functions when search icon is clicked", () => {
    const setSearchVisible = jest.fn();
    const setFilteredSearchResults = jest.fn();
    const { getByTestId } = render(
      <SearchBar
        searchVisible={true}
        searchHidden={false}
        setSearchVisible={setSearchVisible}
        setFilteredSearchResults={setFilteredSearchResults}
      />
    );

    const searchIcon = getByTestId("search-icon");
    fireEvent.click(searchIcon);

    expect(setSearchVisible).toHaveBeenCalledTimes(1);
    expect(setFilteredSearchResults).toHaveBeenCalledTimes(1);
  });

  it("should call resetInputField function when back icon is clicked", () => {
    const setSearchVisible = jest.fn();
    const setFilteredSearchResults = jest.fn();
    const { getByTestId } = render(
      <SearchBar
        searchVisible={true}
        searchHidden={false}
        setSearchVisible={setSearchVisible}
        setFilteredSearchResults={setFilteredSearchResults}
      />
    );

    const backIcon = getByTestId("back-icon");
    fireEvent.click(backIcon);

    expect(setSearchVisible).toHaveBeenCalledTimes(1);
    expect(setFilteredSearchResults).toHaveBeenCalledTimes(0);
  });
});