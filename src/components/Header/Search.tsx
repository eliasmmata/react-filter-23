import React, { useState } from "react";

import styles from '../../styles/components/Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
    searchVisible: boolean;
    searchHidden: boolean;
    setSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ searchVisible, searchHidden, setSearchVisible }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div className={styles.search_container}>
            <h2 className={styles.search_container_title}>Buscar </h2>
            <FontAwesomeIcon
                className={styles.search_container_icon}
                icon={hovered ? faMagnifyingGlassPlus : faMagnifyingGlass}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setSearchVisible(!searchVisible)}
            />
        </div>
    );
};

export default Search;
