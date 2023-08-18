import React from "react";
import Link from "next/link";

// Data
import { products } from "../../pages/api/data"; // You might need to adjust the path to the correct location of your data.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/FilteredProductSearch.module.scss';

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

interface FilteredProductSearchProps {
    searchProduct: string;
    products: Product[]
}

const FilteredProductSearch: React.FC<FilteredProductSearchProps> = ({ searchProduct }) => {
    const filteredProducts: Product[] = products.filter((product) => {

    const searchWords = searchProduct.toLowerCase().split(" ");

    if (!searchProduct.trim()) {
        return false;
    }

    const productNameLower = product.name.toLowerCase();
    const productWords = productNameLower.split(" ");

    // Check if the search words are present in the product name
    const partialMatch = searchWords.every((word) => productNameLower.includes(word));

    // Check if all search words are present in the product name as complete words
    const completeMatch = searchWords.every((word) => productWords.includes(word));

    return partialMatch || completeMatch;
});

    return (
        <div className={styles.filtered_container}>
            {filteredProducts.length > 0 ? (
                <ul>
                    {filteredProducts.map((product, key) => (
                        <Link
                            key={key}
                            href={{ pathname: `/${product.type.toLowerCase()}/${product.slug}`, query: { productId: product.id } }}>
                            <li>
                                <FontAwesomeIcon icon={faShirt} style={{ marginRight: '10px' }} />
                                {product.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron resultados (only for test purposes)</p>
            )}
        </div>
    );
};

export default FilteredProductSearch;
