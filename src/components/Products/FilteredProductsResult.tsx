import React, { useState } from "react";
import Image from 'next/image';

// Import styles
import styles from '../../styles/components/Products.module.scss';


// Import Components
import ButtonMain from "../Button/Button";

interface Product {
    id: number;
    name: string;
    slug: string;
    type: string;
    price: number;
    sales?: number;
    colors: string[];
    image: string;
    image_back?: string;
    image_white?: string;
    image_black?: string;
    selectedColorIndex: number;
}

type FilteredProductsResultProps = {
    searchResults: Product[]; // Change this to an array of Product objects
  };

const FilteredProductsResult: React.FC<FilteredProductsResultProps> = ({ searchResults }) => {

    // Hover product change image
    const [hoveredIndex, setHoveredIndex] = useState(-1); // -1 represents no hover

    // Selected color change image to match result
    const [selectedProducts, setSelectedProducts] = useState(
        searchResults.map(product => ({ ...product, selectedColorIndex: 0 }))
    );

    const handleColorClick = (productIndex: number, colorIndex: number) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[productIndex].selectedColorIndex = colorIndex;
        setSelectedProducts(updatedProducts);
    };


    return (
        <>
        <div className={styles.whole_container}>
            <div className={styles.product_card_container}>
                {searchResults.map((product, index) => {
                    const selectedColor = searchResults[index].colors[searchResults[index].selectedColorIndex];
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
                        <div key={product.id} className={styles.product_card}>
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
                <h2 className={styles.total_articles}>Se encontraron {selectedProducts.length} artículos</h2>

        </div>
        </>
    );
};

export default FilteredProductsResult;
