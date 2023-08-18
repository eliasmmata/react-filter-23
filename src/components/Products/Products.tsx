import React, { useState, useEffect } from "react";
import Image from 'next/image';

// Import styles
import styles from '../../styles/components/Products.module.scss';

// Consumimos JSON from an external file
import { products } from "../../pages/api/data";

// Import Components
import ButtonMain from "../Button/Button";
import ButtonPagination from "../Button/ButtonPagination";

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip, faGripVertical, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Products: React.FC = () => {

    // Change columns view
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isLessColumnsActive, setLessColumnsActive] = useState<boolean>(false);
    const [isMoreColumnsActive, setMoreColumnsActive] = useState<boolean>(true);

    const changeLessColumns = () => {
        setIsActive(true);
        setLessColumnsActive(true);
        setMoreColumnsActive(false);
    };

    const changeMoreColumns = () => {
        setIsActive(false);
        setLessColumnsActive(false);
        setMoreColumnsActive(true);
    };

    // Hover product change image
    const [hoveredIndex, setHoveredIndex] = useState(-1); // -1 represents no hover

    // Selected color change image to match result
    const [selectedProducts, setSelectedProducts] = useState(
        products.map(product => ({ ...product, selectedColorIndex: 0 }))
    );

    const handleColorClick = (productIndex: number, colorIndex: number) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[productIndex].selectedColorIndex = colorIndex;
        setSelectedProducts(updatedProducts);
    };

    // Dropdown Menu
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Recomendados');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Logic Pagination and to order by price ASC and DESC, and sales
    // Logic to order by price ASC and DESC, and sales
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [initialPortion, setInitialPortion] = useState([]);
    const [portionSize, setPortionSize] = useState(12);
    const [showLoadMore, setShowLoadMore] = useState(true);

    useEffect(() => {
        // Initial setup to see multiples of 12 products (fit with both switch columns grid)
        const initialVisible = products.slice(0, portionSize);
        setVisibleProducts(initialVisible);
        setInitialPortion(initialVisible);
        // Initialize selectedProducts to match the length of initialVisible
        const initialSelectedProducts = initialVisible.map(product => ({
            ...product,
            selectedColorIndex: 0
        }));
        setSelectedProducts(initialSelectedProducts);
        setLastLoadedIndex(initialVisible.length);
    }, []);

    // Logic to load on click the next 12 products
    const [lastLoadedIndex, setLastLoadedIndex] = useState(0);
    const loadMoreProducts = () => {
        const nextPortionEndIndex = lastLoadedIndex + portionSize;
        if (nextPortionEndIndex >= products.length) {
            setPortionSize(12);
            setShowLoadMore(false);
        }

        const nextPortion = products.slice(lastLoadedIndex, Math.min(nextPortionEndIndex, products.length));

        // Create a new array of selected products for the next portion
        const updatedSelectedProducts = nextPortion.map(product => ({
            ...product,
            selectedColorIndex: 0
        }));

        setVisibleProducts(prevVisibleProducts => [
            ...prevVisibleProducts,
            ...nextPortion
        ]);

        setSelectedProducts(prevSelectedProducts => [
            ...prevSelectedProducts,
            ...updatedSelectedProducts
        ]);

        setLastLoadedIndex(nextPortionEndIndex);
    };

    // Options of filter bar results
    const [filteredProducts, setFilteredProducts] = useState([]); // Access to filter.length need state filteredProducts.length

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setDropdownOpen(false);

        if (option === 'Recomendados') {
            setVisibleProducts(initialPortion);

            setFilteredProducts([]);

        } else if (option === 'Rebajados') {
            const filtered = products.filter(product => product.sales !== null);
            setVisibleProducts(filtered);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);

            const sorted = [...products];

            if (option === 'Precio-asc') {
                sorted.sort((a, b) => {
                    const aFinalPrice = a.price - (a.price * (a.sales || 0));
                    const bFinalPrice = b.price - (b.price * (b.sales || 0));
                    return aFinalPrice - bFinalPrice;
                });
            } else if (option === 'Precio-desc') {
                sorted.sort((a, b) => {
                    const aFinalPrice = a.price - (a.price * (a.sales || 0));
                    const bFinalPrice = b.price - (b.price * (b.sales || 0));
                    return bFinalPrice - aFinalPrice;
                });
            }

            setVisibleProducts(sorted.slice(0, portionSize));
        }
    };

    // For sales length
    const filtered = products.filter(product => product.sales !== null);

    return (
        <div className={styles.whole_container}>
            <div className={styles.filters_container}>
                <div className={styles.change_columns_container}>
                    <FontAwesomeIcon
                        icon={faGrip}
                        className={`${styles.icon_columns} ${isLessColumnsActive ? '' : styles.disabled}`}
                        onClick={changeMoreColumns} />
                    <FontAwesomeIcon
                        icon={faGripVertical}
                        className={`${styles.icon_columns} ${isMoreColumnsActive ? '' : styles.disabled}`}
                        onClick={changeLessColumns} />
                </div>
                <div className={styles.dropdown}>
                    <div className={styles.selected_option} onClick={toggleDropdown}>
                        <span style={{ color: "grey", marginRight: "2px" }}>Ordenar: </span>{selectedOption}
                        <FontAwesomeIcon icon={faChevronDown} className={styles.icon_plus} />
                    </div>
                    {dropdownOpen && (
                        <ul className={styles.dropdown_list}>
                            <li
                                onClick={() => handleOptionClick('Recomendados')}
                                style={{ backgroundColor: selectedOption === 'Recomendados' ? 'rgba(1, 114, 234, 0.08)' : 'transparent' }}
                            >
                                Recomendados
                            </li>
                            <li
                                onClick={() => handleOptionClick('Rebajados')}
                                style={{ backgroundColor: selectedOption === 'Rebajados' ? 'rgba(1, 114, 234, 0.08)' : 'transparent' }}
                            >Rebajados
                            </li>
                            <li
                                onClick={() => handleOptionClick('Precio-asc')}
                                style={{ backgroundColor: selectedOption === 'Precio-asc' ? 'rgba(1, 114, 234, 0.08)' : 'transparent' }}
                            >Precio - asc
                            </li>
                            <li
                                onClick={() => handleOptionClick('Precio-desc')}
                                style={{ backgroundColor: selectedOption === 'Precio-desc' ? 'rgba(1, 114, 234, 0.08)' : 'transparent' }}>
                                Precio - desc
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div className={!isActive ? styles.product_card_container : styles.product_card_container_two}>
                {visibleProducts.map((product, index) => {
                    const selectedColor = selectedProducts[index].colors[selectedProducts[index].selectedColorIndex];
                    const determineImageSource = () => {
                        if (hoveredIndex === index && product.image_back) {
                            return product.image_back;
                        } else if (selectedColor === "white" && product.image_white) {
                            return product.image_white;
                        } else if (selectedColor === "black" && product.image_black) {
                            return product.image_black;
                        } else {
                            return product.image;
                        }
                    };
                    return (
                        <div key={product.id} className={!isActive ? styles.product_card : styles.product_card_two}>
                            <div
                                className={styles.product_card_image_container}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(-1)}
                            >
                                <Image
                                    priority={true}
                                    width={200}
                                    height={200}
                                    sizes="100vw"
                                    style={{ cursor: 'pointer' }}
                                    alt={product.name}
                                    src={determineImageSource()}
                                />
                            </div>
                            <p className={styles.product_card__title}>{product.name}</p>
                            <div className={styles.product_card_price_container}>
                                <p className={!product.sales ? styles.product_card__price : styles.product_card__price_line}>
                                    {product.price.toString().replace(/\./g, ',')} €
                                </p>
                                {product.sales && (
                                    <p className={styles.product_card__sales}>
                                        {(product.price - (product.price * product.sales)).toFixed(2).toString().replace(/\./g, ',')} €
                                        (-{(product.sales * 100)}%)
                                    </p>
                                )}
                            </div>
                            {product.colors.length > 1 ? (
                                <div className={styles.product_card__hoverContainer}>
                                    <p
                                        className={styles.product_card__colors}
                                    >
                                        + {product.colors.length - 1} {product.colors.length === 2 ? 'color' : 'colores'}
                                    </p>
                                    <ul className={styles.product_card__palette}>
                                        {product.colors.map((color, i) => {
                                            return (
                                                <li key={JSON.stringify(i)}
                                                    style={color === 'white'
                                                        ? { color: 'white', textShadow: '-1px -1px 1px rgba(255, 255, 255, 0.2), 1px 1px 1px rgba(0, 0, 0, 0.6)' }
                                                        : { color: color, textShadow: '-1px -1px 1px rgba(255, 255, 255, 0.2), 1px 1px 1px rgba(0, 0, 0, 0.1)' }}>
                                                    <span
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => handleColorClick(index, i)}

                                                    ></span>

                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                <p className={styles.product_card__colors}>
                                    Sólo disponible en {product.colors[0].replace(/white/g, 'blanco')}
                                </p>
                            )}
                            <ButtonMain buttonText="Ver producto" routePath={`/${product.type.toLowerCase()}/${product.slug}?productId=${product.id}`} />
                        </div>
                    );
                })}
            </div>
            {(filteredProducts.length > 0)  &&
                <>
                    <h2 className={styles.total_articles}>Mostrando {filteredProducts.length} artículos rebajados de {filtered.length}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <ButtonPagination onClick={loadMoreProducts} />
                    </div>
                </>
            }
            {visibleProducts.length < products.length && (visibleProducts.length  !== filtered.length ) &&
                <>
                    <h2 className={styles.total_articles}>Mostrando {visibleProducts.length} artículos de {products.length}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <ButtonPagination onClick={loadMoreProducts} />
                    </div>
                </>
            }

        </div>
    );
};

export default Products;
