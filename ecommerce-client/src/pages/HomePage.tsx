import { useState } from "react"
import { DisplayProducts } from "../components/Start/DisplayProducts"
import "../styles/pages/HomePage.css"
import { IndexedItem } from "../types/IndexedItem"
import { SearchBar } from "../components/Start/SearchBar"

export const HomePage = () => {
    const [filteredProducts, setFilteredProducts] = useState<IndexedItem[]>([]);

    return (
        <>
            <SearchBar setFilteredProducts={setFilteredProducts} />
            <DisplayProducts filteredProducts={filteredProducts} />
        </>
    )
}
