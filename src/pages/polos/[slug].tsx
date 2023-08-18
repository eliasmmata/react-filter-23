import React from "react";
import { useRouter } from "next/router";
import Image from 'next/image';

// Import Styles
import styles from '../../styles/pages/singleProduct.module.scss';

// Consumimos external JSON
import { products } from "../api/data";

// Import Components
import ButtonMain from "../../components/Button/Button";

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

const SingleProduct: React.FC = () => {
    const router = useRouter();

    const { slug, productId } = router.query; // Extract the slug and product ID from the route query

    // Find the product in the products array based on the ID
    const product: Product | undefined = products.find(p => p.slug === slug && p.id === Number(productId));

    return (
        <>
            <ButtonMain buttonText="Volver" routePath="/" />
            {product ? (
                <div className={styles.product_card_container}>
                    <div key={product.id} className={styles.product_card}>
                        <div className={styles.product_card_image_container} >
                            <Image
                                priority={true}
                                width={200}
                                height={200}
                                sizes="100vw"
                                style={{ height: 'auto', cursor: 'pointer' }}
                                alt={product.name}
                                src={product.image}
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
                                                <span style={{ backgroundColor: color }}></span>
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
                        <ButtonMain buttonText="Volver (test purposes)" routePath="/" />
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20vh' }}>Product not found</p>
            )}
        </>
    );
};

export default SingleProduct;
