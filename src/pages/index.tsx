import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { NextPage } from "next";
import { usePreviousPath } from '../components/PreviousPathContext'; // Import the context

// Import Styles
import styles from '../styles/pages/home.module.scss';

// Import Components
import Preloader from "../components/Preloader/Preloader"
import Header from "../components/Header/Header";
import Search from "../components/Header/Search";
import SearchBar from "../components/SearchBar/SearchBar";
import Products from "../components/Products/Products";
import FilteredProductResult from "../components/Products/FilteredProductsResult";

const HomePage: NextPage = () => {

    const router = useRouter();

    const { previousPath } = usePreviousPath(); // Use the previousPath from the context (used to animate only on the main route)

    const [initialLoad, setInitialLoad] = useState<boolean>(true);

    useEffect(() => {
        if (previousPath === "/" || previousPath === null) {
            /* console.log('animación de entrada y duración'); */
            setTimeout(() => {
                setInitialLoad(false);
            }, 3000);
        } else {
            /* console.log('no animar viene de otra ruta'); */
            setInitialLoad(false);
        }
    }, [previousPath]);

    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const [searchHidden, setSearchHidden] = useState<boolean>(false);

    // Results array from filter click glass
    const [searchResults, setSearchResults] = useState<any[]>([]);


    useEffect(() => {
        if (!searchVisible) {
            setSearchHidden(true);
        }
    }, [searchVisible]);

    return (
        <>
            {initialLoad && (previousPath !== "/" || previousPath === null) ? (
                <Preloader />
            ) : (
                <div className={`${styles.animate__animated} animate__fadeIn animate__slow`}>
                    <Header />
                    <Search
                        searchVisible={searchVisible}
                        searchHidden={searchHidden}
                        setSearchVisible={setSearchVisible}
                    />
                    {searchVisible && (
                        <SearchBar
                            searchVisible={searchVisible}
                            searchHidden={searchHidden}
                            setSearchVisible={setSearchVisible}
                            setFilteredSearchResults={setSearchResults}
                        />
                    )}
                    {searchResults.length === 0 ? (
                        <Products />
                    ) : (
                        <FilteredProductResult searchResults={searchResults} />
                    )}
                </div>
            )}
        </>
    );
};

export default HomePage;
