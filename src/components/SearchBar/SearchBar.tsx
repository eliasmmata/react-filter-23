import React, { useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";

// Import Styles
import styles from '../../styles/components/SearchBar.module.scss';

// JSON Data
import { products } from "../../pages/api/data";

// Import Components
import FilteredProductSearch from "../../components/Products/FilteredProductSearch";

// Import images and icons
import Logo from '../../../public/images/logos/logo-name.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faMagnifyingGlassPlus, faCircleXmark, faXmark, faShirt } from '@fortawesome/free-solid-svg-icons';

// TypeScript prop types
interface Product {
    id: number;
    name: string;
    slug: string;
    type: string;
    image: string;
    price: number;
    sales?: number;
    colors: string[];
}
interface SearchBarProps {
    searchVisible: boolean;
    searchHidden: boolean;
    setSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setFilteredSearchResults: React.Dispatch<React.SetStateAction<Product[]>>; // Correct type

}

const SearchBar: React.FC<SearchBarProps> = ({
    searchVisible,
    searchHidden,
    setSearchVisible,
    setFilteredSearchResults // This is a function to update the state

}) => {

    const router = useRouter();

    // Filter input
    const [searchProduct, setSearchProduct] = useState("");

    const resetInputField = () => {
        setSearchProduct("");
    };

    // On Click store results and goes to page to show filtered results
    const filteredResults = () => {
        // Store updating filteredSearchResults here:
        if (searchProduct !== "") {
            const filteredResults = products.filter(product => product.name.includes(searchProduct));

            setFilteredSearchResults(filteredResults);

            router.push('/', { query: { search: searchProduct } });
        }
    };

    // Click show filtered results on index and dissapear
    const handleCombinedClick = () => {
        if (searchProduct !== "") {
            setSearchVisible(!searchVisible);
            filteredResults();
        }
      };

    // Change icon on hover
    const [hovered, setHovered] = useState(false);

    return (
        <div className={`${styles.search_container} ${!searchHidden ? styles['slide-up-exit'] : styles['slide-down-enter']}`}>
            <div className={styles.icon_close_container} >
                <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => setSearchVisible(!searchVisible)}
                    className={styles.close_icon} />
            </div>
            <div className={styles.logo_search}>
                <Image src={Logo} alt="logo" width={320} height={70} />
            </div>
            <div className={styles.input_container}>
                <FontAwesomeIcon
                    className={styles.icon_search}
                    icon={hovered ? faMagnifyingGlassPlus : faMagnifyingGlass}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={handleCombinedClick}
                />
                <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className={styles.inputtext}
                    value={searchProduct}
                    onChange={(event) => {
                        setSearchProduct(event.target.value);
                    }}
                />
                {searchProduct.length > 0 &&
                    <FontAwesomeIcon icon={faCircleXmark} className={styles.icon_back} onClick={resetInputField} />
                }
            </div>
            {/* Conditionally render FilteredProductSearch if searchProduct from input is not an empty string */}
            {searchProduct.length > 0 ?
                <FilteredProductSearch searchProduct={searchProduct} />
                :
                <div className={styles.no_results_container}>
                    <h4>Tendencias</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '0 0 0.75rem 1rem' }}>
                        <FontAwesomeIcon icon={faShirt} className={styles.icon_back} />
                        <p>Buscador de tiendas</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '0 0 0.75rem 1rem' }}>
                        <FontAwesomeIcon icon={faShirt} className={styles.icon_back} />
                        <p>Total looks verano</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default SearchBar;